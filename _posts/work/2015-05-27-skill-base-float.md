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


效果其实很简单，就是有a、b、c三个块，a、c固定宽度的侧边栏，然后内容块b自适应宽度。利用的就是浮动后的兄弟元素是在“同一行”*（或者说是同脱离正常文档流）*的，可以通过**负边距**来进行位置上的调整，由于模块b已经设置**width:100%;**，所以模块因为宽度不足而换行*（like text）*，而当有足够左负边距值，模块就可以向前进行位置调整，例如模块a在第二行的开头，那么只需要加上**margin-left:-100%;**那么它的位置就已经到了第一行的最开始，如此类推。

{% highlight css %}
/* 核心代码 */
.a {float: left; width: 100px; margin-left: -100%;/* 到第一行开头 */}
.b {float: left; width: 100%;}
.c {float: left; width: 150px; margin-left: -150px;}
/* 由于a到了开头，所以c占据a原来的位置，
   再向左负自身宽度的距离就到了第一行尾部了 */
{% endhighlight %}

##浮动居中

居中一直是困扰无数前端同行的问题，尤其是未知宽度的居中，涉及到浮动的话居中更是一个难点，这里可以利用**position:relative;**的特点做到，效果如下。


*看不到动画的forget it，因为我只写了webkit，懒。*

原理就是利用**绝对定位**的元素**left**的取值是百分比是参照物是**父元素的宽度**，而浮动元素会包裹自身内容，即宽度为自身内容宽度。想象一下，有容器container和内容块content嵌套，分别设置浮动和绝对定位，container设置**left:50%;**，由于前面说的特点，container会包裹自身内容且位置移动到父元素的宽度一半处*（例子红色块）*，而同时content设置**left:-50%; / right:50%;**，由于container是content的父元素，所以移动的位置**等同自身的一半**，这两者所产生的效果就是我们所需要的居中了。

另外这个方法也是有缺点的，细心的同学会发现如果我的内容层宽度超过container父元素的一半不是会溢出吗*（红色块）*？是的毕竟视觉上的居中只是content层，container还在50%的位置，所以需要给container父元素加上**overflow:hidden;**，用到此方法的时候需要考虑会否因为这个而影响到其他需要做的事。

{% highlight css %}
/* 核心代码 */
.container {float: left; position: relative; left: 50%;/* 向右移动到50%的位置 */}
.content {float: left; position: relative; left: -50%;/* 向左移动到50%的位置 */}
{% endhighlight %}

##小结

有很多人说“浮动是魔鬼”，是因为它与生俱来的特性，还有一些顽皮的IE引起的问题*（双边距？XD）*，所以对其嗤之以鼻，当你了解它的特点以后，它可以绽放出它的光彩，例如我写的这个[自适应例子](http://codepen.io/mss/pen/PqWXWW)。在浏览器的不断迭代中以及移动端的崛起，浮动也是时候回归它的本职*（图文排版？）*，让更适合的语法来做布局，例如**Flexbox**、**Grid Layout**等等。

第一课就到此结束了，希望文章中的一些小技巧可以让你在前进的过程中少点烦恼，刺激到你的想法吧。
