import { useRecoilTransactionObserver_UNSTABLE } from 'recoil'

export const ableToSave = ["spotifyRefreshToken","spotifyToken", "isAuthenticated"]
function DebugObserver (){
    useRecoilTransactionObserver_UNSTABLE(({snapshot}) => {
        
        for(const modifiedAtom of snapshot.getNodes_UNSTABLE({ isModified:true })){
           const atom = snapshot.getLoadable(modifiedAtom)
           if (atom.state === 'hasValue' && ableToSave.indexOf(modifiedAtom.key) !== -1) {
               localStorage.setItem(modifiedAtom.key, JSON.stringify({value: atom.contents}))
           }
        }
    })
    return null
}

export default DebugObserver;