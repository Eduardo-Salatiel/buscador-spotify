import { useRecoilState } from 'recoil'
import "./style.css";
import {
  album as albumAtom,
  artist as artistAtom,
  playlist as playlistAtom,
  episode as episodeAtom,
} from "./../../recoil/songs/atoms";

const HomeFilters = () => {
    const [album, setAlbum] = useRecoilState(albumAtom)
    const [playlist, setPlaylist] = useRecoilState(playlistAtom)
    const [episode, setEpisode] = useRecoilState(episodeAtom)
    const [artist, setArtist] = useRecoilState(artistAtom)

  return (
    <div className="home-filters">
      <label>
        Album
        <input type="checkbox" name="album" checked={!!album} onChange={({target}) => setAlbum(target.checked ? "album" : null)} />
      </label>
      <label>
        Artista
        <input type="checkbox" name="artist" checked={!!artist} onChange={({target}) => setArtist(target.checked ? "artist" : null)}/>
      </label>
      <label>
        Playlist
        <input type="checkbox" name="playlist" checked={!!playlist} onChange={({target}) => setPlaylist(target.checked ? "playlist" : null)}/>
      </label>
      <label>
        Episodio
        <input type="checkbox" name="episode" checked={!!episode} onChange={({target}) => setEpisode(target.checked ? "episode" : null)}/>
      </label>
    </div>
  );
};

export default HomeFilters;
