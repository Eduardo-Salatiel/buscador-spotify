import { ableToSave } from "./../../components/DebugObserver";
import { isAuthenticated, spotifyRefreshToken, spotifyToken } from "./../auth/atoms";

const atomsToSave = [
  { key: ableToSave[0], atom: spotifyRefreshToken },
  { key: ableToSave[1], atom: spotifyToken },
  { key: ableToSave[2], atom: isAuthenticated},
];

export const initRecoilState = ({ set }) => {
  const localStorageLength = localStorage.length;

  for (let i = 0; i < localStorageLength; i++) {
    const localStorageKey = localStorage.key(i);
    const indexOfKey = ableToSave.indexOf(localStorageKey)

    if (indexOfKey !== -1) {
        const atom = atomsToSave[indexOfKey].atom
        set(atom, JSON.parse(localStorage.getItem(localStorageKey))?.value ?? null)
    }
  }
};
