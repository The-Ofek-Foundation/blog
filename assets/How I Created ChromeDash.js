$("#add-extension").click(function () {
	chrome.webstore.install('https://chrome.google.com/webstore/detail/bbpiealmmbiefhppikadopbljoppcnoa',
		function(d){
			   console.log('installed')
			},
			function(e){
			   console.log('not installed: '+ e)
			});
});