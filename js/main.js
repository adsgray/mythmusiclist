var PlaylistApp = (function() {

    var curplaylist = "";
    var selectedSongs = {};

    var setup_songlist = function() {

        $('div#output tr').mouseover(function() {
                    util.highlight($(this), 'highlight');
                }).mouseout(function() {
                    util.highlight($(this), 'highlight');
                });

        var debugstatus = function(arr) {
            var htmlstr = "";
            $.each(arr, function(key, val) {
                htmlstr += key + ', ';
            });
            $('div#status').html(htmlstr);
        };

        $('div#output tr').click(function() {
                if ('undefined' == typeof selectedSongs[curplaylist])
                {
                    selectedSongs[curplaylist] = {};
                }

                var arr = selectedSongs[curplaylist];
                var songid = $(this).find(".songid").html();
                //$('div#status').html(songid);

                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    delete arr[songid];
                } else {
                    $(this).addClass('selected');
                    arr[songid] = 1;
                }

                debugstatus(arr);
            });
    };


    var restore_selectedsongs = function() {
        var arr = selectedSongs[curplaylist];
        var dbg = "";

        $('table#songlist tbody tr').each(function(idx, val)
        {
            var songid = $(this).find(".songid").html();

            if (arr[songid] == 1) {
                dbg += songid + ', ';
                $(this).addClass('selected');
            }
        });

        $('div#status').text(dbg);
    }

    // cache to hold contents of playlists. key is playlist name
    var PLCache = {}; 
    var setup_playlistmenu =  function() {
        $('li.hl').mouseover(function() {
                    util.highlight($(this), 'highlight');
                }).mouseout(function() {
                    util.highlight($(this), 'highlight');
                });

        // load selected playlist into output div
        $('ul#playlists > li').click(function () {
                var odiv = $('div#output');
                var playlist = $(this).html();
                curplaylist = playlist;

                // remove selected class from all, then select current
                $('ul#playlists >li').removeClass('selected');
                $(this).addClass('selected');

                if (PLCache[playlist]) {
                    odiv.html(PLCache[playlist]);
                    $('div#status').text('from cache ' + playlist);
                    setup_songlist();
                    restore_selectedsongs();
                } else {
                    odiv.load('app/playlist.php', playlist,
                        function(){
                            $('div#status').text('cacheing ' + playlist);
                            PLCache[playlist] = odiv.html();
                            setup_songlist();
                            restore_selectedsongs();
                        });
                }


            });
    };

    var _reload_playlists = function() {
        $('div#playlistlist').load('app/playlistlist.php', function() {
            setup_playlistmenu();
        });
    };

    $(document).ready(function() {
        _reload_playlists();
    });

    return {
        reload_playlists: _reload_playlists
    }

})();
