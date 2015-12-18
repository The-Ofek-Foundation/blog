$(document).ready(function() {
	$('.title-case').each(function() {
		$(this).text(toTitleCase($(this).text()));
	});
});



function toTitleCase(str) {
    return str.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}