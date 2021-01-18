import { useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
//----------------------------------------------------------//
import {
  isAuthenticated as isAuthenticatedAtom,
  spotifyRefreshToken as spotifyRefreshTokenAtom,
  spotifyToken as spotifyTokenAtom,
} from "./../../recoil/auth/atoms";
import { spotifyAuthCall } from "./../../utils";
import homeImage from "./../../assets/img/home.png";
import "./style.css";

const spotifyUri = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_CALLBACK_HOST}&scope=user-read-private`;

const Login = () => {
  const location = useLocation();
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
  const [spotifyRefreshToken, setSpotifyRefreshToken] = useRecoilState(
    spotifyRefreshTokenAtom
  );
  const [, setSpotifyToken] = useRecoilState(spotifyTokenAtom);

  const authenticatedUser = useCallback(
    async (code) => {
      try {
        let response;
        if (spotifyRefreshToken) {
          response = await spotifyAuthCall({
            refresh_token: spotifyRefreshToken,
            grant_type: "refresh_token",
          });
        } else {
          response = await spotifyAuthCall({
            code,
            grant_type: "authorization_code",
          });
        }
        if (response.access_token) {
          setSpotifyRefreshToken(response?.refresh_token);
          setSpotifyToken(response);
          setIsAuthenticated(true);
          history.replace("/home");
        }else{
          throw new Error("Usuario no fue logeado")
        }
      } catch (error) {
        console.log(error);
        setSpotifyToken(null);
        setSpotifyRefreshToken(null);
        setIsAuthenticated(false)
      }
    },
    [
      setIsAuthenticated,
      setSpotifyRefreshToken,
      setSpotifyToken,
      spotifyRefreshToken,
    ]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const spotifyCode = urlParams.get("code");
    if (spotifyCode || isAuthenticated) authenticatedUser(spotifyCode);
  }, [location.search]);

  const handleLoginClick = () => {
    window.location.replace(spotifyUri);
  };
  return (
    <div className="home-container">
      <div className="home-left-child">
        <h3>Bienvenido de nuevo</h3>
        <h6>identificate para encontrar tu música favorita</h6>
        <button onClick={handleLoginClick}>Iniciar sesion</button>
      </div>
      <div
        className="home-right-child"
        style={{ backgroundImage: `url(${homeImage})` }}
      ></div>
    </div>
  );
};

export default Login;
