import React from "react";
import ActorGrid from "../Components/actor/ActorGrid";
import HomePageLayout from "../Components/HomePageLayout";
import ShowGrid from "../Components/show/ShowGrid";
import { apiGet } from "../misc/config";

const Home = () => {
  const [input, setInput] = React.useState("");
  const [results, setResults] = React.useState(null);
  const [searchOption, setSearchOption] = React.useState("shows");
  const isShows = searchOption === "shows";

  function handleRadioChange(ev) {
    setSearchOption(ev.target.value);
    console.log(ev.target.value);
  }

  function handleInputChange(ev) {
    setInput(ev.target.value);
  }

  function handleSearch() {
    apiGet(`/search/${searchOption}?q=${input}`).then((result) => {
      setResults(result);
    });
  }

  function onKeyDown(ev) {
    //mapping enter key to the input element so that enter fires search button
    //www.keycode.info
    if (ev.keyCode === 13) handleSearch();
  }

  function renderResults() {
    if (results && results.length === 0) return <div> Nothing Found </div>;
    if (results && results.length > 0)
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
  }
  return (
    <HomePageLayout>
      <input
        type="text"
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        value={input}
        placeholder="search for something"
      />

      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            type="radio"
            id="shows-search"
            value="shows"
            onChange={handleRadioChange}
            checked={isShows}
          />
        </label>

        <label htmlFor="actors-search">
          Actors
          <input
            type="radio"
            id="actors-search"
            value="people"
            onChange={handleRadioChange}
            checked={!isShows}
          />
        </label>
      </div>

      <button onClick={handleSearch}>Search</button>
      {renderResults()}
    </HomePageLayout>
  );
};

export default Home;
