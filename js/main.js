(function() {

var PLCache = new Array();

$('.hl').mouseover(function() {
            util.highlight($(this), 'highlight');
        }).mouseout(function() {
            util.highlight($(this), 'highlight');
        });

// load selected playlist into output div
$('ul.menu#playlists > li').click(function () {
        var odiv = $('div#output');
        var playlist = $(this).html();

        // remove selected class from all, then select current
        $('ul.menu#playlists >li').removeClass('selected');
        $(this).addClass('selected');

        if (PLCache[playlist]) {
            odiv.html(PLCache[playlist]);
            $('div#status').text('from cache ' + playlist);
        } else {
            odiv.load('app/playlist.php', playlist,
                function(){
                    $('div#status').text('cacheing ' + playlist);
                    PLCache[playlist] = odiv.html();
                });
        }

    });
})();
