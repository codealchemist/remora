<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Remora</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A multi instance remote control for your beloved Grooveshark music!">
    <meta name="author" content="alberto.php@gmail.com">

    <!-- Le styles -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
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
		<h1>Remora</h1>
		<p>A multi instance remote control for your beloved Grooveshark music!</p>

		<button id="play" class="btn btn-large btn-primary" onclick="Remora.api('play')"><i class="icon-play"></i>Play</button>
		<button id="pause" class="btn btn-large btn-info" onclick="Remora.api('pause')"><i class="icon-pause"></i> Pause</button>
		<button id="rewind" class="btn btn-large" onclick="Remora.api('seekToPosition', 0)"><i class="icon-backward"></i> Rewind</button>
		<button id="playPause" class="btn btn-large btn-warning" onclick="Remora.api('togglePlayPause')">Play / Pause</button>
		<button id="previous" class="btn btn-large btn-info" onclick="Remora.api('previous')"><i class="icon-fast-backward"></i> Previous</button>
		<button id="next" class="btn btn-large btn-info" onclick="Remora.api('next')"><i class="icon-fast-forward"></i> Next</button>
		<div style="margin:20px;">
			<div id="volume" style="width:535px; float:left; margin:0 5px 0 0"></div>
			<i class="icon-volume-up"></i>
		</div>
    </div> <!-- /container -->

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/inject.js"></script>
    <script src="js/remora.local.js"></script>
	<script>
		$(document).ready(function(){
			$('#volume').slider({
				change: function(event, ui){
					Remora.api('setVolume', ui.value);
				}
			});
		});
	</script>
  </body>
</html>
