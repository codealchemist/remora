/**
 * "Remote site" message handling.
 * Here we receive messages from site.
 */

$.receiveMessage(
	function(e){
		console.group('+ MESSAGE FROM SITE: ');
		console.log(e);

		var data = JSON.parse(e.data);
		console.log('+ RECEIVED DATA: ');
		console.log(data);
        console.groupEnd();
        
        Remora.handleSiteResponse(data);
	},
	Remora.remoteDomain
);