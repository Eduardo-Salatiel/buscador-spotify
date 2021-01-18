import {atom} from 'recoil'

export const isAuthenticated = atom({
    key: 'isAuthenticated',
    default: false
});

export const spotifyRefreshToken = atom({
    key: 'spotifyRefreshToken',
})

export const spotifyToken = atom({
    key: 'spotifyToken'
})

