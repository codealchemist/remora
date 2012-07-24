/*
 * jQuery postMessage - v0.5 - 9/11/2009
 * http://benalman.com/projects/jquery-postmessage-plugin/
 * 
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($){var g,d,j=1,a,b=this,f=!1,h="postMessage",e="addEventListener",c,i=b[h]&&!$.browser.opera;$[h]=function(k,l,m){if(!l){return}k=typeof k==="string"?k:$.param(k);m=m||parent;if(i){m[h](k,l.replace(/([^:]+:\/\/[^\/]+).*/,"$1"))}else{if(l){m.location=l.replace(/#.*$/,"")+"#"+(+new Date)+(j++)+"&"+k}}};$.receiveMessage=c=function(l,m,k){if(i){if(l){a&&c();a=function(n){if((typeof m==="string"&&n.origin!==m)||($.isFunction(m)&&m(n.origin)===f)){return f}l(n)}}if(b[e]){b[l?e:"removeEventListener"]("message",a,f)}else{b[l?"attachEvent":"detachEvent"]("onmessage",a)}}else{g&&clearInterval(g);g=null;if(l){k=typeof m==="number"?m:typeof k==="number"?k:100;g=setInterval(function(){var o=document.location.hash,n=/^#?\d+&/;if(o!==d&&n.test(o)){d=o;l({data:o.replace(n,"")})}},k)}}}})(jQuery);

//API namesapce
var Remora = {
    "remoteDomain": "http://albertomiranda.com.ar:3000",
    "siteDomain": "http://grooveshark.com",
    "iframe": $('#remora')
};

/**
 * Maps site requests to remote methods.
 * This allows to automatically capture site responses on remote.
 */
Remora.bindings = {
    "GS.player.currentSong": "Page.showCurrentSong"
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

Remora.post = function(response, request) {
    var method = Remora.bindings[request.method] || 'Page.defaultResponseHandler';
    var params = JSON.stringify(response);
    Remora.api(method, params, "remote");
};

$.receiveMessage(
	function(e){
		console.log('+ MESSAGE FROM REMOTE: ');
		console.log(e);

		var request = JSON.parse(e.data);
		console.log('+ REQUEST OBJECT: ');
		console.log(request);
		if (request.method) {
			console.log('--> RUN COMMAND: ' + request.method);
			var requestMethodArray = request.method.split('.');
			var count = requestMethodArray.length;
			var response = null;

			//handle single function calls
			if (count==1) {
				//function
				if (typeof window[request.method] == 'function') {
					response = window[request.method](request.params);
					return Remora.post(response, request);
				}

				//data
				response = window[request.method];
				return Remora.post(response, request);
			}

			//handle object method calls
			var method = window[requestMethodArray.slice(0,1)[0]];
			for (var i=1; i<count; ++i) {
				method = method[requestMethodArray[i]];
			}

			//function
			if (typeof method == 'function') {
				response = method(request.params);
				return Remora.post(response, request);
			}

			//data
			response = method;
			return Remora.post(response, request);
		}
	},
	Remora.remoteDomain
);

if (location.host == 'grooveshark.com') {
	alert('Remora attached!');
}
