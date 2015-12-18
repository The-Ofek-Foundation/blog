// // collapsibles
// $('.collapsible').each(function() {
// 	$this.children().hide();
// });

$(document).ready(function() {
	$('.title-case').each(function() {
		$(this).text(toTitleCase($(this).text()));
	});
});



function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}