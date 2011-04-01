<?php

class db {

    # default: change to site-specific values
	private $user="mythtv";
	private $password="mythtv";
	private $database="mythconverg";
	private $connected = false;

	function __construct()
	{
	}

	public function connect()
	{
		if ($this->connected) { return; }

		mysql_connect("localhost",$this->user,$this->password);
		@mysql_select_db($this->database) 
			or die( "Unable to select database: " . $this->database);

		$this->connected = true;
	}

	public function disconnect()
	{
		mysql_close();
		$this->connected = false;
	}

}

class Musicdb {
	private $db;

	function __construct()
	{
		$this->db = new db();
		$this->connect();
	}

    function __destruct()
    {
        $this->disconnect();
    }

	public function connect()
	{
		$this->db->connect();
	}

	public function disconnect()
	{
		$this->db->disconnect();
	}

	public function get_playlist_names()
	{
		$res = mysql_query('SELECT playlist_name FROM music_playlists');
		$ret = array();

		while ($row = mysql_fetch_row($res))
		{
			foreach ($row as $elem)
			{
				$ret[] = $elem;
			}
		}

		return $ret;
	}

    private function get_dirname($dirid)
    {
        $query = sprintf('SELECT path FROM music_directories
                WHERE directory_id=%d', $dirid);
		$res = mysql_query($query);

        $row = mysql_fetch_row($res);
        return $row[0];
    }

    private function splitdirname($dirname)
    {
        $ret = array();
        $arr = explode('/', $dirname);

        // now just take last two
        $sz = count($arr);
        if ($sz >= 2)
        {
            $ret["album"]  = $arr[$sz - 1];
            $ret["artist"] = $arr[$sz - 2];
        }

        return $ret;
    }

    # take a list of songids and return an array of assoc. arrays
    private function translate_songs($songidlist)
    {
        $ret = array();

        foreach ($songidlist as $songid)
        {
            $query = sprintf('SELECT directory_id, filename FROM music_songs 
				WHERE song_id = %d', $songid);
            $res = mysql_query($query);
            if (!$res) {
                return "[$query][". mysql_error() ."]";
            }

            $info = mysql_fetch_array($res);
            $dirname = $this->get_dirname($info["directory_id"]);
            $songinfo = $this->splitdirname($dirname);
            $songinfo["filename"] = $info["filename"];
            $songinfo["songid"] = $songid;
            $ret[] = $songinfo;
        }

        return $ret;
    }

    function get_playlist_songs($playlist)
    {
        $query = sprintf("SELECT playlist_songs FROM music_playlists
			WHERE playlist_name = '%s'",
            mysql_real_escape_string($playlist));
        $res = mysql_query($query);

        if (!$res) {
            return "[$query][". mysql_error() ."]";
        }

        $arr = mysql_fetch_row($res);
        $songidlist = explode(',',$arr[0]);

        return $this->translate_songs($songidlist);
    }
}

# test
#$mdb = new musicdb();
#$mdb->get_playlist_songs("folk");
?>
