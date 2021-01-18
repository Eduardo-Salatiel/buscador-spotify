import './style.css'
import React from 'react'

const ListItem = React.memo(({ artist, name, imageUrl, images, id, externalUrl, onClick, releaseDate }) => {
    const handleClick = () => {
        window.open(externalUrl, "_blank")
    }
    return ( 
        <div className="list-item" onClick={handleClick}>
            <img src={imageUrl} alt={id}/>
            <p className="list-item-title"> {name} </p>
            <p className="list-item-artist">{artist}</p>
            <p className="list-item-releaseDate">{releaseDate}</p>
        </div>
     );
})
 
export default ListItem;