var bg = chrome.extension.getBackgroundPage(),
	link;

$().ready(function() {
	chrome.tabs.query({active: true, currentWindow: true, windowType: "normal"}, function(Tab) {link = Tab[0].url});
//	$(".container").innerHTML = "running script on: " + link;
	$(".submit").on("click", function() {
		alert("sending message");
		var that = {code: $(".mycode").val()};
		//var that = $(".mycode").val();
		if (bg && (typeof bg.injectTheScript === "function")) {
			bg.injectTheScript(that);

		}
		if (bg && (typeof bg.saveToStorage === "function")) {
			bg.saveToStorage(that);
		}
	});

	if (bg && (typeof bg.initSavedCode === "function")) {
		bg.initSavedCode();
		console.log("history loaded");
	}

	$(".history").on('click', function() {
		$(".inner").show();
		console.log("clicked history button");
	});
	$("body").on("click", function(e) {
		$(".inner").hide();
		e.stopPropagation();
	})
});

//document.addEventListener("DOMContentLoaded", 