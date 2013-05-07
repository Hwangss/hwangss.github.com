<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="author" content="{{ site.meta.author.name }}" />
<meta name="keywords" content="{{ site.tags | join: ',' }}" />
<meta name="description" content="{{ site.desc }}" />
<title>{{ site.name }}{% if page.title %} / {{ page.title }}{% endif %}</title>
<link href="http://{{ site.host }}/feed.xml" rel="alternate" title="{{ site.name }}" type="application/atom+xml" />
<link rel="stylesheet" type="text/css" href="/assets/css/site.css" />
<link rel="stylesheet" type="text/css" href="/assets/css/code/github.css" />
{% for style in page.styles %}<link rel="stylesheet" type="text/css" href="{{ style }}" />
{% endfor %}
</head>

<body class="{{ page.pageClass }}">
<div class="main">
	{{ content }}

	<footer>
		<p>&copy; Since 2012</p>
	</footer>
</div>

<aside>
	<h2><a href="/">{{ site.name }}</a><a href="/feed.xml" class="feed-link" title="Subscribe"><img src="http://blog.rexsong.com/wp-content/themes/rexsong/icon_feed.gif" alt="RSS feed" /></a></h2>
	
	<nav class="block">
		<ul>
		{% for category in site.custom.categories %}<li class="{{ category.name }}"><a href="/category/{{ category.name }}/">{{ category.title }}</a></li>
		{% endfor %}
		</ul>
	</nav>
	
	<form action="/search/" class="block block-search">
		<h3>Search</h3>
		<p><input type="search" name="q" placeholder="Search" /></p>
	</form>
	
	<div class="block block-about">
		<h3>About</h3>
		<figure>
			{% if site.meta.author.gravatar %}<img src="{{ site.meta.gravatar}}{{ site.meta.author.gravatar }}?s=48" />{% endif %}
			<figcaption><strong>{{ site.meta.author.name }}</strong></figcaption>
		</figure>
		<p><a href="http://johnqing.github.io/posts/about-me.html">about me</a></p>
	</div>
	
	<div class="block block-book">
		<h3>Note</h3>
		<ul>
			{% for dbbook in site.book %}
			<li>
				<a href="http://book.douban.com/subject/{{ dbbook.bid }}" target="_blank">
				<img src="http://img3.douban.com/mpic/s{{ dbbook.imgid }}.jpg" alt="{{ dbbook.name }}">
				</a>
			</li>
			{% endfor %}
		</ul>
	</div>
	
	{% if site.meta.author.github %}
	<div class="block block-fork">
		<a href="https://github.com/{{ site.meta.author.github }}"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" alt="Fork me on GitHub"></a>
	</div>
	{% endif %}
</aside>
<!–[if IE 6.0]>
<script>
var isIE6= !!window.ActiveXObject&&!window.XMLHttpRequest;
if(isIE6){
    document.body.innerHTML = '<div style="font-size:20px;color:#f00;">哥,别在用IE6了！这么渣的浏览器也好意思拿出来见人啊！</div>';
}
</script>
<![endif]–>
<script src="http://elfjs.googlecode.com/files/elf-0.4.1-min.js"></script>
<script src="http://yandex.st/highlightjs/7.3/highlight.min.js"></script>

<script src="/assets/js/site.js"></script>
{% for script in page.scripts %}<script src="{{ script }}"></script>
{% endfor %}
<script>
site.URL_GOOGLE_API = '{{site.meta.gapi}}';
site.URL_DISCUS_COMMENT = '{{ site.meta.author.disqus }}' ? 'http://{{ site.meta.author.disqus }}.{{ site.meta.disqus }}' : '';

site.VAR_SITE_NAME = '{{ site.name }}';
site.VAR_GOOGLE_CUSTOM_SEARCH_ID = '{{ site.meta.author.gcse }}';
site.TPL_SEARCH_TITLE = '#{0} / 搜索：#{1}';
</script>
<!--baidu统计-->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?522a85a1b947b397a0721d02a0bd9a52";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
</body>
</html>
