import { memo } from "react";
import ListItem from "./ListItem";

const Episode = memo((item) => {
  return (
    <ListItem
      artist={item?.name}
      name={item?.name}
      imageUrl={item?.images.length ? item.images[0].url : ""}
      id={item?.id}
      externalUrl={item?.external_urls?.spotify}
      releaseDate={item?.release_date}
    />
  );
});

export default Episode;
