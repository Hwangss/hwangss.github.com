//this page
var mss = {
	cover: function() {
		//若能执行动画则等待开场动画结束，否则就直接淡出
		var wrap = get("coverWrap");
		var ele = get("cover");
		var main=get("main");
		var bAnimation = cssCanUse(["-webkit-animation", "-moz-animation", "-o-animation", "-ms-animaition", "animation"])
		var coverSte;
		show(wrap)
		if (bAnimation) {

			coverStep = 0;
			addEvent(ele, "oanimationend", function() {
				coverStep++;
				coverStep == 4 && function() {
					hide(wrap);
					show(main);
					normalMove(main,{"opacity":"100"});
				}()

			})
			addEvent(ele, "animationend", function() {
				coverStep++;
				coverStep == 4 && function() {
					hide(wrap);
					show(main);
					normalMove(main,{"opacity":"100"});
				}()
			})
			addEvent(ele, "webkitAnimationEnd", function() {
				coverStep++;
				coverStep == 4 && function() {
					hide(wrap);
					show(main);
					normalMove(main,{"opacity":"100"});
				}();
			})
		} else {
			setTimeout(function() {
				hide(wrap);
				show(main);
			}, 2000)
		}
	},
	init: function() {
		hide(get("loading"));
		this.cover();
	}
}
addEvent(window,"load",function  () {
	mss.init();
});
