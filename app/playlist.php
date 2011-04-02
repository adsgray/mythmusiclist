<?php

require_once("db.php");
$db = new Musicdb();

$plname = urldecode($_SERVER['QUERY_STRING']);
// todo: sanitize

$songs = $db->get_playlist_songs($plname);

$num = 0;
?>

length: <?php print count($songs); ?>
<table id="songlist">

<tr><th>Artist</th><th>Album</th><th>Song Name</th><th></th></tr>

<?php foreach ($songs as $songinfo) { ?>
<tr <?php if ($num == 1) { print 'class="odd"'; } ?>>
<td><?php print "$songinfo[artist]"; ?></td>
<td><?php print "$songinfo[album]"; ?></td>
<td><?php print "$songinfo[filename]"; ?></td>
<td class="songid"><?php print "$songinfo[songid]"; ?></td>
</tr>
<?php $num = ($num + 1) % 2;} ?>

</table>

