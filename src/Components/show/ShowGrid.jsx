import React from "react";
import ShowCard from "./ShowCard";
import Image_Not_Found from "../../images/not-found.png";
import { FlexGrid } from "../styledComponents";
import { useShows } from "../../misc/customHook";

const ShowGrid = ({ data }) => {
  const [starredShows, dispatchStarred] = useShows();

  return (
    //FlexGrid is a styledComponent wrapper around div
    <FlexGrid>
      {data.map(({ show }) => {
        const isStarred = starredShows.includes(show.id);

        const handleStarClick = () => {
          if (isStarred) {
            dispatchStarred({ type: "REMOVE", showId: show.id });
          } else {
            dispatchStarred({ type: "ADD", showId: show.id });
          }
        };
        return (
          <ShowCard
            key={show.id}
            name={show.name}
            image={show.image ? show.image.medium : Image_Not_Found}
            summary={show.summary}
            id={show.id}
            handleStarClick={handleStarClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
