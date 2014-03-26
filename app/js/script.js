(function debugInfo() {
	console.log("test");
	API_CLIENT.Events.on('wfsUpdate', function(data) {
		console.log('wfsUpdate: state ', data.state, '; item id ', data.id, '; block id ', data.block_id);
	});
	API_CLIENT.Events.on('assetUpdate',function(data) {
		console.log('assetUpdate: state ', data.state, '; item id ', data.id, '; block id ', data.block_id);
	});
})();

// data.block_id
// data.id
// data.state