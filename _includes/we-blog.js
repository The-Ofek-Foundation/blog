document.addEventListener("DOMContentLoaded", function () {
	var titleCaseElements = document.getElementsByClassName('title-case');
	for (var i = 0; i < titleCaseElements.length; i++)
		titleCaseElements[i].innerHTML = toTitleCase(titleCaseElements[i].innerHTML);


	var unhyphenateElements = document.getElementsByClassName('unhyphenate');
	for (var i = 0; i < unhyphenateElements.length; i++)
		unhyphenateElements[i].innerHTML = unhyphenateElements[i].innerHTML.replace(/-/g, ' ');

	{% if page.new-tab-redirect %}
		var links = document.getElementsByTagName('a');
		for (var i = 0; i < links.length; i++)
			if (links[i].href.substring(0, "{{site.url}}{{site.baseurl}}".length)
				!= "{{site.url}}{{site.baseurl}}")
				links[i].target = '_blank';
	{% endif %}
});

function toTitleCase(str) {
	return str.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
