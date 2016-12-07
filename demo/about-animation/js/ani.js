(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('./hidpi-canvas.min.js');

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame,
    cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame;

var canvasBox = void 0,
    canvas = void 0,
    ctx = void 0;

function moveModeFn(percentComplete, strength) {
    return 1 - Math.pow(1 - percentComplete, strength * 2 || 2);
}

function lineMove(x1, y1, x2, y2, duration, lineWidth) {
    var duration = duration || 500;
    var startTime = +new Date();
    var endTime = 0;
    var offsetX = x2 - x1;
    var offsetY = y2 - y1;
    var t = null;

    function run() {
        var offsetTime = endTime - startTime,
            percentComplete = offsetTime / duration,
            percentRun = moveModeFn(percentComplete);
        if (endTime > 0) {
            ctx.lineWidth = lineWidth || 90;
            drawLine(x1, y1, offsetX * percentRun + x1, offsetY * percentRun + y1);
        }
        t = requestAnimationFrame(run);
        if (offsetTime > duration) {
            cancelAnimationFrame(t);
        }
        endTime = +new Date();
    }

    run();
}

function drawLine(x1, y1, x2, y2) {
    ctx.save();
    ctx.beginPath();
    if (arguments.length == 2) {
        ctx.arc(x1, y1, a, 0, 2 * Math.PI);
        ctx.fill();
    } else {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    ctx.restore();
}

function createMask() {
    canvasBox = document.getElementById("J_canvas_box");
    canvas = document.createElement('canvas');

    canvas.width = canvasBox.offsetWidth;
    canvas.height = canvasBox.offsetHeight;

    canvasBox.appendChild(canvas);

    ctx = canvas.getContext("2d");

    var repeatImg = new Image();
    repeatImg.src = "img/ani-repeat.jpg";
    repeatImg.onload = function () {
        var bg = ctx.createPattern(repeatImg, "repeat");
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = bg;
        ctx.fill();

        var img = new Image();
        img.src = "img/ani-mask.jpg";
        img.onload = function () {
            var h = canvas.width * img.height / img.width;
            ctx.drawImage(img, 0, 0, canvas.width, h);

            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineWidth = 90;
            ctx.globalCompositeOperation = "destination-out";
        };
    };
}

function init() {
    createMask();
    $(".u-ani-ticket").on('animationend webkitAnimationEnd', function (event) {
        $("body").addClass('z-mask-ani-end');

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalCompositeOperation = "destination-out";

        var ww = canvas.width;
        var hh = canvas.height;

        lineMove(ww, -60, 0, 80, 300, 80);
        setTimeout(function () {
            lineMove(0, 250, ww, 20, 400, 150);
        }, 250);
        setTimeout(function () {
            lineMove(ww, 170, 20, 380, 400);
        }, 400);
        setTimeout(function () {
            lineMove(0, 480, ww, 350, 400, 100);
        }, 750);
        setTimeout(function () {
            lineMove(ww, 450, 20, 600, 400, 120);
        }, 900);
    });
}

window.onload=function () {
    init();
}

module.exports = init;

},{"./hidpi-canvas.min.js":2}],2:[function(require,module,exports){
"use strict";

/**
 * HiDPI Canvas Polyfill (1.0.10)
 *
 * Author: Jonathan D. Johnson (http://jondavidjohn.com)
 * Homepage: https://github.com/jondavidjohn/hidpi-canvas-polyfill
 * Issue Tracker: https://github.com/jondavidjohn/hidpi-canvas-polyfill/issues
 * License: Apache-2.0
*/
!function (a) {
  var b = function () {
    var a = document.createElement("canvas"),
        b = a.getContext("2d"),
        c = b.backingStorePixelRatio || b.webkitBackingStorePixelRatio || b.mozBackingStorePixelRatio || b.msBackingStorePixelRatio || b.oBackingStorePixelRatio || b.backingStorePixelRatio || 1;return (window.devicePixelRatio || 1) / c;
  }(),
      c = function c(a, b) {
    for (var c in a) {
      a.hasOwnProperty(c) && b(a[c], c);
    }
  },
      d = { fillRect: "all", clearRect: "all", strokeRect: "all", moveTo: "all", lineTo: "all", arc: [0, 1, 2], arcTo: "all", bezierCurveTo: "all", isPointinPath: "all", isPointinStroke: "all", quadraticCurveTo: "all", rect: "all", translate: "all", createRadialGradient: "all", createLinearGradient: "all" };1 !== b && (c(d, function (c, d) {
    a[d] = function (a) {
      return function () {
        var d,
            e,
            f = Array.prototype.slice.call(arguments);if ("all" === c) f = f.map(function (a) {
          return a * b;
        });else if (Array.isArray(c)) for (d = 0, e = c.length; e > d; d++) {
          f[c[d]] *= b;
        }return a.apply(this, f);
      };
    }(a[d]);
  }), a.stroke = function (a) {
    return function () {
      this.lineWidth *= b, a.apply(this, arguments), this.lineWidth /= b;
    };
  }(a.stroke), a.fillText = function (a) {
    return function () {
      var c = Array.prototype.slice.call(arguments);c[1] *= b, c[2] *= b, this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function (a, c, d) {
        return c * b + d;
      }), a.apply(this, c), this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function (a, c, d) {
        return c / b + d;
      });
    };
  }(a.fillText), a.strokeText = function (a) {
    return function () {
      var c = Array.prototype.slice.call(arguments);c[1] *= b, c[2] *= b, this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function (a, c, d) {
        return c * b + d;
      }), a.apply(this, c), this.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function (a, c, d) {
        return c / b + d;
      });
    };
  }(a.strokeText));
}(CanvasRenderingContext2D.prototype), function (a) {
  a.getContext = function (a) {
    return function (b) {
      var c,
          d,
          e = a.call(this, b);return "2d" === b && (c = e.backingStorePixelRatio || e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1, d = (window.devicePixelRatio || 1) / c, d > 1 && (this.style.height = this.height + "px", this.style.width = this.width + "px", this.width *= d, this.height *= d)), e;
    };
  }(a.getContext);
}(HTMLCanvasElement.prototype);

},{}]},{},[1]);
