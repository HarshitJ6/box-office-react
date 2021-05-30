import React, { useState, useEffect } from "react";
import HomePageLayout from "../Components/HomePageLayout";
import ShowGrid from "../Components/show/ShowGrid";
import { apiGet } from "../misc/config";
import { useShows } from "../misc/customHook";

const Starred = () => {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const Promises = starred.map((showId) => apiGet(`/shows/${showId}`));
      Promise.all(Promises)
        .then((apidata) => apidata.map((show) => ({ show })))
        .then((results) => {
          setShows(results);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <HomePageLayout>
      {isLoading && <div>DATA IS BEING LOADED</div>}
      {error && <div>ERROR : {error} </div>}
      {!isLoading && !shows && <div>NO SHOWS WERE ADDED</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </HomePageLayout>
  );
};

export default Starred;
