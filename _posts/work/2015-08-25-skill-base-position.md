---
layout: post
category: work
keyword: 技巧库
title: 前端技巧库 — position
---

*偷懒了好久，终于来更新第二篇了，真是惭愧！- _> -*

说到position，真是喜忧参半，一来是为了它强大的特性而造就了许多的效果，二来也是因为它这个强大的特性而苦了一堆同行。还记得[@winter](http://weibo.com/wintercn)大大曾经诉苦说面试css的时候问**position**的特性可以问倒一半人，而且鲜有人可以回答个中利弊及相互影响关系。那么我今天也顺便在这里回答一下这样的问题吧。

首先很简单的事情，position的取值为：**static**、**absolute**、**relative**、**fixed**，还有CSS3新增的一些草案取值*(如有不对烦请指点)* **center**、**page**、**sticky**。当然，这是浏览器嘛，就肯定存在着兼容性问题的了，请记得**fixed是仅仅IE6以下才不支持，放过IE7吧！**，移动端的**fixed**则需要加上**&lt;meta name="viewport" content="width=device-width, user-scalable=no"&gt;**的meta才可以支持。至于几个新属性嘛，也就**sticky**在最新版本的Firefox和Safari支持，其他还在梦里呢 xd。

至于一些详细的值作用说明这里就不阐述了，无非要记住absolute定位的参照点是**最近的非static的祖先元素**，fixed的定位一般来说相对于**window**，之所以说一般来说是因为存在一个[已知的bug](https://www.w3.org/Bugs/Public/show_bug.cgi?id=16328)，使用position:fixed的时候，如果该元素的祖先元素有transform属性生效，则fixed退化成absolute，且相对定位的根元素会变成最近的拥有transform属性的祖先元素，详细表现[看这里](http://codepen.io/mss/pen/mJYpvE)，**除IE外其他浏览器皆沦陷**。

*下面又到了炫技的时候了 - 0 -*

##未知宽高垂直水平居中

在很多需求里面，我们都会遇到需要把一个元素垂直水平居中在页面/模块中，这时候常常用到的方法就是这样：

{% highlight css %}
.target {
    position: absolute;
    left: 50%;
    top: 50%;
    /* 或者交由JS动态写入以下属性 */
    width: 300px;
    height: 200px;
    margin-left: -150px;
    margin-top: -100px;
}
{% endhighlight %}

如果在HTML层面增加一个包裹，则可以做到未知宽高的垂直水平居中了。

{% highlight html %}
<style>
    .wrap {
        position: absolute;
        left: 50%;
        top: 50%;
    }

    .content {
        position: relative;
        left: -50%;
        top: -50%;
    }
</style>

<div class="wrap">
    <div class="content"></div>
</div>
{% endhighlight %}

至于为什么，就追溯到absolute的特性了，拥有position:absolute;的元素正常的情况下是会创建一个刚好包裹自身的BFC*（类似display:inline-block）*，而有取值非static的position的元素**其偏移量的百分比取值是以最近的定位祖先元素作为参照物**的*（好拗口，就是.content的top,right,bottom,left等属性取值为百分比是是以.wrap的宽高作为参照物的）*。所以当.content取left:-50%;top:-50%;的时候**则等于其自身的一半宽高**，从而达到居中的效果。

##紧跟其后的定位

就像名字说的那样，这种效果就是定位元素是跟随前面内容变化而位置发生变化的。我们经常遇到一些需求是说要求这样的。

![紧跟其后的定位]({{site.assets}}/article/201508/20150825-1.png)

当然我们可以直接做一个图片，然后直接按照正常的文档流，图片就跟随着文字了。一般情况是可以这样做的，但是当正常文档流的位置不足以放置这么个图标的时候，就需要用到这个技巧了。还是首先看一下代码：

{% highlight html %}
<style>
    .icon {
        position: absolute;
        margin-left: 5px;
        margin-bottom: 3px;
        background: url('test.png') left top no-repeat;
    }
</style>

<p>我是一个内容 <i class="icon"></i></p>
{% endhighlight %}

原理很简单，因为当行内元素标签拥有absolute属性后，除了正常的脱离文档流外，还会保留自身作为行内元素的特性，所以图标就可以自适应跟随文字了*（IE6 7下，块级元素标签也有此效果，其他版本浏览器均会向左移到父元素最左侧）*。注意不要设置偏移量*（top,right,bottom,left）*，毕竟用了后就根据参照物定位了，要调整位置就使用margin。顺便再说一个，有absolute的元素**不会发生外边距折叠的情况**。

<div class="u-cut-off-rule"><span class="txt">分割线</span></div>

其实说到position的技巧，可以说很多，而这个属性本身也可以配合到其他属性做一些神奇效果，比如：

* 左栏固定，右边内容自适应。
* absolute / fixed 和 visibility 配合做到很好的显示隐藏效果同时又不产生重排。
* absolute / fixed 配合复杂动画可以减少性能消耗。
* 甚至还可以做IE6的黑科技，子元素拥有定位属性时，父元素倘若没有定位属性，则父元素的 overflow:hidden 对其失效

本文到此就基本可以完结了，说得不多，只是抛出砖头，看能不能砸到谁的头，明白我想说的。基础扎实的朋友可能会发现，上述所说的其实就是一些W3C上描述的**最基本的特性**，只是在上面加以利用就可以产生出神奇的效果。圈子太浮躁，太多人小看css，这系列文章除了想告诉大家一点什么以外，更多的是想宣扬关注基础的思想。

最后再提一个小东西大家思考一下，既然例子2里有这样的特性了，那么我们平时页面上的**回到顶部**的功能能不能用同样的思想来做呢？（提示：text-align，&amp;nbsp;）

多说无益，回家去。