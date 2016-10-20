// if (window.location.protocol !== "https:" && window.location.hostname !== "127.0.0.1")
// 	window.location = window.location.toString().replace(/^http:/, "https:");

$(document).ready(function() {
	$('.title-case').each(function() {
		$(this).text(toTitleCase($(this).text()));
	});
	$('.unhyphenate').each(function() {
		$(this).text($(this).text().replace(/-/g, ' '));
	});
	{% if page.new-tab-redirect %}
	    $('.page-content').find('a').each(function() {
	      if (this.href.substring(0, "{{site.url}}{{site.baseurl}}".length) != "{{site.url}}{{site.baseurl}}")
	        $(this).attr('target', '_blank');
	    });
    {% endif %}
});

function toTitleCase(str) {
    return str.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
