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

                /* abstract out this cacheing?
                 * Cache, key
                 * dest div
                 * network source
                 * callback funcs after dest div is populated
                 *
                 * use it for dialogs, too
                 */
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

    var setup_menu = function() {
        $('div#buttons > ul#menu > li').click(function() {
            //alert('test');
            var id = $(this).attr('id');
            var div = $('div#dialog');

            if (div.is(':visible')) {
                div.hide('slow');
            } else {
                div.show('slow', function() {
                    // load php div.load(
                    div.text('button: ' + id);
                });
            }
        });
    };

    var _reload_playlists = function() {
        $('ul#playlists').load('app/playlistlist.php', function() {
            setup_playlistmenu();
        });
    };

    var _load_basemenu = function() {
        $('ul#menu').load('app/basemenu.php', function () {
            setup_menu();
        });
    };

    $(document).ready(function() {
        _reload_playlists();
        _load_basemenu();
    });

    return {
        reload_playlists: _reload_playlists
    }

})();
