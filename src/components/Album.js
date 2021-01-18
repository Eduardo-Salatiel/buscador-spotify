import { memo } from "react";
import ListItem from "./ListItem";

const Album = memo((item) => {
  return (
    <ListItem
      artist={item?.artists[0].name}
      name={item?.name}
      imageUrl={item?.images.length ? item.images[0].url : ""}
      id={item?.id}
      externalUrl={item?.external_urls?.spotify}
      releaseDate={item?.release_date}
    />
  );
});

export default Album;
