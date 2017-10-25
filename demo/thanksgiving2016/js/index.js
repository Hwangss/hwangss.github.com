"use strict";
let preload = function preloadImages(files) {
    var onprogress = function () { };
    var onload = function () { };
    var onerror = function () { };
    var loadeds = [];

    // I/F
    var instance = {
        files: files,
        loadeds: loadeds,

        onprogress: function (callback) {
            onprogress = callback;
            return this;
        },

        onload: function (callback) {
            onload = callback;
            return this;
        },

        onerror: function (callback) {
            onerror = callback;
            return this;
        }
    }

    function onerrorIF(event) {
        onerror({
            event: event,
            files: files,
            loadeds: loadeds
        });
    };

    function load(path) {
        var image = new Image();
        image.onload = function (event) {
            loadeds.push(path);

            onprogress({
                files: files,
                image: image,
                loadeds: loadeds,
                path: path
            });

            if (loadeds.length >= files.length) {
                onload({
                    files: files,
                    loadeds: loadeds
                });
            }
        };
        image.onerror = onerrorIF;

        image.src = window.templateHelper.imgSrc(path);
    }

    for (var i = 0, l = files.length; i < l; i++) {
        load(files[i]);
    }

    return instance;
};
let sourceList = {
    x1: {
        page1: [
            './image/tips-slider.png',
            './image/tips-hand.png',
            './image/scene-open-door.jpg',
            './image/scene-door.png',
            './image/scene-1-b-1.jpg',
            './image/scene-1-b-2.png',
            './image/scene-1-m-1.png',
            './image/scene-1-m-2.png',
            './image/scene-1-m-2-shadow.png',
            './image/txt-1.png'
        ],

        page2: [
            './image/scene-2-b-1.jpg',
            './image/scene-2-b-2.png',
            './image/scene-2-b-3.png',
            './image/scene-2-f-1.png',
            './image/scene-2-m-1.png',
            './image/scene-transition.jpg',
            './image/txt-2.png'
        ],

        page3: [
            './image/scene-3-b-1.jpg',
            './image/scene-3-f-1.png',
            './image/scene-3-f-2.png',
            './image/scene-3-m-1.png',
            './image/scene-3-m-2.png',
            './image/txt-3.png'
        ],

        page4: [
            './image/scene-4-b-1.jpg',
            './image/scene-4-f-1.png',
            './image/scene-4-m-1.png',
            './image/scene-4-m-2.png',
            './image/txt-4.png'
        ],

        page5: [
            './image/scene-5-b-1.jpg',
            './image/scene-5-b-2.png',
            './image/scene-5-b-3.png',
            './image/scene-5-f-1.png',
            './image/scene-5-m-1.png',
            './image/scene-5-m-2.png',
            './image/txt-5.png'
        ],

        page6: [
            './image/scene-6-b-1.jpg',
            './image/scene-6-b-2.png',
            './image/scene-6-m-1.png',
            './image/scene-6-m-2.png',
            './image/txt-6.png'
        ],

        page7: [
            './image/scene-7-b-1.jpg',
            './image/scene-7-f-1.png',
            './image/scene-7-f-2.jpg',
            './image/scene-7-m-1.png',
            './image/scene-7-m-2.png',
            './image/scene-7-m-3.png',
            './image/txt-7.png'
        ],

        page8: [
            './image/scene-8-m-1.png',
            './image/scene-8-m-2.png',
            './image/scene-8-m-3.png',
            './image/scene-8-m-4.png',
            './image/scene-8-m-5.png',
            './image/scene-8-m-6.png',
            './image/scene-8-m-7.png',
            './image/scene-8-m-8.png',
            './image/feather.png',
            './image/share-mask.png'
        ]
    },
    x2: {
        page1: [
            './image/tips-slider@2x.png',
            './image/tips-hand@2x.png',
            './image/scene-open-door@2x.jpg',
            './image/scene-door@2x.png',
            './image/scene-1-b-1@2x.jpg',
            './image/scene-1-b-2@2x.png',
            './image/scene-1-m-1@2x.png',
            './image/scene-1-m-2@2x.png',
            './image/scene-1-m-2-shadow@2x.png',
            './image/txt-1@2x.png'
        ],

        page2: [
            './image/scene-2-b-1@2x.jpg',
            './image/scene-2-b-2@2x.png',
            './image/scene-2-b-3@2x.png',
            './image/scene-2-f-1@2x.png',
            './image/scene-2-m-1@2x.png',
            './image/scene-transition@2x.jpg',
            './image/txt-2@2x.png'
        ],

        page3: [
            './image/scene-3-b-1@2x.jpg',
            './image/scene-3-f-1@2x.png',
            './image/scene-3-f-2@2x.png',
            './image/scene-3-m-1@2x.png',
            './image/scene-3-m-2@2x.png',
            './image/txt-3@2x.png'
        ],

        page4: [
            './image/scene-4-b-1@2x.jpg',
            './image/scene-4-f-1@2x.png',
            './image/scene-4-m-1@2x.png',
            './image/scene-4-m-2@2x.png',
            './image/txt-4@2x.png'
        ],

        page5: [
            './image/scene-5-b-1@2x.jpg',
            './image/scene-5-b-2@2x.png',
            './image/scene-5-b-3@2x.png',
            './image/scene-5-f-1@2x.png',
            './image/scene-5-m-1@2x.png',
            './image/scene-5-m-2@2x.png',
            './image/txt-5@2x.png'
        ],

        page6: [
            './image/scene-6-b-1@2x.jpg',
            './image/scene-6-b-2@2x.png',
            './image/scene-6-m-1@2x.png',
            './image/scene-6-m-2@2x.png',
            './image/txt-6@2x.png'
        ],

        page7: [
            './image/scene-7-b-1@2x.jpg',
            './image/scene-7-f-1@2x.png',
            './image/scene-7-f-2@2x.jpg',
            './image/scene-7-m-1@2x.png',
            './image/scene-7-m-2@2x.png',
            './image/scene-7-m-3@2x.png',
            './image/txt-7@2x.png'
        ],

        page8: [
            './image/scene-8-m-1@2x.png',
            './image/scene-8-m-2@2x.png',
            './image/scene-8-m-3@2x.png',
            './image/scene-8-m-4@2x.png',
            './image/scene-8-m-5@2x.png',
            './image/scene-8-m-6@2x.png',
            './image/scene-8-m-7@2x.png',
            './image/scene-8-m-8@2x.png',
            './image/feather@2x.png',
            './image/share-mask.png'
        ]
    },
    x3: {
        page1: [
            './image/tips-slider@3x.png',
            './image/tips-hand@3x.png',
            './image/scene-open-door@3x.jpg',
            './image/scene-door@3x.png',
            './image/scene-1-b-1@3x.jpg',
            './image/scene-1-b-2@3x.png',
            './image/scene-1-m-1@3x.png',
            './image/scene-1-m-2@3x.png',
            './image/scene-1-m-2-shadow@3x.png',
            './image/txt-1@3x.png'
        ],

        page2: [
            './image/scene-2-b-1@3x.jpg',
            './image/scene-2-b-2@3x.png',
            './image/scene-2-b-3@3x.png',
            './image/scene-2-f-1@3x.png',
            './image/scene-2-m-1@3x.png',
            './image/scene-transition@3x.jpg',
            './image/txt-2@3x.png'
        ],

        page3: [
            './image/scene-3-b-1@3x.jpg',
            './image/scene-3-f-1@3x.png',
            './image/scene-3-f-2@3x.png',
            './image/scene-3-m-1@3x.png',
            './image/scene-3-m-2@3x.png',
            './image/txt-3@3x.png'
        ],

        page4: [
            './image/scene-4-b-1@3x.jpg',
            './image/scene-4-f-1@3x.png',
            './image/scene-4-m-1@3x.png',
            './image/scene-4-m-2@3x.png',
            './image/txt-4@3x.png'
        ],

        page5: [
            './image/scene-5-b-1@3x.jpg',
            './image/scene-5-b-2@3x.png',
            './image/scene-5-b-3@3x.png',
            './image/scene-5-f-1@3x.png',
            './image/scene-5-m-1@3x.png',
            './image/scene-5-m-2@3x.png',
            './image/txt-5@3x.png'
        ],

        page6: [
            './image/scene-6-b-1@3x.jpg',
            './image/scene-6-b-2@3x.png',
            './image/scene-6-m-1@3x.png',
            './image/scene-6-m-2@3x.png',
            './image/txt-6@3x.png'
        ],

        page7: [
            './image/scene-7-b-1@3x.jpg',
            './image/scene-7-f-1@3x.png',
            './image/scene-7-f-2@3x.jpg',
            './image/scene-7-m-1@3x.png',
            './image/scene-7-m-2@3x.png',
            './image/scene-7-m-3@3x.png',
            './image/txt-7@3x.png'
        ],

        page8: [
            './image/scene-8-m-1@3x.png',
            './image/scene-8-m-2@3x.png',
            './image/scene-8-m-3@3x.png',
            './image/scene-8-m-4@3x.png',
            './image/scene-8-m-5@3x.png',
            './image/scene-8-m-6@3x.png',
            './image/scene-8-m-7@3x.png',
            './image/scene-8-m-8@3x.png',
            './image/feather@3x.png',
            './image/share-mask.png'
        ]
    }
}
    ;
let animateLock = true;
let currentPage = 1;
let allLock = false;

window.templateHelper = {
    imgSrc: function (url) {
        if (url && url.length) {
            url = url.replace(/^http:|https:/i, '');
        }
        return url;
    }, url: function (url) {
        if (url && url.length) {
            url = url.replace(/^http:\/\//, '//');
        }
        return url;
    }
}

let nsGame = {
    data() {
        let dpr = window.devicePixelRatio;
        const isAndriod = /android/i.test(navigator.userAgent);
        let isTransformUrl = (dpr > 1) && !isAndriod;

        if (isAndriod) {
            $('body').addClass('device-andriod');
            dpr = 1;
        }

        sourceList = sourceList[`x${dpr}`];
    },
    bind() {
        $(document).on('transitionend webkitTransitionEnd', '[data-flag]', function (event) {
            let $this = $(event.target);
            if ($this.parents('.page').hasClass('out')) return false;
            $("#J_slider_tips").addClass('in');
            currentPage = $this.data('flag');
            animateLock = false;
        });

        $("#J_share_mask").on('click', function (event) {
            $(this).removeClass('in');
            allLock = false;
        });

        $("#J_btn_share").on('click', function () {
            nsGame.share();
        });

        $("#J_btn_reset").on('click', function () {
            nsGame.reset();
        });

    },
    init() {
        preload(sourceList.page1.concat(sourceList.page2))
            .onprogress(function (data) {
                var loaded = data.loadeds.length;
                var all = data.files.length;
                var progress = parseInt(100 * loaded / all, 10);
                $('#J_percent').html(progress + '%');
            })
            .onload(function (data) {
                $('[data-source="page1"],[data-source="page2"]').removeClass('z-unload');

                setTimeout(function () {
                    $("#J_loading").addClass('z-loaded');
                    SAPP.page.go(1);
                    preload(sourceList.page3.concat(sourceList.page4))
                        .onload(() => {
                            $('[data-source="page3"],[data-source="page4"]').removeClass('z-unload');
                        });

                    preload(sourceList.page5.concat(sourceList.page6))
                        .onload(() => {
                            $('[data-source="page5"],[data-source="page6"]').removeClass('z-unload');
                        });

                    preload(sourceList.page7.concat(sourceList.page8))
                        .onload(() => {
                            $('[data-source="page7"],[data-source="page8"]').removeClass('z-unload');
                        });
                }, 16)
            })
    },
    reset() {
        $('body').addClass('no-transition');
        $("#J_loading").addClass('z-reset').removeClass('z-loaded');
        currentPage = 1;
        SAPP.page.go(1);
        SAPP.page.dom.add(SAPP.page.front).removeClass('in out');
        animateLock = true;
        setTimeout(function () {
            $('body').removeClass('no-transition');
            SAPP.page.dom.eq(0).addClass('in');
            $("#J_loading").addClass('z-loaded');
        }, 16)
    }
}

$(() => {
    nsGame.data();
    nsGame.init();
    nsGame.bind();
    SAPP.init({
        touchmoveLock: true,
        bgmusic: './image/bg-music.mp3',
        bgmusicDom: '#J_music',
        bgmusicAutoplay: true,
        pageRouter: function (e) {
            if (window.__isCross) return false;
            if (e.dir != 'swipeLeft') return false;
            if (allLock) return false;
            if (currentPage < e.page) return false;
            if (animateLock) return false;
            animateLock = true;
            $("#J_slider_tips").removeClass('in');

            switch (e.page) {
                default: SAPP.page.go({
                    swipeLeft: '++'
                }[e.dir]);
            }
        }
    });
});
