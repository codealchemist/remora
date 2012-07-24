//API namesapce
var Remora = {
    "remoteDomain": "http://albertomiranda.com.ar:3000",
    "siteDomain": "http://grooveshark.com",
    "iframe": $('#remora')
};

/**
 * Handles communication between instances.
 * Posts passed request to server thru iframe proxy 
 *
 * @param {string} method
 * @param {object} params
 * @param {string} target [site|remote] Defaults to "site"
 */
Remora.api = function(method, params, target) {
	params = params || null;
    target = target || "site";
	if (!method) {
		console.log("--> Remora.api: ERROR: No method specified.");
		return false;
	}
	var message = "Remora.api: METHOD: " + method + ", PARAMS: " + JSON.stringify(params);
	var request = {"message": message, "method": method, "params": params, "target": target}; 
	var requestString = JSON.stringify(request);
	console.log("--> Remora.api: REQUEST: ");
	console.log(request);

	//send request
	$.postMessage(
		requestString,
		Remora.remoteDomain,
		Remora.iframe.get(0).contentWindow
	);
};

/**
 * Handles site response.
 * 
 * @author Alberto Miranda <alberto.php@gmail.com>
 * @param {object} response
 */
Remora.handleSiteResponse = function(response) {
    console.group('--> Remora.handleSiteResponse');
    console.log(response);
    
    if (!response.method){
        console.log('ERROR: no method');
        console.groupEnd();
        return false;
    }
    
    console.log('CALL: ' + response.method);
    var responseMethodArray = response.method.split('.');
    var count = responseMethodArray.length;

    //handle single function calls
    if (count==1) {
        if (typeof window[response.method] != 'function') {
            console.log('ERROR: method not exists: ' + response.method);
            console.groupEnd();
            return false;
        }
        
        window[response.method](response.params);
        console.groupEnd();
        return true;
    }

    //handle object method calls
    var method = window[responseMethodArray.slice(0,1)[0]];
    for (var i=1; i<count; ++i) {
        method = method[responseMethodArray[i]];
    }

    if (typeof method != 'function'){
        console.log('ERROR: method not exists: ' + method);
        console.groupEnd();
        return false;
    }
    
    method(response.params);
    console.groupEnd();
    return true;
};
