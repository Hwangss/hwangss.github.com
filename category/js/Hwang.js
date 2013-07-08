function normalMove(obj, json, callback) {
  //清除定时器，防止运动冲突
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bStop=true;
		for(var attr in json)
		{
			var cur = 0;
			if(attr == "opacity") {
				//防止小数乘大数出现误差，而进行的四舍五入
				cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				cur = parseInt(getStyle(obj, attr));
			}
			var speed = (json[attr] - cur) / 6;
			//像素没有小数，所以正数向上取整，负数向下取整
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(cur!=json[attr])
			{
				bStop=false;//当有未完成的运动都不能停止定时器
			}
			if(attr == "opacity") {
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';//IE
				obj.style.opacity = (cur + speed) / 100;//FF CH
			} else {
				obj.style[attr] = cur + speed + "px";
			}
		}
		if(bStop)
		{
			clearInterval(obj.timer);
			if(callback) callback();
		}
	}, 30)
}

function getStyle(obj, name) {
	//IE独有的currentStyle
	if (obj.currentStyle) {
		return obj.currentStyle[name]
	} else {
		//高级浏览器用的
		return getComputedStyle(obj, false)[name]
	}
}

function getClass(oParent, sClass) {
	var aEle = oParent.getElementsByTagName('*');
	var aResult = [];
	var reg = new RegExp("\\b" + sClass + "\\b");
	for (var i = 0; i < aEle.length; i++) {
		if (aEle[i].className.match(reg)) {
			aResult.push(aEle[i]);
		}
	};
	return aResult;
}


function addLoadEvent(fn) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = fn;
	} else {
		window.onload = function() {
			oldonload();
			fn();
		}
	}
}

function addEvent(elem, type, fn) {
	if (elem.addEventListener) {
		elem.addEventListener(type, fn, false);
	} else {
		elem.attachEvent('on' + type, fn);
	}
}

function cssCanUse(arr) {
	//判断是否支持某CSS属性
	var element = document.createElement('div');
	var flag = false;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] in element.style) {
			flag = true;
		}
	}
	return flag;
}

function get(id) {
	return document.getElementById(id);
}

function show(ele) {
	ele.style.display = "block";
}

function hide(ele) {
	ele.style.display = "none";
}

Array.prototype.difference = function() {
	var a = [],
		b = [];
	for (var i in this) {
		var item = this[i]
		var key = typeof(item) + item
		if (item === a[i]) continue;
		if (b[key] != "") {
			a.push(item);
			b[key] = "";
		}
	}
	return a;
}
