var Evt = Evt || (function(){
	var pool = {};
	return {
		call : function(name, data){
			var e = {
				event : name,
				 data : data || {}
			}
			pool[name] = (pool[name] || []).filter(function(listener){
				listener.fn(e);
				return !listener.once;
			});
			return this;
		},
		on   : function(name, fn, once){
			if(typeof fn=='function'){
				name.split('|').forEach(function(item){
					pool[item] = (pool[item] || []).concat({
						  fn : fn,
						once : !!once
					});
				});
			}
			return this;
		},
		off  : function(name, fn){
			name.split('|').forEach(function(item){
				pool[item] = (pool[item] || []).filter(function(listener){
					return listener.fn!=fn;
				});
			});
			return this;
		},
		one  : function(name, fn){
			return this.on(name, fn, true);
		}
	}
}());



//SAPP框架
window.SAPP = {
	init : function(para){
		this.init = null;
		SAPP.config = para || {};

		SAPP.swipe();
		SAPP.fill();
		SAPP.page = SAPP.page();
		SAPP.audio = SAPP.audio();

		Evt.on('SWIPE', function(e){
			if(typeof SAPP.config.pageRouter == 'function') {
				SAPP.config.pageRouter({page:SAPP.page.now, dir:e.data.dir});
			}
		});
	}
};


//滑动模块
SAPP.swipe = function(){
	var ox,oy,nx,ny,
		scrollLock = false,
		move = function(e){
			if(scrollLock) return;
			if(SAPP.config.touchmoveLock) event.preventDefault();
		},
		start = function(e){
			var target = $(e.target);
			scrollLock = target.hasClass('scrollable') || !!target.parents('.scrollable').length;
			if(scrollLock) return;
			ox = e.clientX || e.changedTouches[0].clientX;
			oy = e.clientY || e.changedTouches[0].clientY;
		},
		end = function(e){
			if(scrollLock) return;
			nx = e.clientX || e.changedTouches[0].clientX;
			ny = e.clientY || e.changedTouches[0].clientY;
			//
			var dx = nx - ox,
				dy = ny - oy;
			if(dx*dx+dy*dy < 400) return;
			
			var dir;
			if(Math.abs(dx) > Math.abs(dy)){
				dir = dx>0 ? 'swipeRight' : 'swipeLeft';
			}else{
				dir = dy>0 ? 'swipeDown' : 'swipeUp';
			}
			Evt.call('SWIPE', {dir : dir});
		};

	//方向键模拟手势
	document.addEventListener(   'keydown', function(e){
		var dir;
		switch(e.keyCode){
			case 37: dir='swipeRight'; break;
			case 38: dir='swipeDown';  break;
			case 39: dir='swipeLeft';  break;
			case 40: dir='swipeUp';    break;
		}
		if(dir) Evt.call('SWIPE', {dir : dir});
	});

	//滚轮模拟手势
	var lastWheelDelta = 0;
	var onWheel = function(e){
		if(Math.abs(lastWheelDelta)<=120 && Math.abs(e.wheelDelta)>=120){
			lastWheelDelta = e.wheelDelta;
		}else{
			lastWheelDelta = e.wheelDelta;
			return;
		}
		///
		document.removeEventListener('mousewheel', onWheel);

		setTimeout(function(){
			document.addEventListener('mousewheel', onWheel);
		}, 500);

		var dir;
		switch(true){
			case e.wheelDeltaX >=  120: dir='swipeRight'; break;
			case e.wheelDeltaX <= -120: dir='swipeLeft';  break;
			case e.wheelDeltaY >=  120: dir='swipeDown';  break;
			case e.wheelDeltaY <= -120: dir='swipeUp';    break;
			case e.wheelDelta  >=  120: dir='swipeDown';  break;
			case e.wheelDelta  <= -120: dir='swipeUp';    break;
			default: console.log('no wheelDelta');
		}
		if(dir) Evt.call('SWIPE', {dir : dir});
	}
	document.addEventListener('mousewheel', onWheel);

	//触摸&点击手势
	if('ontouchstart' in document){
		document.addEventListener('touchstart', start);
		document.addEventListener( 'touchmove', move);
		document.addEventListener(  'touchend', end);
	}else{
		document.addEventListener( 'mousedown', start);
		document.addEventListener(   'mouseup', end);
	}
	this.swipe = null;
}

//翻页模块
SAPP.page = function(){
	var pageDom = $('.page');
	var pageFront = $('.front');

	return {
		now : null,
		out : null,
		dom : pageDom,
		front: pageFront,
		len : pageDom.length,
		go : function(page){
			var index=-1;
			/*
			*跳转识别
			*1.++(递增)
			*2.--(递减)
			*3.数字(页数,1开始)
			*4.page的id
			*/
			switch(true){
				case '++'==page: index = this.now+1; break;
				case '--'==page: index = this.now-1; break;
				case /^\d+$/.test(page): index = parseInt(page); break;
				case /^#.+$/.test(page): index = 1+this.dom.index($(page)); break;
			}

			if(index==this.now || index<1 || this.len<index) return;

			if(this.now) {
				this.dom.eq(this.now-1).addClass('out');
				this.front.eq(this.now-1).addClass('out');
			}

			$('#J_view').attr('data-step',index);
			this.dom.slice(0,index).addClass('in');
			this.front.slice(0,index).addClass('in');

			this.out = this.now;
			this.now = index;

			Evt.call('PAGE_GO', {
				out : this.out,
				now : this.now,
				len : this.length
			});
		},
		prev : function(){
			this.go('--');
		},
		next : function(){
			this.go('++');
		}
	}
}

//适配模块
SAPP.fill = function(){
	//适配预设关键字
	var MODE = {
		contain : '100% 100%',
		  cover : '0% 0%',
		  width : '100% 0%',
		 height : '0% 100%'
	};

	var p = {
		mode : (MODE[this.config.fillMode] || this.config.fillMode || '100% 100%').split(' '),
		width : this.config.fillWidth || 640,
		height : this.config.fillHeight || 960,
		setRem : !!this.config.fillSetRem
	};
	
	var tar = $('.main'),
		win = $(window),
		winOldW = 0,
		ratioKeepW = parseInt(p.mode[0])/100,
		ratioKeepH = parseInt(p.mode[1] || p.mode[0])/100;

	var render = function(){
		var winWidth = win.width(),
			winHeight = win.height();

		//若只有高度改变(手机键盘引起)不重新计算
		if(winOldW==winWidth) return;

		winOldW = winWidth;

		//根据不裁减率ratioKeep计算
		var ratioW = winWidth/p.width,
			ratioH = winHeight/p.height,
			ratio = Math.min(ratioW/ratioKeepW, ratioH/ratioKeepH, Math.max(ratioW,ratioH));

		var mainWidth = Math.floor(ratio*p.width),
			mainHeight = Math.floor(ratio*p.height);

		//渲染结果
		tar.css({
			 width : mainWidth, 
			height : mainHeight,
			  left : (winWidth-mainWidth)>>1,
			   top : (winHeight-mainHeight)>>1
		});
		if(p.setRem) $('html').css('font-size', ratio*100+'px');
		Evt.call('FILL_RESIZE', {ratio:ratio});
	};

	render();
	win.resize(render);
	this.fill = null;
}

//声音模块
SAPP.audio = function(){
	var pool = {},
		bgmusic,
		bgmusicDom = $(this.config.bgmusicDom),
		bgmusicPaused = true,
		userPauseBgmusic = false;

	var hidden, visibilityChange; 
	if (typeof document.hidden !== "undefined") {
	  hidden = "hidden";
	  visibilityChange = "visibilitychange";
	} else if (typeof document.msHidden !== "undefined") {
	  hidden = "msHidden";
	  visibilityChange = "msvisibilitychange";
	} else if (typeof document.webkitHidden !== "undefined") {
	  hidden = "webkitHidden";
	  visibilityChange = "webkitvisibilitychange";
	}


	function handleVisibilityChange() {
		if (document[hidden]) {
			bgmusic.pause();
		} else {
			!userPauseBgmusic && bgmusic.play();
		}
	}


	if(this.config.bgmusic){
		document.addEventListener(visibilityChange, handleVisibilityChange, false);
		bgmusic = $.extend(new Audio, {
			autoplay : !!this.config.bgmusicAutoplay,
			 preload : true,
			    loop : true
		});

		bgmusic.addEventListener('play', function(){
			bgmusicDom.addClass("on");
			Evt.call('BGMUSIC_PLAY', {bgmusic:bgmusic});
		});
		bgmusic.addEventListener('pause', function(){
			bgmusicDom.removeClass("on");
			Evt.call('BGMUSIC_PAUSE', {bgmusic:bgmusic});
		});
		bgmusic.src = window.templateHelper.url(this.config.bgmusic);

		if(!!this.config.bgmusicAutoplay){
			var isOnce = false;
			document.addEventListener('WeixinJSBridgeReady', bgmusic.play);
			bgmusicPaused=false;
			bgmusic.play();
		}

		bgmusicDom.click(function(){
			SAPP.audio.toggle();
		});
	}


	return {
		bgmusic : bgmusic,
		add : function(src, para){
			var name = src.split('/').pop().split('.').shift();
			if(!name) return;

			pool[name] = $.extend(new Audio(src), {
				preload : true
			}, para);

			pool[name].addEventListener('ended', function(e){
				if(!bgmusicPaused) bgmusic.play();
			});
			return pool[name];
		},
		get : function(name){
			return name=='bgmusic' ? bgmusic : pool[name];
		},
		play : function(name, pos){
			if(!name || name=='bgmusic'){
				bgmusicPaused = false;
				bgmusic.currentTime = pos || bgmusic.currentTime;
				bgmusic.play();
			}else if(pool[name]) {
				pool[name].currentTime = pos || 0;
				pool[name].play();
			}
		},
		pause : function(name){
			if(!name || name=='bgmusic'){
				bgmusicPaused = true;
				bgmusic.pause();
			}else if(pool[name]) {
				pool[name].pause();
				if(!bgmusicPaused) bgmusic.play();
			}
		},
		toggle : function(name){
			if(!name || name=='bgmusic'){
				if(bgmusicPaused){
					userPauseBgmusic = false;
					bgmusic.play();
				}
				else {
					userPauseBgmusic = true;
					bgmusic.pause();
				}
				bgmusicPaused = !bgmusicPaused;
			}else if(pool[name]) {
				if(pool[name].paused) this.play(name);
				else this.pause(name);
			}
		}
	}
}

