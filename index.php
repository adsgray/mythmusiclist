<html>
<head>
<title>MythMusic Playlists</title>
<link rel="stylesheet" href="css/style.css" type="text/css" media="screen">
</head>

<?php
require_once("app/db.php");

$db = new Musicdb();
$playlists = $db->get_playlist_names();
?>

<body>
<div id="wrap">

<div id="buttons">
    <ul class="horizbuttons">
        <li>Create New</li>
        <li>Delete</li>
        <li>Modify</li>
    </ul>
</div>

<div id="leftside">
    <ul class="skinny menu" id="playlists">
    <?php foreach ($playlists as $plname) { ?>
        <li class="hl"><?php print $plname; ?></li>
    <?php } ?>
    </ul>

    <div id="status">
    </div>
</div>

<div id="output">
</div>


</div> <!-- wrap -->

</body>

<?php require_once("js/jquery.php"); ?>
<script src="js/util.js"></script>
<script src="js/main.js"></script>

</html>
