var bg = chrome.extension.getBackgroundPage(),
	link;


$().ready(function() {

	var port = chrome.runtime.connect({name: "historyChannel"}), // initilize a long-lived connection
		init = _.once(function() {port.postMessage({message: "load"});}), // function to initilize the history container on first run
		areaName = "local";

	init();

	// listen to messages on a long-lived connection and append code history to .inner
	port.onMessage.addListener(function(response) {
		if (_.isObject(response)) {
			console.log("im in");
			_.forOwn(response, function(value, key) {
				console.log(key, value);
				$(".inner").append("<p>" + value + "</p>"); // append each of the saved strings to the .inner element
				console.log('appended');
			});
		}
	});

	// update when storage changes
	chrome.storage.onChanged.addListener(function(changes, areaName) {
		console.log("the following have changed: ", changes);
		port.postMessage({message: "load"});
	});

	chrome.tabs.query({active: true, currentWindow: true, windowType: "normal"}, function(Tab) {link = Tab[0].url});
//	$(".container").innerHTML = "running script on: " + link;
	
	// send code to active tab on click
	$(".submit").on("click", function() {
		console.log("script sent to bg");
		var that = {code: $(".mycode").val()};

		if (bg && (typeof bg.injectTheScript === "function")) {
			bg.injectTheScript(that);
		}

		// and save it to storage
		if (bg && (typeof bg.saveToStorage === "function")) {
			bg.saveToStorage(that);
		}
	});

	// display the history container on click
	$(".history").on("click", function() {
		$(".inner").toggle();
		console.log("clicked history button");
	});
});


	// if (bg && (typeof bg.initSavedCode === "function")) {
	// 	bg.initSavedCode();
	// 	console.log("history loaded");
	// }

	// chrome.extension.sendRequest({message: "load"}, function(response) {
	// 	console.log(response);
	// 	if (_.isObject(response)) {
	// 		console.log("im in");
	// 		_.forOwn(response, function(value, key) {
	// 			console.log(key, value);
	// 			$(".inner").append("<p>" + value + "</p>"); // append each of the saved strings to the .inner element
	// 			console.log('appended');
	// 		});
	// 	}
	// });
