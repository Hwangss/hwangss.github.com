//判断是否支持某CSS属性

function cssCanUse(arr) {
  var element = document.createElement('div');
	var flag = false;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] in element.style) {
			flag = true;
		}
	}
	return flag;
}

$(function() {
	//若能执行动画则等待开场动画结束，否则就直接淡出
	var bAnimation = cssCanUse(["-webkit-animation", "-moz-animation", "-o-animation", "-ms-animaition", "animation"])
	var coverSte;
	if (bAnimation) {
		coverStep = 0;
		$("#cover").bind('oanimationend animationend webkitAnimationEnd', function() {
			coverStep++;
			coverStep == 4 && $(this).parent().hide();
		});
	} else {
		$("#cover").parent().fadeOut(3000)
	}
})
