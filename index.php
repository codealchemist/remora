<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Remora</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A multi instance remote control for your beloved Grooveshark music!">
    <meta name="author" content="alberto.php@gmail.com">

    <!-- Le styles -->
    <link href="public/css/bootstrap.min.css" rel="stylesheet">
    <link href="public/css/default.css" rel="stylesheet">
    <link href="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.20/themes/smoothness/jquery-ui.css" rel="stylesheet">
    <style>
      body {
        padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
      }
    </style>

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>

  <body>
    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="#">Remora</a>
          <div class="nav-collapse">
            <ul class="nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container">
		<h2>A Grooveshark Remote Experience</h2>
		<p>Multi instance remote control for your beloved Grooveshark music!</p>
		<br />

        <div id="currentSong" style="display:none">
            <span id="songName"></span>
            by <span id="artistName"></span>
            @<span id="albumName"></span>
        </div>
		<button id="play" class="btn btn-large btn-primary"><i class="icon-play"></i>Play</button>
		<button id="pause" class="btn btn-large btn-info"><i class="icon-pause"></i> Pause</button>
		<button id="rewind" class="btn btn-large"><i class="icon-backward"></i> Rewind</button>
		<button id="playPause" class="btn btn-large btn-warning">Play / Pause</button>
		<button id="previous" class="btn btn-large btn-info"><i class="icon-fast-backward"></i> Previous</button>
		<button id="next" class="btn btn-large btn-info"><i class="icon-fast-forward"></i> Next</button>
		<div style="margin:20px;">
			<div id="volume" style="width:535px; float:left; margin:0 5px 0 0"></div>
			<i class="icon-volume-up"></i>
		</div>

		<br /><br /><br />
		<hr />
		<div>
			<h3>Bookmarklet</h3>
			The Remora bookmarklet lets you easily attach Remora to a <a href="http://grooveshark.com/html5" target="_blank">Grooveshark instance</a>.<br />
			Drag and drop the following link into your bookmarks bar:<br />
			<a href="" id="bookmarklet">
				Attach Remora
			</a>
		</div>
    </div> <!-- /container -->

    <iframe id="remora" src="http://albertomiranda.com.ar:3000" style="display:none"></iframe>
    
    <!-- SCRIPTS; TODO: use loader -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
    <script src="public/js/lib/jquery.postmessage.lib.js"></script>
    <script src="public/js/bootstrap.min.js"></script>
	<script src="public/js/lib/remora.lib.js"></script>
	<script src="public/js/remora.remote.js"></script>
	<script src="public/js/pages/index.page.js"></script>
  </body>
</html>
