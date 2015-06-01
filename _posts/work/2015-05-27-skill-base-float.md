---
layout: post
category: work
keyword: 技巧库
title: 前端技巧库 — float
---

说到**float** *（浮动）*，我想很多前端对它是又爱又恨了。爱他的“暴力”、让元素横排布局和各种黑科技，恨它的“暴力”、破坏布局、让元素坍塌。

w3c是这么描述它的:

><b>Values</b> left \| right \| none \| inherit 
>
><b>Initial value</b>   none
>
><b>Applies to</b>  All element
>
><b>Inherited</b>   No
>
><b>Point, Note</b>
>
>It may be set for any element, but only applies to elements that generate boxes that are not absolutely positioned.

嗯，大概就是那个样，虽然我也看不懂，这里也**不是**什么教基础的地方。

我们只需要知道浮动会破坏布局，然后和**position:absolute/fixed;**共存或者是**flex items**的时候失效就差不多了*（当然还有**display:none;**XD）*。

扯了好久，要入正文了*（我已经假设你知道某些我觉得要知道的特性了）*。

##圣杯布局/双飞翼布局

这个其实更适合放在**margin**里面讲，毕竟里面的功臣是负边距，但是没有浮动也一样不生效，也罢，先看效果。

<p data-height="186" data-theme-id="15542" data-slug-hash="WvRGgg" data-default-tab="result" data-user="mss" class='codepen'>See the Pen <a href='http://codepen.io/mss/pen/WvRGgg/'>WvRGgg</a> by mss (<a href='http://codepen.io/mss'>@mss</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
