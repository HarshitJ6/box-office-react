import React from "react";

const Seasons = ({ seasons }) => {
  return (
    <div>
      <p>
        Seasons in total: <span>{seasons.length}</span>
      </p>
      <p>
        Episodes in total:
        <span>{seasons.reduce((acc, season) => acc + season.number, 0)}</span>
      </p>
      <div>
        {seasons.map((season) => (
          <div key={season.id}>
            <div>
              <p>Season {season.season}</p>
              <p>
                Episodes: <span>{season.number}</span>
              </p>
            </div>
            <div>
              Aired:
              <span>{season.airdate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seasons;
