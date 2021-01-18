import { memo } from "react";
import ListItem from "./ListItem";

const Playlist = memo((item) => {
  return (
    <ListItem
      artist={item?.name}
      name={item?.description}
      imageUrl={item?.images.length ? item.images[0].url : ""}
      id={item?.id}
      externalUrl={item?.external_urls?.spotify}
      releaseDate=""
    />
  );
});

export default Playlist;
