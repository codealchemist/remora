/*
 * jQuery postMessage - v0.5 - 9/11/2009
 * http://benalman.com/projects/jquery-postmessage-plugin/
 * 
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($){var g,d,j=1,a,b=this,f=!1,h="postMessage",e="addEventListener",c,i=b[h]&&!$.browser.opera;$[h]=function(k,l,m){if(!l){return}k=typeof k==="string"?k:$.param(k);m=m||parent;if(i){m[h](k,l.replace(/([^:]+:\/\/[^\/]+).*/,"$1"))}else{if(l){m.location=l.replace(/#.*$/,"")+"#"+(+new Date)+(j++)+"&"+k}}};$.receiveMessage=c=function(l,m,k){if(i){if(l){a&&c();a=function(n){if((typeof m==="string"&&n.origin!==m)||($.isFunction(m)&&m(n.origin)===f)){return f}l(n)}}if(b[e]){b[l?e:"removeEventListener"]("message",a,f)}else{b[l?"attachEvent":"detachEvent"]("onmessage",a)}}else{g&&clearInterval(g);g=null;if(l){k=typeof m==="number"?m:typeof k==="number"?k:100;g=setInterval(function(){var o=document.location.hash,n=/^#?\d+&/;if(o!==d&&n.test(o)){d=o;l({data:o.replace(n,"")})}},k)}}}})(jQuery);

var iframe = $('#remora');
var remoteDomain = 'http://albertomiranda.com.ar:3000';

$.receiveMessage(
	function(e){
		console.log('+ MESSAGE FROM REMOTE: ');
		console.log(e);
		var request = JSON.parse(e.data);
		console.log('+ REQUEST OBJECT: ');
		console.log(request);
		if (request.method) {
			console.log('--> RUN GROOVESHARK COMMAND: ' + request.method);
			Grooveshark[request.method](request.params);
		}
	},
	remoteDomain
);

//API namesapce
var Remora = {};

/**
 * Handles communication between instances.
 * Posts passed request to server thru iframe proxy 
 *
 * @param {string} method
 * @param {object} params
 */
Remora.api = function(method, params) {
	params = params || null;
	if (!method) {
		console.log("--> Remora.api: ERROR: No method specified.");
		return false;
	}
	var message = "Remora.api: METHOD: " + method + ", PARAMS: " + JSON.stringify(params);
	var request = {"message": message, "method": method, "params": params}; 
	var requestString = JSON.stringify(request);
	console.log("--> Remora.api: REQUEST: ");
	console.log(request);

	//send request
	$.postMessage(
		requestString,
		remoteDomain,
		iframe.get(0).contentWindow
	);
};
