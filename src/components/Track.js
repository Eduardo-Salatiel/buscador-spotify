import ListItem from "./ListItem";
import React from "react";

const Track = React.memo(( item ) => {
  return (
    <ListItem
      artist={item?.artists[0].name}
      name={item?.name}
      imageUrl={item?.album?.images[0]?.url}
      id={item?.id}
      externalUrl={item?.external_urls?.spotify}
      releaseDate={item?.album?.release_date}
    />
  );
});

export default Track;
