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
	
	//API namesapce
    var Remora = {
        "remoteDomain": "http://albertomiranda.com.ar",
        "siteDomain": "http://grooveshark.com"
    };
		
	//receive messages
	$.receiveMessage(
	  function(e){
        console.group('+ SENDING NEW REQUEST: ');
		console.log( e.data );
        console.groupEnd();
		Meteor.call('log', "(" + location.host + ") REQUEST STRING: " + e.data);
		
		var request = JSON.parse(e.data);
		Messages.remove({}); // remove all
		Messages.insert(request);
	  }
	);
	
	Meteor.autosubscribe(function(){
		Messages.find().observe({
			added: function(request){
				//avoid startup broadcast
				if (Messages.find().count() == 0) return false;
				
				//broadcast to selected target window
                var target = request.target || "site";
                target = Remora[target + "Domain"] || Remora.siteDomain;
				console.group("+ NEW MESSAGE for '" + target + "':");
                console.log(request.message);
                console.groupEnd();
				$.postMessage(
					JSON.stringify(request),
					target,
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
			},
			send: function (data) {
				return data;
			}
		});
  	});
}
//--------------------------------------------------------------------------------------
