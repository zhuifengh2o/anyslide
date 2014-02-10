        jQuery.fn.slideFocus = function (objSlideFocus,callback1,callback2) {
		//描述：幻灯片焦点图切换动画
		//作者：刘丕水
		//日期：2013/12/16 星期一
            var objSlide = $(this);
            var conSlide = objSlide.children().eq(0); //获取slide主题内容
            var conSlideInner = conSlide.children().eq(0); //获取slide靠近切换的内容的外围；
            var firstSlide = conSlideInner.children().eq(0); //获取第一个切换的内容；
            var numslide = conSlideInner.children().length; //刚开始切换内容的个数；
            var page = 0;
            var timmer;
			var hover=objSlideFocus.hover;
			var switchMethod=objSlideFocus.switchMethod;
			var autoPlay = objSlideFocus.autoPlay;
            var offset = objSlideFocus.offset + objSlideFocus.last;
            var last = objSlideFocus.last;
            var slidefast = objSlideFocus.slideFast;
			var direction = objSlideFocus.direction;
            var smooth = objSlideFocus.smooth;
            var addNpBtn = objSlideFocus.addNpBtn;
			var AddSwitchBtn= objSlideFocus.addSwitchBtn;
			var fadeIn = objSlideFocus.fadeIn;
            var minwidth = firstSlide.width(); //每个小图宽度
            var minheihgt = firstSlide.height(); //每个小图高度
            var visualwidth = conSlide.width(); //可视区宽度
            var visualheight = conSlide.height(); //可视区高度
            //alert(visualwidth)
            var numeachpage = Math.floor(visualwidth / minwidth); //水平滚动每页显示的个数
            var numeachpageY = Math.floor(visualheight / minheihgt) * numeachpage; //垂直滚动每页显示的个数
            var numpages = Math.ceil(numslide / numeachpage); //水平滚动总页数
            var numpagesY = Math.ceil(numslide / numeachpageY); //垂直滚动总页数
            var numslides = numpages * numeachpage; //水平滚动总共需要显示的数量
            var numslidesY = numpages * numeachpageY; ///垂直滚动总共需要显示的数量
            var slidewidth = minwidth * numeachpage; //水平滚动每次滑动的距离
            var slideheight = minheihgt * numeachpageY/numeachpage; //垂直滚动每次滑动的距离
            var maxwidth = slidewidth * (numpages + 2); //切换区总宽度,为更好的兼容 把加1改成加2；
            var maxheight = slideheight * (numpagesY + 2); //切换区总高度,为更好的兼容 把加1改成加2；
            var numremainder = numpages * numeachpage - numslide; //取在当前每页个数和总页数下的差多少正好是每页个数的整数倍；
            //			alert(numremainder);
            //后面补齐a使每页正好是两个A；
            var numremainderY = numpagesY * numeachpageY - numslide; //取在当前每页个数和总页数下的差多少正好是每页个数的整数倍；
            //			alert(numremainder);
            //后面补齐a使每页正好是eachslidenum；
            if(direction=="up" || direction=="down"){
				conSlideInner.css("height", maxheight);
				for (i = 0; i < numremainderY; i++) {
					conSlideInner.append(firstSlide.clone());
					conSlideInner.children().last().html("&nbsp");
				}
			}else{
				for (i = 0; i < numremainder; i++) {
							conSlideInner.append(firstSlide.clone());
							conSlideInner.children().last().html("&nbsp");
						}
				//设置slide_con的最大宽度；
				conSlideInner.css("width", maxwidth);}
				
				//以下代码添加数字按钮和按钮后的半透明长条函数

            //------------------------------------------------------------------------------------------------------------------------------

            //添加切换按钮
			if (objSlide.has(".switcher").length)
			{
				
			}else{
					function addSwitchBtn() {
						var switchBtn = "<div class='switcherBg'></div><div class='switcher'>";


						if(direction=="up" || direction=="down"){
							for (var i = 0; i < numpagesY; i++) {
								switchBtn += "<span>" + (i + 1) + "</span>";
							}

						}else{
										for (var i = 0; i < numpages; i++) {
								switchBtn += "<span>" + (i + 1) + "</span>";
							}
						}

						switchBtn += "</div>";
						objSlide.append(switchBtn);
						//第一按钮加样式
					}
					AddSwitchBtn ? addSwitchBtn() : function () {return;};
				}
			var switcherBtn=objSlide.find(".switcher");
				switcherBtn.children().eq(0).addClass("on");
            function btnAddClass(page) {
                switcherBtn.children().eq(page).addClass("on").siblings().removeClass("on");

            }


            //------------------------------------------------------------------------------------------------------------------------------

            //添加上一个下一个按钮

            function addNextPrevBtn() {
                var nextPrevBtn = "<a class='prev' href='javascript:;'>上一个</a><a class='next' href='javascript:;'>下一个</a>";
                objSlide.append(nextPrevBtn);

            }
            addNpBtn ? addNextPrevBtn() : function () {
                return;
            };
            var btnPrev = objSlide.find(".prev");
            var btnNext = objSlide.find(".next");
            //------------------------------------------------------------------------------------------------------------------------------
			if(hover){
				objSlide.hover(function(){
					conSlide.css("display","block");
				},function(){
					conSlide.css("display","none");
				})
			};
			//如果只有一页的时候就什么也不执行；
			if(numpages==1 || numpagesY==1){return false};
			//------------------------------------------------------------------------------------------------------------------------------

            //=============================图片懒加载===========================
            var aArray = {};
            function toArray() {
                for (i = 0; i < numslides; i++) {
                    if (conSlideInner.children().eq(i).find("textarea")) {
                        aArray[i] = conSlideInner.children().eq(i).find("textarea").text();
                    } else {
                        aArray[i] = "";
                    }

                };
            };
            toArray();


            function loadedPageFirstSlide() {
                for (i = 0; i < numeachpage; i++) {
                    conSlideInner.children().eq(i).find("textarea").replaceWith(aArray[i]);
                }
                ;
            }
            function loadedPageLastSlide() {
                for (i = 0; i < numslides; i++) {
                    conSlideInner.children().eq(numslides - 1 - i).find("textarea").replaceWith(aArray[i]);
                }
                ;
            }

            function loadedPageAllSlide() {
                for (i = 0; i < numslides; i++) {
                    conSlideInner.children().eq(numslides - 1 - i).find("textarea").replaceWith(aArray[i]);
                }
                ;
            }

            //默认装载第一屏,在平滑滚动显示最后一页（点击和自动）和快速显示最后一页（点击和自动）按需加载全部或最有一屏；
            loadedPageFirstSlide();

            //------------------------------------------------------------------------------------------------------------------------------

            //图片切换函数
            //-------------1.a平滑切换X水平
            function slide(page) {

                var imgShowNum = 0;
                imgShowNum = numeachpage * (page + 1);
                for (i = 0; i < imgShowNum; i++) {
                    conSlideInner.children().eq(i).find("textarea").replaceWith(aArray[i]);
                }
                ;
                ; conSlideInner.stop(false, true).animate({ left: -slidewidth * page }, last);
                btnAddClass(page);
            }
            //-------------1.b平滑切换Y垂直
            function slideY(page) {

                var imgShowNum = 0;
                imgShowNum = numeachpageY * (page + 1);
                for (i = 0; i < imgShowNum; i++) {
                    conSlideInner.children().eq(i).find("textarea").replaceWith(aArray[i]);
                }
                ; conSlideInner.stop(false, true).animate({ top: -slideheight * page }, last);
                btnAddClass(page);
            }
            //---------------2.a快速切换
            function fastSlide(page) {
                var imgShowNum = 0;
                imgShowNum = numeachpage * (page + 1);
                for (i = 0; i < imgShowNum; i++) {
                    conSlideInner.children().eq(i).find("textarea").replaceWith(aArray[i]);
                }
                ;
                conSlideInner.children().css("display", "none");
                numfastSlide = numeachpage * page;
                for (j = 0; j < numeachpage; j++) {
					function fastSlideNormal(){conSlideInner.children().eq(numfastSlide + j).css("display", "block");}
					function fastSlideFade(fadeIn){conSlideInner.children().eq(numfastSlide + j).fadeIn();}
					fadeIn>0 ? fastSlideFade(fadeIn) : fastSlideNormal();
                }

                btnAddClass(page);
            }
            //---------------2.b快速切换
            function fastSlideY(page) {
                var imgShowNum = 0;
                imgShowNum = numeachpageY * (page + 1);
                for (i = 0; i < imgShowNum; i++) {
                    conSlideInner.children().eq(i).find("textarea").replaceWith(aArray[i]);
                }
                ;
                conSlideInner.children().css("display", "none");
                numfastSlide = numeachpageY * page;
                for (j = 0; j < numeachpageY; j++) {
					function fastSlideNormal(){conSlideInner.children().eq(numfastSlide + j).css("display", "block");}
					function fastSlideFade(fadeIn){conSlideInner.children().eq(numfastSlide + j).fadeIn();}
					fadeIn>0 ? fastSlideFade(fadeIn) : fastSlideNormal();
                }

                btnAddClass(page);
            }

            //------------------------------------------------------------------------------------------------------------------------------

            //鼠标放小图上切换函数
            //1.快速切换
            function switchbtnFast() {
			if(switchMethod=="mouseenter"){
				switcherBtn.children().mouseenter(function () {
                page = $(this).index();
                fastSlide(page);
                });
			}else{
				switcherBtn.children().click(function () {
                page = $(this).index();
                fastSlide(page);
                });
			}
            }
            //2.平滑切换
            function switchbtn() {
				if(switchMethod=="mouseenter"){
					switcherBtn.children().mouseenter(function () {
                    page = $(this).index();
                    slide(page);
					});
				}else{
					switcherBtn.children().click(function () {
                    page = $(this).index();
                    slide(page);
					});
				}
            }
            //3.平滑切换
            function switchbtnY() {
				if(switchMethod=="mouseenter"){
					switcherBtn.children().mouseenter(function () {
					page = $(this).index();
                    slideY(page);
					});
				}else{
					switcherBtn.children().click(function () {
                    page = $(this).index();
                    slideY(page);
					});
				}					
            }
            //鼠标放小图上切换
    //        slidefast ? switchbtnFast() : switchbtn();
			if (slidefast){switchbtnFast();}else{
			if(!slidefast&&(direction=="up" || direction=="down")){
				switchbtnY();
				}else{
					switchbtn();
				}};

            //------------------------------------------------------------------------------------------------------------------------------


            //平滑显示第一页函数X

            function showFirst() {
                for (i = 0; i < numeachpage; i++) {
                    conSlideInner.append(conSlideInner.children().eq(i).clone());
                }
                ;
                conSlideInner.stop(false, true).animate({ left: -slidewidth * numpages }, last, function () {
                    conSlideInner.css("left", "0");
                    for (i = 0; i < numeachpage; i++) {
                        conSlideInner.children().last().remove();
                    }
                });
                btnAddClass(page);
            }
            //平滑显示第一页函数Y

            function showFirstY() {
                for (i = 0; i < numeachpageY; i++) {
                    conSlideInner.append(conSlideInner.children().eq(i).clone());
                }
                ;
                conSlideInner.stop(false, true).animate({ top: -slideheight * numpagesY }, last, function () {
                    conSlideInner.css("top", "0");
                    for (i = 0; i < numeachpageY; i++) {
                        conSlideInner.children().last().remove();
                    }
                });
                btnAddClass(page);
            }

            //平滑显示最后一页函数X

            function showLast() {
                loadedPageLastSlide();
                for (i = 0; i < numeachpage; i++) {
                    conSlideInner.prepend(conSlideInner.children().last());
                } //复制最后一页追加到第一页前面
                conSlideInner.css("left", -slidewidth * 1); //把位置定在复制过来的页面的后面；
                conSlideInner.stop(false, true).animate({ left: 0 }, last, function () {
                    conSlideInner.css("left", -slidewidth * (numpages - 1));
                    for (i = 0; i < numeachpage; i++) {
                        conSlideInner.append(conSlideInner.children().first());
                    }
                }); //利用animate函数，向左移动一页，结束的同时把位置定在使最后一页显示并且把复制过来的页面删掉；
					btnAddClass(page);//给最后一页数字加上选中样式；
            }
            //平滑显示最后一页函数Y

            function showLastY() {
                loadedPageLastSlide();
                for (i = 0; i < numeachpageY; i++) {
                    conSlideInner.prepend(conSlideInner.children().last());
                } //复制最后一页追加到第一页前面
                conSlideInner.css("top", -slideheight * 1); //把位置定在复制过来的页面的后面；
                conSlideInner.stop(false, true).animate({ top: 0 }, last, function () {
                    conSlideInner.css("top", -slideheight * (numpagesY - 1));
                    for (i = 0; i < numeachpageY; i++) {
                        conSlideInner.append(conSlideInner.children().first());
                    }
                }); //利用animate函数，向左移动一页，结束的同时把位置定在使最后一页显示并且把复制过来的页面删掉；
                btnAddClass(page);//给最后一页数字加上选中样式；
            }

            //------------------------------------------------------------------------------------------------------------------------------

            //向右快速切换按钮

            function btnNextClickFast() {
                page++;

			if(direction=="up" || direction=="down"){
					//下一个
					if(page < numpagesY){
						fastSlideY(page);
					}else{
						if(callback1){callback1() ;  page = numpages - 1 ; return false ;};//增加回调函数；
						fastSlideY(0);
						page = 0;
					}
				}else{
						if (page < numpages) {
						fastSlide(page);
					} else {
						if(callback1){callback1() ;  page = numpages - 1 ; return false ;};//增加回调函数；
						fastSlide(0);
						page = 0;
					}

				}
            }

            ;
            //向左快速切换按钮

            function btnPrevClickFast() {
                page--;
			if(direction=="up" || direction=="down"){
					//下一个
					if (page > -1) {
						fastSlideY(page);
					} else {
						if(callback2){callback2(); page = 0 ; return false;};//增加回调函数；
						fastSlideY(numpagesY - 1);
						page = numpagesY - 1;
					}
				}else{
					if (page > -1) {
						fastSlide(page);
					} else {
						if(callback2){callback2(); page = 0 ; return false;};//增加回调函数；
						fastSlide(numpages - 1);
						page = numpages - 1;
					}

				}

            }

            ;
            //向右平滑切换按钮

            function btnPrevClick() {
                if (smooth) {
                    if (!conSlideInner.is(":animated")) {
                        page--;
                        if (page > -1) {
                            slide(page);
                        } else {
							if(callback2){callback2(); page = 0 ; return false;};//增加回调函数；
                            page = numpages - 1;
                            showLast();
                        }
                    }

                } else {
                    page--;
                    if (page > -1) {
                        slide(page);
                    } else {
						if(callback2){callback2(); page = 0 ; return false;};//增加回调函数；
                        page = numpages - 1;
                        showLast();
                    }
                }
            }

            ;
            //向上平滑切换按钮

            function btnPrevClickUp() {
                if (smooth) {
                    if (!conSlideInner.is(":animated")) {
                        page--;
                        if (page > -1) {
                            slideY(page);
                        } else {
							if(callback2){callback2(); page = 0 ; return false;};//增加回调函数；
                            page = numpagesY - 1;
                            showLastY();
                        }
                    }

                } else {
                    page--;
                    if (page > -1) {
                        slideY(page);
                    } else {
						if(callback2){callback2(); page = 0 ; return false;};//增加回调函数；
                        page = numpagesY - 1;
                        showLastY();
                    }
                }
            }

            ;
            //向左平滑切换
            function btnNextClick() {
                if (smooth) {
                    if (!conSlideInner.is(":animated")) {
                        page++;
                        if (page < numpages) {
                            slide(page);
                        } else {
							if(callback1){callback1() ;  page = numpages - 1 ; return false ;};//增加回调函数；
                            page = 0;
                            showFirst();
                        }
                    }
                } else {
                    page++;
                    if (page < numpages) {
                        slide(page);
                    } else {
						if(callback1){callback1() ;  page = numpages - 1 ; return false ;};//增加回调函数；
                        page = 0;
                        showFirst();
                    }
                }
            }

            ;
            //向下平滑切换
            function btnNextClickDown() {
                if (smooth) {
                    if (!conSlideInner.is(":animated")) {
                        page++;
                        if (page < numpagesY) {
                            slideY(page);
                        } else {
							if(callback1){callback1() ;  page = numpages - 1 ; return false ;};//增加回调函数；
                            page = 0;
                            showFirstY();
                        }
                    }
                } else {
                    page++;
                    if (page < numpagesY) {
                        slideY(page);
                    } else {
						if(callback1){callback1() ;  page = numpages - 1 ; return false ;};//增加回调函数；
                        page = 0;
                        showFirstY();
                    }
                }
            }

            ;

            //------------------------------------------------------------------------------------------------------------------------------

            //图片自动轮播
            //右快

            function objSlideFocusLfast() {
                objSlide.hover(
                    function () {
                        clearInterval(timmer);
                    }, function () {
                        timmer = setInterval(function () {
                            page--;
                            if (page < 0) {
								if(callback2){callback2(); page = 0 ; return false;};//增加回调函数；
                                page = numpages;
                                fastSlide(numpages - 1);
                            } else {
                                fastSlide(page);
                            }

                        }, offset);
                    }
                ).trigger("mouseleave");

            }

            ;
            //下快

            function objSlideFocusDfast() {
                objSlide.hover(
                    function () {
                        clearInterval(timmer);
                    }, function () {
                        timmer = setInterval(function () {
                            page--;
                            if (page < 0) {
								if(callback2){callback2(); page = 0 ; return false;};//增加回调函数；
                                page = numpagesY-1;
                                fastSlideY(numpagesY - 1);
                            } else {
                                fastSlideY(page);
                            }

                        }, offset);
                    }
                ).trigger("mouseleave");

            }

            ;

            //左快

            function objSlideFocusRfast() {
                objSlide.hover(
                    function () {
                        clearInterval(timmer);
                    }, function () {
                        timmer = setInterval(function () {
                            page++;
                            if (page > numpages - 1) {
								if(callback1){callback1() ;  page = numpages - 1 ; return false ;};//增加回调函数；
                                page = 0;
                                fastSlide(0);
                            } else {
                                fastSlide(page);
                            }

                        }, offset);
                    }
                ).trigger("mouseleave");
            }

            ;
            //上快

            function objSlideFocusUfast() {
                objSlide.hover(
                    function () {
                        clearInterval(timmer);
                    }, function () {
                        timmer = setInterval(function () {
                            page++;
                            if (page > numpagesY - 1) {
								if(callback1){callback1() ;  page = numpages - 1 ; return false ;};//增加回调函数；
                                page = 0;
                                fastSlideY(0);
                            } else {
                                fastSlideY(page);
                            }

                        }, offset);
                    }
                ).trigger("mouseleave");
            }

            ;

            //右平

            function objSlideFocusR() {
                objSlide.hover(
                    function () {
                        clearInterval(timmer);
                    }, function () {
                        timmer = setInterval(function () {
                            page--;
                            if (page < 0) {
								if(callback2){callback2(); page = 0 ; return false;};//增加回调函数；
                                page = numpages-1;
                                showLast();
                            } else {
                                slide(page);
                            }

                        }, offset);
                    }
                ).trigger("mouseleave");

            }

            ;
            //下平

            function objSlideFocusD() {
                objSlide.hover(
                    function () {
                        clearInterval(timmer);
                    }, function () {
                        timmer = setInterval(function () {
                            page--;
                            if (page < 0) {
								if(callback2){callback2(); page = 0 ; return false;};//增加回调函数；
                                page = numpagesY-1;
                                showLastY();
                            } else {
                                slideY(page);
                            }

                        }, offset);
                    }
                ).trigger("mouseleave");

            }

            ;
            //左平

            function objSlideFocusL() {
                objSlide.hover(
                    function () {
                        clearInterval(timmer);
                    }, function () {
                        timmer = setInterval(function () {
								page++;
								if (page > numpages - 1) {
									if(callback1){callback1() ;  page = numpages - 1 ; return false ;};//增加回调函数；
									page = 0;
									showFirst();
								} else {
									slide(page);
								}

                        }, offset);
                    }
                ).trigger("mouseleave");
            }

            ;
            //上平

            function objSlideFocusU() {
                objSlide.hover(
                    function () {
                        clearInterval(timmer);
                    }, function () {
                        timmer = setInterval(function () {
                            page++;
                            if (page > numpagesY - 1) {
								if(callback1){callback1() ;  page = numpages - 1 ; return false ;};//增加回调函数；
                                page = 0;
                                showFirstY();
                            } else {
                                slideY(page);
                            }

                        }, offset);
                    }
                ).trigger("mouseleave");
            }

            ;

            //------------------------------------------------------------------------------------------------------------------------------

            if (slidefast) {
                //下一个
                btnNext.click(function () {
                    btnNextClickFast();
                });
                //上一个
                btnPrev.click(function () {
                    btnPrevClickFast();
                }
                );
            }else{
				if(!slidefast&&(direction=="up" || direction=="down")){
						//下一个
						btnNext.click(function () {
							btnNextClickDown();


						});
						//上一个
						btnPrev.click(function () {
							btnPrevClickUp();
						}
						);
					}else{
					//下一个
					btnNext.click(function () {
						btnNextClick();


					});
					//上一个
					btnPrev.click(function () {
						btnPrevClick();
					}
					);

					}
			}
            ;

					if(autoPlay && slidefast && objSlideFocus.direction == "right"){
						loadedPageLastSlide();
						objSlideFocusRfast();
					}else
						if(autoPlay && !slidefast && objSlideFocus.direction == "right"){
						loadedPageLastSlide();
						objSlideFocusR();
					}else
						if(autoPlay && slidefast && objSlideFocus.direction == "down"){
						loadedPageLastSlide();
						objSlideFocusDfast();
					}else
						if(autoPlay && !slidefast && objSlideFocus.direction == "down"){
						loadedPageLastSlide();
						objSlideFocusD();
					}else
						if(autoPlay && slidefast && objSlideFocus.direction == "left"){
						objSlideFocusLfast();
					}else
						if(autoPlay && !slidefast && objSlideFocus.direction == "left"){
						objSlideFocusL();
					}else
						if(autoPlay && slidefast && objSlideFocus.direction == "up"){
						objSlideFocusUfast();
					}else
						if(autoPlay && !slidefast && objSlideFocus.direction == "up"){
						objSlideFocusU();
					}else
						if(autoPlay && !slidefast){
						objSlideFocusR();
					}else
						if(autoPlay && slidefast){
						objSlideFocusRfast();
					};

        };
		
        /******sideFous(slideFast,hover,switchMetchod,autoPlay,addSwitchBtn,addNpBtn,fadeIn,Direction,smooth,offset,last)
		hover:布尔值，控制主题内容的显示隐藏为hover效果，默认没有hover效果；

		
		switcherMethod：切换方法，鼠标点击切换(click)，还是鼠标移入切换(mouseenter)；
        AddSwitchBtn :（数字按钮）为布尔值，false和默认不显示true时显示；addNpBtn（上一个下一个按钮）也是布尔值，默认不显示，true时显示；
        addNpBtn : 布尔值,下一个上一个按钮；
        slideFast : 布尔值，是否瞬间切换，默认false（不瞬间切换）,为true（瞬间切换）时，以下设置无效；
        offset : 为播放时间间隔；
        last : 为持续时间；
        smooth : 为布尔值,是否等一个动画结束才开始另一个动画，默认为false(等一个动画不结束就可以开始另一个动画)；
        direction : 有left,right,up,down四个方向,若为上下滚动则宽度要为可视宽度；
        fadeIn : 快速切换时，可设置渐显时间，可不设置（瞬间切换）；
        autoPlay : 是否自动播放幻灯片；
		自定义数字按钮内容：数字按钮外围样式须为.switcher，此时不会再加数字按钮（AddSwitcherBtn失效）；
		增加两个回调函数，第一个到达最后一页的回调，第二个到达第一页的回调函数；
        ******/
