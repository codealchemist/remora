var Messages = new Meteor.Collection("messages");
Messages.remove({}); // remove all

//--------------------------------------------------------------------------------------
//CLIENT
if (Meteor.is_client) {	
	/*
	 * jQuery postMessage - v0.5 - 9/11/2009
	 * http://benalman.com/projects/jquery-postmessage-plugin/
	 * 
	 * Copyright (c) 2009 "Cowboy" Ben Alman
	 * Dual licensed under the MIT and GPL licenses.
	 * http://benalman.com/about/license/
	 */
	(function($){var g,d,j=1,a,b=this,f=!1,h="postMessage",e="addEventListener",c,i=b[h]&&!$.browser.opera;$[h]=function(k,l,m){if(!l){return}k=typeof k==="string"?k:$.param(k);m=m||parent;if(i){m[h](k,l.replace(/([^:]+:\/\/[^\/]+).*/,"$1"))}else{if(l){m.location=l.replace(/#.*$/,"")+"#"+(+new Date)+(j++)+"&"+k}}};$.receiveMessage=c=function(l,m,k){if(i){if(l){a&&c();a=function(n){if((typeof m==="string"&&n.origin!==m)||($.isFunction(m)&&m(n.origin)===f)){return f}l(n)}}if(b[e]){b[l?e:"removeEventListener"]("message",a,f)}else{b[l?"attachEvent":"detachEvent"]("onmessage",a)}}else{g&&clearInterval(g);g=null;if(l){k=typeof m==="number"?m:typeof k==="number"?k:100;g=setInterval(function(){var o=document.location.hash,n=/^#?\d+&/;if(o!==d&&n.test(o)){d=o;l({data:o.replace(n,"")})}},k)}}}})(jQuery);
	
	//set domains
	var siteDomain = "http://grooveshark.com";
	var controlDomain = "http://albertomiranda.com.ar";
	
	//internal API namespace
	var Remora = {};
	Remora.play = function() {
		var request = {
			"message": "yeah!", 
			"method": "play"
		};
		$.postMessage(
			JSON.stringify(request),
			siteDomain,
			parent
		);	
	};	
	
	//receive messages from target site domain
	$.receiveMessage(
	  function(e){
		console.log( "+ FROM SITE: " + e.data );
		Meteor.call('log', "REQUEST STRING: " + e.data);
		
		var request = JSON.parse(e.data);
		Meteor.call('log', request);
		Messages.remove({}); // remove all
		Messages.insert(request);
	  },
	  siteDomain
	);
	
	//receive messages from remote control domain
	$.receiveMessage(
	  function(e){
		console.log( "+ FROM REMOTE CONTROL: " + e.data );
		Meteor.call('log', "(CONTROL) REQUEST STRING: " + e.data);
		
		var request = JSON.parse(e.data);
		Messages.remove({}); // remove all
		Messages.insert(request);
	  },
	  controlDomain
	);
	
	Meteor.autosubscribe(function(){
		Messages.find().observe({
			added: function(request){
				//avoid startup broadcast
				if (Messages.find().count() == 0) return false;
				
				//broadcast to main window
				console.log("+ NEW MESSAGE: " + request.message);
				$.postMessage(
					JSON.stringify(request),
					siteDomain,
					parent
				);
			}
		});
	});
}
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
//SERVER
if (Meteor.is_server) {	
  	Meteor.startup(function () {
	    // code to run on server at startup
		Meteor.methods({
		  log: function (message) {
			console.log("+ MESSAGE FROM CLIENT: " + message);
			return "+ MESSAGE RECEIVED";
		  }
		});
  	});
}
//--------------------------------------------------------------------------------------
