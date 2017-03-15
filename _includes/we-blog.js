document.addEventListener("DOMContentLoaded", function () {
	{% if page.new-tab-redirect %}
		var links = document.getElementsByTagName('a');
		for (var i = 0; i < links.length; i++)
			if (links[i].href.substring(0, "{{site.url}}{{site.baseurl}}".length)
				!= "{{site.url}}{{site.baseurl}}")
				links[i].target = '_blank';
	{% endif %}
});
