// gets code from popup and injects to active tab
function injectTheScript(value) {
	console.log(value);
	chrome.tabs.executeScript(null, {code: value.code}, function() {
		console.log('Successfully injected script into the page ');
	});
}

function saveToStorage(value) {
	StorageArea.get(value.id, function(items) {
		if (!(value.code in items)) {
			StorageArea.set(value, function() {
				if (chrome.runtime.lastError) {
					console.log(chrome.runtime.lastError);
				}
			});
		}
	});
}

function initSavedCode() {
	StorageArea.get("code", function(items) {
		
	})
}
//chrome.tabs.onUpdated.addListener(injectTheScript);