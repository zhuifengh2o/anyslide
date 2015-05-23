(function($) {
    $.fn.slideFocus = function(objSlideFocus) {
        //描述：幻灯片焦点图切换动画
        //作者：刘丕水
        //日期：2013/12/16 星期一
		//http://www.lpsjj.cn/forum-41-1.html
        var $options = $.extend(true,{
				callback    : function(i,numpages) {},//i当前页码,numpages总共页数
				direction   : 'left', //left、right、up、down
				slide       : $(this),
				slideBox    : $(this).children(':first'),
				hover       : false,
				autoPlay    : {bool:true,offset:5000},
				smooth      : false,//是否等一帧动画结束，才开始另一帧；
				addNpBtn    : false,//是否添加上一个下一个按钮
				switcher    : {obj:"undefined",show:true,event:"mouseenter"},//有五个鼠标事件，mouseenter,mouseleave,mouseout,mouseover,click
				effect      : {type:"none",effect:"slideDown",last:200},//none,fade,slide;当type为none时候可设置为{type:"none",effect:"slideDown",last:60}
				lazyLoad    : false,
				numeachpage : 0
        }, objSlideFocus);
        var $slideBoxInner = $options.slideBox.children(':first'); //获取slide靠近切换的内容的外围；
        var $slideItems = $slideBoxInner.children();
        var numslide = $slideItems.length; //刚开始切换内容的个数；
        var page = 0;
        var timmer;
        var minwidth = $slideItems.eq(0).width(); //每个小图宽度
        var minheihgt = $slideItems.eq(0).height(); //每个小图高度
        var visualwidth = $options.slideBox.width(); //可视区宽度
        var visualheight = $options.slideBox.height(); //可视区高度
        //alert(visualwidth)
        var horizontalSlide = true;
        if ($options.direction == 'up' || ($options.direction == 'down')) {
            horizontalSlide = false;
        }
        var numeachpage;
        if ($options.numeachpage > 0) {
            numeachpage = $options.numeachpage; //水平滚动每页显示的个数
        } else if (horizontalSlide) { //如果是水平滚动
            numeachpage = Math.floor(visualwidth / minwidth); //水平滚动每页显示的个数
        } else {
            numeachpage = Math.floor(visualheight / minheihgt)*Math.floor(visualwidth / minwidth); //垂直滚动每页显示的个数
        }
        var numpages = Math.ceil(numslide / numeachpage); //滚动总页数
        var numslides = numpages * numeachpage; //滚动总共需要显示的数量
        var slideSize; //每次滚动的长度
        horizontalSlide ? slideSize = minwidth * numeachpage : slideSize = minheihgt * Math.floor(visualheight / minheihgt);
        var maxslideSize = slideSize * (numpages + 2); //切换区总宽度,为更好的兼容 把加1改成加2；
        var numremainder = numpages * numeachpage - numslide; //取在当前每页个数和总页数下的差多少正好是每页个数的整数倍；
        //			alert(numremainder);
        //后面补齐a使每页正好是两个A；
        if($options.effect.type!='none'){
            if (!horizontalSlide) {
                $slideBoxInner.css("height", maxslideSize);

            } else {
                //设置slide_con的最大宽度；
                $slideBoxInner.css("width", maxslideSize);
            } 
        }
        for (var i = 0; i < numremainder; i++) {
            $slideBoxInner.append($slideItems.eq(0).clone());
            $slideBoxInner.children().last().html("&nbsp");
        }
        //添加切换按钮
		if($options.switcher.obj=="undefined"){
			 var switchBtn = "<div class='switcher'>";
				for (var i = 0; i < numpages; i++) {
					switchBtn += "<span>" + (i + 1) + "</span>";
				}
            switchBtn += "</div>";
			var $switch=$(switchBtn).appendTo($options.slide);
		}else{
		      var $switch=$options.switcher.obj;
		};
		if(!$options.switcher.show){
			$switch.css("display","none");
		}
        var $switchers=$switch.children();
        //按钮切换选中样式
        var selectSwitchers = function(i) {
			$options.callback(i,numpages);
			if(i>numpages-1){
				i=0;
			}
			if(i<0){
				i==numpages-1;
			}
            $switchers.eq(i).addClass("on").siblings().removeClass("on");
        };
		//------------------------------------------------------------------------------------------------------------------------------
        //添加上一个下一个按钮
        var $btnPrev, $btnNext;
        if ($options.addNpBtn) {
            $btnPrev = $("<a class='prev' href='javascript:;'>上一个</a>").appendTo($options.slide);
            $btnNext = $("<a class='next' href='javascript:;'>下一个</a>").appendTo($options.slide);

        }
        //------------------------------------------------------------------------------------------------------------------------------
        if ($options.hover) {
            $options.slide.hover(function() {
                $options.slideBox.fadeIn(0);
            }, function() {
                $options.slideBox.fadeOut(0);
				$switchers.removeClass("on");
			});
		};
        //如果只有一页的时候就什么也不执行；
        if (numpages == 1) {
            return false;
        };
        //------------------------------------------------------------------------------------------------------------------------------

        //------------------------------------------------------------------------------------------------------------------------------
        //显示第一页函数
        var showFirst = function() {
                for (var i = 0; i < numeachpage; i++) {
                    $slideBoxInner.append($slideItems.eq(i).clone());
                };
				if(horizontalSlide){
					$slideBoxInner.stop(false, true).animate({ "left": -slideSize*numpages  }, $options.effect.last, function() {
						$slideBoxInner.css("left", "0");
						for (var i = 0; i < numeachpage; i++) {
							$slideBoxInner.children().last().remove();
						}
					});
				}else{
					$slideBoxInner.stop(false, true).animate({ "top": -slideSize*numpages }, $options.effect.last, function() {
                    $slideBoxInner.css("top", "0");
                    for (var i = 0; i < numeachpage; i++) {
                        $slideBoxInner.children().last().remove();
                    }
                });
				}
                selectSwitchers(0);
        };
        //显示最后一页函数
        var showLast = function() {
                if(horizontalSlide){
					$slideBoxInner.css("left", -slideSize * 1)
						for (var i = 0; i < numeachpage; i++) {
							$slideBoxInner.prepend($slideBoxInner.children().last());
						}; //复制最后一页追加到第一页前面
						$slideBoxInner.stop(false, false).animate({ "left": 0 }, $options.effect.last, function() {
							$slideBoxInner.css("left", -slideSize * (numpages - 1));
							for (var i = 0; i < numeachpage; i++) {
								$slideBoxInner.append($slideBoxInner.children().first());
							};
						}); //利用animate函数，向左移动一页，结束的同时把位置定在使最后一页显示并且把复制过来的页面删掉；
						}else{
					$slideBoxInner.css("top", -slideSize * 1)
						for (var i = 0; i < numeachpage; i++) {
							$slideBoxInner.prepend($slideBoxInner.children().last());
						}; //复制最后一页追加到第一页前面
						$slideBoxInner.stop(false, false).animate({ "top": 0 }, $options.effect.last, function() {
							$slideBoxInner.css("top", -slideSize * (numpages - 1));
							for (var i = 0; i < numeachpage; i++) {
								$slideBoxInner.append($slideBoxInner.children().first());
							};
						}); //利用animate函数，向左移动一页，结束的同时把位置定在使最后一页显示并且把复制过来的页面删掉；

					}; //把位置定在复制过来的页面的后面；
			selectSwitchers(numpages-1);
        };
        //图片切换函数
        var slide = function(i) {
            selectSwitchers(i);
			if($options.lazyLoad){//====图片懒加载===========================
				for(var j=0;j<numeachpage;j++){
					var imgCon=$slideItems.eq(i*numeachpage+j).find("img");
						imgCon.each(function(){
							if($(this).attr("src")!=$(this).attr("url")){
								var $that=$(this);
								var img = new Image();
								if (img.readyState) {
									img.onreadystatechange = function () {
										if (img.readyState == "loaded" || img.readyState == "complete") {
											img.onreadystatechange = null;
											$that.attr("src",$that.attr("url"));
										}
									};
								} else {
									img.onload = function () {
											$that.attr("src",$that.attr("url"));
									};
								}
								img.src = $that.attr("url");
							}
						});	
				}
			}
			if($options.effect.type=="none"){
				if(i==numpages){
					i=0;
				}
				if(i==-1){
					i=numpages-1;
				}
				$slideItems.css("display","none");
				for(var j=0;j<numeachpage;j++){
					$slideItems.eq(i*numeachpage+j)[$options.effect.effect]($options.effect.last);
				}
				return;
			}

			if($options.effect.type=="fade"){
				if(i==numpages){
					i=0;
				}
				if(i==-1){
					i=numpages-1;
				}
				$slideItems.css("display","none");
				for(var j=0;j<numeachpage;j++){
					$slideItems.eq(i*numeachpage+j).fadeTo(0,0.2,function(){
						$(this).fadeTo($options.effect.last,1)
					});
				}
				
				return;
			}
            if (i == numpages) {
                showFirst();
            } else if (i == -1) {
                showLast();
            } else {
				if(horizontalSlide){
					$slideBoxInner.stop(false, true).animate({ "left": -slideSize*i }, $options.effect.last);
				}else{
					$slideBoxInner.stop(false, true).animate({ "top": -slideSize*i }, $options.effect.last);
				}
            }
        };
		if($options.lazyLoad){
			slide(0);
		}
        //鼠标放小图上切换函数
        $switchers[$options.switcher.event](function() {
            page = $(this).index();
            slide(page);
        });
        //------------------------------------------------------------------------------------------------------------------------------


        //图片自动轮播
        if ($options.autoPlay.bool) {
            $options.slide.hover(
                function() {
                    clearInterval(timmer);
                }, function() {
                    timmer = setInterval(function() {
                        if ($options.direction == "left" || ($options.direction == "up")) {
                            page++;
                            slide(page);
                            if (page == numpages) {
                                page = 0;
                            }
                        } else {
                            page--;
                            slide(page);
                            if (page == -1) {
                                page = numpages - 1;
                            }
                        }
                    }, $options.autoPlay.offset);
                }
            ).trigger("mouseleave");
        };
        //点击上一个下一个切换
        if($btnNext){
		$btnNext.click(function() {
			if($options.effect.type=="fade"&&$options.smooth&&($slideItems.is(":animated"))){
				return;
			}
			if($options.smooth&&($slideBoxInner.is(":animated"))){
				return;
			}
            page++;
			slide(page);
            if (page == numpages) {
                page = 0;
            }
        });		}
		if($btnPrev){
			$btnPrev.click(function() {
			if($options.effect.type=="fade"&&$options.smooth&&($slideItems.is(":animated"))){
				return;
			}
			if($options.smooth&&($slideBoxInner.is(":animated"))){
				return;
			}
            page--;
            slide(page);
            if (page == -1) {
                page = (numpages - 1);
            }
        });
		}

    };

})(jQuery)
