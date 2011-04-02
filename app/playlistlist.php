
<?php
require_once("db.php");

$db = new Musicdb();
$playlists = $db->get_playlist_names();
?>

<?php foreach ($playlists as $plname) { ?>
    <li class="hl"><?php print $plname; ?></li>
<?php } ?>


