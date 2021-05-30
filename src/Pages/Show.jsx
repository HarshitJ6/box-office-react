import React from "react";
import { useParams } from "react-router-dom";
import Cast from "../Components/show/Cast";
import Seasons from "../Components/show/Seasons";
import Details from "../Components/show/Details";
import ShowMainData from "../Components/show/ShowMainData";
import { ShowPageWrapper, InfoBlock } from "./Show.styled";
import { useShow } from "../misc/customHook";

const Show = () => {
  const { id } = useParams();
  const [{ show, isLoading, error }] = useShow(id);
  if (isLoading) {
    return <div>DATA IS BEING LOADED</div>;
  }
  if (error) {
    return <div>ERROR OCCURED {error}</div>;
  }
  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.episodes} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
