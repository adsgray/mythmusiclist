
<?php
require_once("db.php");

$db = new Musicdb();
$playlists = $db->get_playlist_names();
?>

<ul class="skinny menu" id="playlists">
<?php foreach ($playlists as $plname) { ?>
    <li class="hl"><?php print $plname; ?></li>
<?php } ?>
</ul>


