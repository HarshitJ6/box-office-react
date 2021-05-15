import React from "react";
import ActorCard from "./ActorCard";
import Image_Not_Found from "../../images/not-found.png";

import { FlexGrid } from "../styledComponents";

const ActorGrid = ({ data }) => {
  return (
    <FlexGrid>
      {data.map(({ person }) => (
        <ActorCard
          key={person.id}
          name={person.name}
          country={person.country ? person.country : null}
          birthday={person.birthday ? person.birthday : null}
          deathday={person.deathday ? person.deathday : null}
          gender={person.gender}
          image={person.image ? person.image.medium : Image_Not_Found}
        />
      ))}
    </FlexGrid>
  );
};

export default ActorGrid;
