document.addEventListener("DOMContentLoaded", function () {
	{% if page.new-tab-redirect %}
		let links = document.getElementsByTagName('a');
		for (let link of links)
			if (link.href.substring(0, "{{site.url}}{{site.baseurl}}".length)
				!= "{{site.url}}{{site.baseurl}}")
				link.target = '_blank';
	{% endif %}
});
