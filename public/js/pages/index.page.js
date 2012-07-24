/**
 * Page related code.
 */
$(document).ready(function(){
	console.log('+ PAGE LOADED');

	//BINDINGS
	$('#volume').slider({
		change: function(event, ui){
			Remora.api('Grooveshark.setVolume', ui.value);
		}
	});

	$('#play').on('click', function(){
		Remora.api('Grooveshark.play');
        setTimeout("Remora.api('GS.player.currentSong')", 1 * 1000);
	});

	$('#pause').on('click', function(){
		Remora.api('Grooveshark.pause');
	});

	$('#rewind').on('click', function(){
		Remora.api('Grooveshark.seekToPosition', 0);
	});

	$('#playPause').on('click', function(){
		Remora.api('Grooveshark.togglePlayPause');
        setTimeout("Remora.api('GS.player.currentSong')", 1 * 1000);
	});

	$('#previous').on('click', function(){
		Remora.api('Grooveshark.previous');
        setTimeout("Remora.api('GS.player.currentSong')", 1 * 1000);
	});

	$('#next').on('click', function(){
		Remora.api('Grooveshark.next');
        setTimeout("Remora.api('GS.player.currentSong')", 1 * 1000);
	});

	$('#bookmarklet').attr('href', "javascript:var e=document.createElement('script');e.setAttribute('src','" + location.href + "js/remora.site.js');document.body.appendChild(e);var e=document.createElement('iframe');e.setAttribute('id','remora');e.setAttribute('src','http://" + location.host + ":3000');e.setAttribute('style','display:none;');document.body.appendChild(e);void(0);");
});

//Page namespace
var Page = {};

/**
 * Default site response handler.
 * 
 * @author Alberto Miranda <alberto.php@gmail.com>
 * @param {object} response
 */
Page.defaultResponseHandler = function(response) {
    console.group('--> Page.defaultResponseHandler');
    console.log(response);
    console.groupEnd();
};

/**
 * Shows current song name.
 * Receives GS.player.currentSong object from Grooveshark.
 * 
 * @author Alberto Miranda <alberto.php@gmail.com>
 * @param {object} response
 */
Page.showCurrentSong = function(response) {
    console.group('--> Page.showCurrentSong');
    response = JSON.parse(response);
    console.log(response);
    
    var sampleSong = {
        "AlbumID":"129278",
        "AlbumName":"Far Beyond Driven",
        "ArtistID":"3964",
        "ArtistName":"Pantera",
        "CoverArtFilename":"129278.jpg",
        "EstimateDuration":243000,
        "Flags":0,
        "IsLowBitrateAvailable":1,
        "Popularity":1220500145,
        "SongName":"Planet Caravan",
        "TrackNum":12,
        "Year":1994,
        "isDeleted":false,
        "fromLibrary":0,
        "isFavorite":0,
        "IsVerified":1,
        "TSAdded":"",
        "TSFavorited":"",
        "_token":null,
        "tokenFailed":false,
        "SongID":"473385",
        "searchText":"planet caravan pantera far beyond driven",
        "fanbase":false,
        "songs":{

        },
        "autoplayVote":0,
        "parentQueueID":"18850907741343108605113",
        "queueSongID":1,
        "source":"user",
        "index":0,
        "context":{
            "constructor":null,
            "attr":null,
            "data":{
                "songs":[

                ],
                "userID":899450,
                "artFilename":"441577-834355-984784-5951667.jpg",
                "playlistName":"Heavy Balads",
                "playlistID":74559262,
                "displayName":"Alberto Miranda",
                "client":"jsqueue"
            },
            "callback":null,
            "init":null,
            "_setProperty":null,
            "attrs":null,
            "Class":null,
            "type":"playlist"
        },
        "sponsoredAutoplayID":0,
        "playerDuration":243000
    };
    
    $('#songName').html(response.SongName);
    $('#artistName').html(response.ArtistName);
    $('#albumName').html(response.AlbumName);
    $('#currentSong').fadeIn();
    console.groupEnd();
};