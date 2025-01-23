let playlists = [];

function generateRandomID() {
  return Math.floor(Math.random() * 999999999);
}

const controller = {
  // GET /api/playlists
  index: (req, res) => {
    res.json(playlists);
  },
  // GET /api/playlists/:id
  show: (req, res) => {
    const { id } = req.params;
    const playlist = playlists.find((playlist) => playlist.id == +id);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.json(playlist);
  },

  // POST /api/playlists
  save: (req, res) => {
    const { name, tags, musics } = req.body;

    if (typeof name !== "string") {
      return res.status(400).json({ message: "name must be a string" });
    }

    if (!Array.isArray(tags)) {
      return res.status(400).json({ message: "tags must be an array" });
    }

    if (musics && !Array.isArray(musics)) {
      return res.status(400).json({ message: "musics must be an array" });
    }

    const newPlaylist = {
      id: generateRandomID(),
      name: name,
      tags: tags,
      musics: musics ?? [],
    };

    playlists.push(newPlaylist);

    res.status(201).json(newPlaylist);
  },

  // PUT /api/playlists/:id
  update: (req, res) => {
    const { name, tags } = req.body;
    const { id } = req.params;
    const playlistIndex = playlists.findIndex((pl) => pl.id == +id);

    if (playlistIndex == -1) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    if (typeof name === "string") {
      playlists[playlistIndex].name = name;
    }
    if (tags && Array.isArray(tags)) {
      playlists[playlistIndex].tags = tags;
    }
    res.json(playlists[playlistIndex]);
  },
  // DELETE /api/playlists/:id
  delete: (req, res) => {
    const { id } = req.params;
    const playlistIndex = playlists.findIndex((pl) => pl.id == +id);

    if (playlistIndex == -1) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    playlists.splice(playlistIndex, 1);
    res.sendStatus(204);
  },
  // POST /api/playlists/:id/musics
  addMusic: (req, res) => {
    const { id } = req.params;
    const { title, year, artist, album } = req.body;
    const playlistIndex = playlists.findIndex((pl) => pl.id == +id);
    if (playlistIndex == -1) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    if (
      typeof title === "string" &&
      typeof year === "number" &&
      typeof artist === "string" &&
      typeof album === "string"
    ) {
      const newMusic = {
        id: generateRandomID(),
        title: title,
        year: year,
        artist: artist,
        album: album,
      };
      playlists[playlistIndex].musics.push(newMusic);
      res.status(201).json(newMusic);
    } else {
      return res.status(400).json({ message: "Invalid fields" });
    }
  },
  // DELETE /playlists/:id/musics/:musicId
  deleteMusic: (req, res) => {
    const { id } = req.params;
    const playlistIndex = playlists.findIndex((pl) => pl.id == +id);
    if (playlistIndex == -1) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    const { musicId } = req.params;
    const musicIndex = playlists[playlistIndex].musics.findIndex(
      (music) => music.id == +musicId
    );
    if (musicIndex == -1) {
      return res.status(404).json({ message: "Music not found" });
    }
    playlists[playlistIndex].musics.splice(musicIndex, 1);
    res.sendStatus(204).json({ message: "Music deleted" });
  },
};

module.exports = controller;
