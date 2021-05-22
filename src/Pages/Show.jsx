import React from "react";
import { useParams } from "react-router-dom";
import Cast from "../Components/show/Cast";
import Seasons from "../Components/show/Seasons";
import Details from "../Components/show/Details";
import ShowMainData from "../Components/show/ShowMainData";
import { apiGet } from "../misc/config";

const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return { isLoading: false, error: null, show: action.show };
    }
    case "FETCH_FAILED": {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

const InitialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();
  // const [show, setShow] = React.useState(null);
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [error, setError] = React.useState(null);

  const [{ show, isLoading, error }, dispatch] = React.useReducer(
    reducer,
    InitialState
  );
  console.log(show);
  React.useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=episodes&embed[]=cast`)
      .then((results) => {
        if (isMounted) {
          dispatch({ type: "FETCH_SUCCESS", show: results });

          // setShow(results);
          // setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          dispatch({ type: "FETCH_FAILED", error: err.message });

          // setError(err.message);
          // setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <div>DATA IS BEING LOADED</div>;
  }
  if (error) {
    return <div>ERROR OCCURED {error}</div>;
  }
  return (
    <div>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <div>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </div>

      <div>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.episodes} />
      </div>

      <div>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </div>
    </div>
  );
};

export default Show;
