var i = getCorrectIndex(),
	areaName = "local";

// gets code from popup and injects to active tab
function injectTheScript(value) {
	console.log(value);
	chrome.tabs.executeScript(null, value, function() {
		console.log('Successfully injected script into the page ');
	});
}

function saveToStorage(value) {
	chrome.storage.local.get(null, function(items) { // get local storage obj
		var vals = _.values(items); // get the values out
		if (_.indexOf(vals, value.code) === -1) { // check if entered code doesn't exist in storage
			chrome.storage.local.set({i: value.code}, function() { // set it if not there
				if (chrome.runtime.lastError) {
					console.log(chrome.runtime.lastError);
				}
				else {
					console.log("code: " + value.code + " is now in local storage with index: " + i);
					i += 1;
				}
			});
		}
		else {
			console.log("this code exists in local storage");
		}
	});
}

// listen to long-lived connection
chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "historyChannel");
	port.onMessage.addListener(function(msg) {
		if (msg.message == "load") {
			console.log("I'm in");
			chrome.storage.local.get(null, function(items) {port.postMessage(items); console.log(typeof items);});
		}
	});
});


// this returns undefined, figure out why
function getCorrectIndex() {
	var largestI = chrome.storage.local.get(null, function(items) {return _.max(_.keys(items));});
	console.log(largestI);
	return largestI ? largestI : 0;
}


//chrome.tabs.onUpdated.addListener(injectTheScript);

// chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
// 		console.log("Received a request!");
// 		if (request.message == "load") {
// 			//var obj;
// 			chrome.storage.local.get(null, function(items) {sendResponse(items); console.log(typeof items)});
// 			//console.log(typeof obj);
// 			//sendResponse(_.values(obj));
// 		}
// });

// function initSavedCode() {
// 	chrome.storage.local.get(null, function(items) { // get local storage obj
// 		var popup = chrome.extension.getViews({type: "popup"}),
// 			that = popup.$(".inner");
// 		$.each(items, function(index, val) {
// 			that.append("<p>" + val + "</p>"); // append each of the saved strings to the .inner element
// 			console.log('appended');
// 		});
// 	});
// }
