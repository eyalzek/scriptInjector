var bg = chrome.extension.getBackgroundPage(),
	link;

document.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.query({windowType: "popup"}, function(Tab) {link = Tab[0].url});
//	$('.container').innerHTML = "running script on: " + link;
	$('button').on('click', function() {
		alert('sending message');
		if (bg && (typeof bg.injectTheScript === 'function')) {
			bg.injectTheScript({code: $('.mycode').val(), id: "code"});
		}
	});
});