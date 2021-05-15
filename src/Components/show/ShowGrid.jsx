import React from "react";
import ShowCard from "./ShowCard";
import Image_Not_Found from "../../images/not-found.png";
import { FlexGrid } from "../styledComponents";

const ShowGrid = ({ data }) => {
  return (
    //FlexGrid is a styledComponent wrapper around div
    <FlexGrid>
      {data.map(({ show }) => (
        <ShowCard
          key={show.id}
          name={show.name}
          image={show.image ? show.image.medium : Image_Not_Found}
          summary={show.summary}
        />
      ))}
    </FlexGrid>
  );
};

export default ShowGrid;
