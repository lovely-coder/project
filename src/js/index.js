;(function($){
	$.fn.carousel = function(param){
		var carousel = param.carousel,//轮播框架
		indexContainer = param.indexContainer,//下标框架
		list = $(carousel).children("li"),//轮播内容
		len = list.length,//轮播内容数量
		prev = param.prev,//上翻按钮
		next = param.next,//下翻按钮
		timing = param.timing,//自动轮播间隔时间
		animateTime = param.animateTime,//动画时间
		autoPlay = param.autoPlay,//自动播放 true/false
		timer,//定时器
		index = 1,//索引值
		indexList,//下标列表
		indexClassName = "js_index",//下标高亮类名
		action = true,//开始滚动 true/false
		totalWidtn = list.width()*(list.length+2),//轮播框架总宽度
		direction = param.direction;//滚动方向
		
		/*初始化*/
		for(var i = 1;i <= list.length;i++){
			$(indexContainer).append("<li>"+i+"</li>")
		}
		$(carousel).width(totalWidtn)
		.append($(list[0]).clone())
		.prepend($(list[list.length-1]).clone())
		.css("left","-"+list.width()+"px");
		list = $(carousel).children("li");
		indexList = $(indexContainer).children("li");
		$(indexList[index-1]).addClass(indexClassName);

		/*判断是否自动播放*/
		if (autoPlay) {
			startTiming();
			$(carousel+","+prev+","+next+","+indexContainer).hover(function(){
				window.clearInterval(timer);
			},function(){
				startTiming();
			});
		}

		/*计时方法*/
		function startTiming(){
			/*判断方向*/
			switch (direction) {
				case "right" :
					timer = window.setInterval("$.rightChangeImg();",timing);
				break;
				case "left" :
					timer = window.setInterval("$.leftChangeImg();",timing);
				break;
				default:
					timer = window.setInterval("$.leftChangeImg();",timing);
			}
		};

		/*切换高亮下标*/
		$.extend({changeIndex:function(index){
			$(indexList).removeClass(indexClassName);
			$(indexList[index]).addClass(indexClassName);
		}});
		

		/*向左切换图片*/
		$.extend({leftChangeImg:function(){
			action = false;
			if (index==len) {
				index = 0;
				$(carousel).stop(true,true).css("left","0px");
			}
			index++;
			$(carousel).stop(true,true).animate({
				left : "-="+list.width()+"px"
			},animateTime);
			setTimeout(function(){
				if (index==len) {
					index = 0;
					$(carousel).stop(true,true).css("left","0px");
				}
				action = true;
			},animateTime);
			$.changeIndex(index-1);
		}});

		/*向右切换图片*/
		$.extend({rightChangeImg:function(){
			action = false;
			if (index==0) {
				index = len;
				$(carousel).stop(true,true).css("left","-"+left+"px");
			}
			index--;
			var left = totalWidtn-list.width()*2;
			$(carousel).stop(true,true).animate({
				left : "+="+list.width()+"px"
			},animateTime);
			setTimeout(function(){
				if (index==0) {
					index = len;
					$(carousel).stop(true,true).css("left","-"+left+"px");
				}
				action = true;
			},animateTime);
			if (index == 0) {
				$.changeIndex(len-1);
			}else{
				$.changeIndex(index-1);
			}
		}});

		/*下翻点击处理*/
		$(next).on("click",function(){
			var nowLeft = Math.abs(parseInt($(carousel).css("left")));
			var left = totalWidtn-list.width()*2;
			if (action) {
				if (nowLeft == left) {
					index = 0;
					$(carousel).stop(true,true).css("left","0px");
				}
				$.leftChangeImg();
			}
		});

		/*上翻点击处理*/
		$(prev).on("click",function(){
			var nowLeft = Math.abs(parseInt($(carousel).css("left")));
			var left = totalWidtn-list.width()*2;
			if (action) {
				if (nowLeft == 0) {
					index = len;
					$(carousel).stop(true,true).css("left","-"+left+"px");
				}
				$.rightChangeImg();
			}
		});

		/*下标点击处理*/
		indexList.on("click",function(){
			var no = $(this).index()+1;
			if (action) {
				if (no > index) {
					$.changeIndex(no-1);
					action = false;
					var left = (no - index)*list.width();
					index = no;
					$(carousel).stop(true,true).animate({
						left : "-="+left+"px"
					},animateTime);
					setTimeout(function(){
						action = true;
					},animateTime);
				}else if (no < index) {
					$.changeIndex(no-1);
					action = false;
					var left = (index - no)*list.width();
					index = no;
					$(carousel).stop(true,true).animate({
						left : "+="+left+"px"
					},animateTime);
					setTimeout(function(){
						action = true;
					},animateTime);
				}
	
			}
		});
	}
})(jQuery);

class Index{
	constructor(){
		this.addMenu();
		this.addIcon();
		this.addEvent();
	}
	addMenu(){
        let $a = $('.nav a');
        let $menu = $('#menu');
        $.get('json/index.json',(data) =>{
            console.log(data.menu1);
            var menu = data.menu1;
            var menu1 = menu.sp1;
            var menus = data.sp2;
            var menu2 = menus.one;
            console.log(menu2);
            //console.log(menu1);
            $(menu1).each(function(index,value){
                $("<li>" + menu1[index] + "</li>").appendTo('.one');
            })
            $(menu2).each(function(index,vlaue){
                $('<a herf="">' + menu2[index] + "</a>").appendTo('.two');
            })
            $a.each(function(index,value){
                $(this).mouseenter(function(){
                    $(this).eq(index).css('border-bottom','5px solid blue');
                    $menu.css('display','block');
                })
            })
            $menu.mouseout(function(){
                $(this).css('display','none')
            })
        })
    }
	addIcon(){
		var $icon = $('.icon-iconzhengli-');
		$icon.each(function(index,value){
			$(value).mouseenter(function(){
				$(this).css('color','blue');
			})
			$(value).mouseout(function(){
				$(this).css('color','#005aaa');
			})
		})
	}
	addEvent(){
		var $washer = $('.washer');
		var $img = $('.washer img')
		var $line = $('.washer .line');
		var $lines = $('.ice .line');
		var $ice = $('.ice');
		var $imgs = $('.ice img');
		var $image = $('.rank-ice .pic');
		var $box = $('.rank-ice li');
		var $h4 = $('.rank-ice li h4');
		var $act_left = $('.act_left');
		var $act_right = $('.act_right');
		var $act_lf_img = $('.act_left img');
		var $act_rt_img = $('.act_right img');
		var $span1 = $('.img1 span');
		var $span2 = $('.img2 span');
		var $link = $('.casarte span');
		var $a = $('.casarte a');
		var $s1 = $('.s1');
		var $inforLeft = $('.inforLeft');
		var $infor_img = $('.inforLeft img');
		var $h3 = $('.inforLeft h3');
		var $p = $('.inforLeft p');
		var $solid = $('.solid span').eq(0);
		var $inforRight = $('.inforRight li');
		var $infor_h4 = $('.inforRight h4');
		var $infor_p = $('.inforRight p'); 
		var $solids = $('.solid1 span');
		var $as = $('.footer a');
		var $icon = $('.icon-weixin1');
		var $wx = $('.bt-right img');
		var $card = $('.card .icon-gouwuche');
		var $zhanghao = $('.card .icon-zhanghao');
		var $znjj = $('.znjj');
		$washer.mouseenter(function(){
			$img.css('transform','scale(1.08)').css('transition','transform 0.8s');
			$line.css('display','block');
			$(this).css('box-shadow','0 10px 24px rgba(0, 0, 0, 0.25)');
		})
		$washer.mousemove(function(){
			$img.css('transform','scale(1.08)');
			$line.css('display','block');
			$(this).css('box-shadow','0 10px 24px rgba(0, 0, 0, 0.25)');
		})
		$washer.mouseout(function(){
			$img.css('transform','scale(1)');
			$line.css('display','none');
			$(this).css('box-shadow','none');
		})
		$ice.each(function(index,value){
			$(this).mouseenter(function(){
				$(value).css('box-shadow','0 10px 24px rgba(0, 0, 0, 0.25)');
				$lines.eq(index).css('display','block').css('transition','transform 0.8s');
				$imgs.eq(index).css('transform','scale(1.08)').css('transition','transform 0.8s');
			});
			$(this).mousemove(function(){
				$(this).css('box-shadow','0 10px 24px rgba(0, 0, 0, 0.25)');
				$lines.eq(index).css('display','block').css('transition','transform 0.8s');
				$imgs.eq(index).css('transform','scale(1.08)').css('transition','transform 0.8s');
			})
			$(this).mouseout(function(){
				$(this).css('box-shadow','none');
				$lines.each(function(){
				})
				$lines.eq(index).css('display','none');
				$imgs.eq(index).css('transform','scale(1)');
			})
		})
		$box.each(function(index,value){
			$(value).mouseenter(function(){
				$(this).css('box-shadow','0 10px 24px rgba(0, 0, 0, 0.25)').css('transition','transform 0.8s');
				$image.eq(index).css('transform','scale(1.08)').css('transition','transform 0.8s');
				$h4.each(function(index,value){
					$(value).mouseenter(function(){
						$(this).css('box-shadow',' 0 10px 24px rgba(0, 0, 0, 0.25)').css('transition','transform 0.8s');
					})
					$(value).mousemove(function(){
						$(this).css('box-shadow',' 0 10px 24px rgba(0, 0, 0, 0.25)').css('transition','transform 0.8s');
					})
					$(value).mouseout(function(){
						$(this).css('box-shadow','none').css('transition','transform 0.8s');
					})
				})
			})
			$(value).mousemove(function(){
				$(this).css('box-shadow','0 10px 24px rgba(0, 0, 0, 0.25)').css('transition','transform 0.8s');
				$image.eq(index).css('transform','scale(1.08)').css('transition','transform 0.8s');
			})
			$(value).mouseout(function(){
				$(this).css('box-shadow',' 0 3px 10px rgba(0, 0, 0, 0.1)').css('transition','transform 0.8s');
				$image.eq(index).css('transform','scale(1)').css('transition','transform 0.8s');
			})
		})

		$act_left.mouseenter(function(){
			$act_lf_img.css('transform','scale(1.08)').css('transition','transform 0.8s')
			$span1.css('display','block').css('transition','transform 0.8s');
		})
		$act_left.mousemove(function(){
			$act_lf_img.css('transform','scale(1.08)').css('transition','transform 0.8s')
			$span1.css('display','block').css('transition','transform 0.8s');
			$('.act_img').css('z-index','1');
		})
		$act_left.mouseout(function(){
			$act_lf_img.css('transform','scale(1)').css('transition','transform 0.8s')
			$span1.css('display','none').css('transition','transform 0.8s');

		})
		$act_right.mouseenter(function(){
			$act_rt_img.css('transform','scale(1.08)').css('transition','transform 0.8s')
			$span2.css('display','block').css('transition','transform 0.8s');

		})
		$act_right.mousemove(function(){
			$act_rt_img.css('transform','scale(1.08)').css('transition','transform 0.8s')
			$span2.css('display','block').css('transition','transform 0.8s');

		})
		$act_right.mouseout(function(){
			$act_rt_img.css('transform','scale(1)').css('transition','transform 0.8s')
			$span2.css('display','none').css('transition','transform 0.8s');

		})
		$link.each(function(index,value){
			$a.eq(index).mouseenter(function(){
				$(value).css('transform','scale(1.08)').css('transition','all 0.8s');
				$s1.eq(index).css('box-shadow',' 0 10px 24px rgba(0, 0, 0, 0.25)')
			});
			$a.eq(index).mousemove(function(){
				$(value).css('transform','scale(1.08)').css('transition','all 0.8s');
				$s1.eq(index).css('box-shadow',' 0 10px 24px rgba(0, 0, 0, 0.25)')
			});
			$a.eq(index).mouseout(function(){
				$(value).css('transform','scale(1)').css('transition','all 0.8s');
				$s1.eq(index).css('box-shadow','none')
			})
		})

		
		$inforLeft.mousemove(function(){
			$infor_img.css('transform','scale(1.08)').css('transition','transform 0.8s');
			$h3.css('color','#005aaa').css('transition','transform 0.8s');
			$p.css('color','#005aaa').css('transition','transform 0.8s');
			$solid.css('width','100%').css('transition','all 0.8s');
		})
		$inforLeft.mouseout(function(){
			$infor_img.css('transform','scale(1)').css('transition','transform 0.8s');
			$h3.css('color','#111');
			$p.css('color','#111');
			$solid.css('width','60px').css('transition','all 0.8s');
		})
		$inforRight.each(function(index,value){
			$(this).mousemove(function(){
				$infor_p.eq(index).css('color','#005aaa');
				$infor_h4.eq(index).css('color','#005aaa');
				$solids.eq(index).css('width','100%').css('transition','all 0.8s');

			});
			$(this).mouseout(function(){
				$infor_p.eq(index).css('color','#111');
				$infor_h4.eq(index).css('color','#111');
				$solids.eq(index).css('width','60px').css('transition','all 0.8s');
			})
			
		})
		$as.each(function(){
			$(this).mouseenter(function(){
				$(this).css('text-decoration','underline');
			})
			$(this).mouseout(function(){
				$(this).css('text-decoration','none');
			})
			
		})
		$icon.mouseenter(function(){
			$(this).css('color','#09bb07');
			$wx.css('display','block');
		});
		$icon.mouseout(function(){
			$(this).css('color','grey');
			$wx.css('display','none');
		});
		$card.click(function(){
			window.open('http://localhost/haier2101/src/pages/card.html');
		});
		$zhanghao.click(function(){
			window.open('http://localhost/haier2101/src/pages/login.html');
		});
		$znjj.click(function(){
			window.open('http://localhost/haier2101/src/pages/list.html');
		});
	}
}
new Index();




