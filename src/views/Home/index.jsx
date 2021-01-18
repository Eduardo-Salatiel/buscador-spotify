import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useState } from "react";
import seekerImage from "./../../assets/img/seeker.png";
//------------------------------------------------------------
import "./style.css";
import { spotifyToken as spotifyTokenAtom } from "./../../recoil/auth/atoms";
import { spotifySearchCall } from "./../../utils";
import { spotifyResult } from "./../../recoil/songs/atoms";
import HomeFilters from "./../../components/HomeFilters/index";
import { filterType as filterTypeSelector } from "./../../recoil/songs/selectors";
import Track from "./../../components/Track";
import Artist from "./../../components/Artist";
import Album from "./../../components/Album";
import Playlist from "./../../components/Playlist";
import Episode from "./../../components/Episode";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const spotifyToken = useRecoilValue(spotifyTokenAtom);
  const [searchResponse, setSearchResponse] = useRecoilState(spotifyResult);
  const [filterType] = useRecoilState(filterTypeSelector);
  const resetFilter = useResetRecoilState(filterTypeSelector);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClick = async () => {
    //TODO
    let type = filterType ?? "track";
    const paramsArray = [{ q: searchText }, { type }];
    const response = await spotifySearchCall(
      paramsArray,
      spotifyToken.access_token
    );
    setSearchResponse(response);
  };

  return (
    <div className="home">
      <div
        className="home-cover-container"
        style={{ backgroundImage: `url(${seekerImage})` }}
      />
      <h2 className="home-title">Busca tu canción favorita</h2>
      <div className="home-searchbox">
        <input
          type="text"
          className="home-searchbox-input"
          value={searchText}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Buscar</button>
      </div>
      <HomeFilters />
      <button className="home-clean-filters-button" onClick={resetFilter} >
        Limpiar Filtros
      </button>
      {searchResponse?.tracks.items && 
      <div className="home-tracks-container">
        <p className="home-tracks-title">Canciones</p>
        <div className="home-tracks-container-item">
          {searchResponse?.tracks?.items?.map((item, index) => (
            <Track key={index} {...item} />
          ))}
        </div>
      </div>}
      {searchResponse?.albums?.items &&
        <div className="home-albums-container">
        <p className="home-albums-title">Album</p>
        <div className="home-albums-container-item">
          {searchResponse?.albums?.items?.map((item, index) => (
            <Album key={index} {...item} />
          ))}
        </div>
      </div>}
      {searchResponse?.artists?.items &&
        <div className="home-artists-container">
        <p className="home-artists-title">Artista</p>
        <div className="home-artists-container-item">
          {searchResponse?.artists?.items?.map((item, index) => (
            <Artist key={index} {...item} />
          ))}
        </div>
      </div>}
      {searchResponse?.episodes?.items &&
        <div className="home-episodes-container">
        <p className="home-episodes-title">Episodios</p>
        <div className="home-episodes-container-item">
          {searchResponse?.episodes?.items?.map((item, index) => (
            <Episode key={index} {...item} />
          ))}
        </div>
      </div>}
      {searchResponse?.playlists?.items &&
        <div className="home-playlists-container">
        <p className="home-playlists-title">Playlists</p>
        <div className="home-playlists-container-item">
          {searchResponse?.playlists?.items?.map((item, index) => (
            <Playlist key={index} {...item} />
          ))}
        </div>
      </div>}
    </div>
  );
};

export default Home;
