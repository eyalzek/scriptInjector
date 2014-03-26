// gets code from popup and injects to active tab
function injectTheScript(value) {
	console.log(value);
	chrome.tabs.executeScript(null, value, function() {
		console.log('Successfully injected script into the page ');
	});
}

function saveToStorage(value) {
	chrome.storage.local.get(null, function(items) { // get local storage obj
		var vals = _values(items); // get the values out
		if (_.indexOf(vals, value.code) === -1) { // check if entered code doesn't exist in storage
			chrome.storage.local.set(value, function() { // set it if not there
				if (chrome.runtime.lastError) {
					console.log(chrome.runtime.lastError);
				}
				else {
					console.log("code: " + value.code + " is now in local storage");
				}
			});
		}
		else {
			console.log("this code exists in local storage");
		}
	});
}

function initSavedCode() {
	chrome.storage.local.get(null, function(items) { // get local storage obj
		var that = $(".inner");
		$.each(items, function(index, val) {
			that.append("<p>" + val + "</p>"); // append each of the saved strings to the .inner element
			console.log('appended');
		}
	);
})}
//chrome.tabs.onUpdated.addListener(injectTheScript);