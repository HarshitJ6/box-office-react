import React from "react";
import ActorGrid from "../Components/actor/ActorGrid";
import CustomRadio from "../Components/CustomRadio";
import HomePageLayout from "../Components/HomePageLayout";
import ShowGrid from "../Components/show/ShowGrid";
import { apiGet } from "../misc/config";
import { useLastQuery } from "../misc/customHook";
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from "./Home.Styled";

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = React.useState(null);
  const [searchOption, setSearchOption] = React.useState("shows");
  let isShows = searchOption === "shows";

  function handleRadioChange(ev) {
    setSearchOption(ev.target.value);
    console.log(ev.target.value + " " + isShows);
  }

  function handleInputChange(ev) {
    setInput(ev.target.value);
    // console.log(ev.target.value);
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
      <SearchInput
        type="text"
        id="shows-search"
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        value={input}
        placeholder="search for something"
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            id="show-search"
            label="Shows"
            checked={isShows}
            onChange={handleRadioChange}
            value="shows"
          />
          {/* <CustomRadio
            label="Shows"
            id="actors-search"
            value="shows"
            onChange={handleRadioChange}
            checked={isShows}
          /> */}
        </div>
        <div>
          <CustomRadio
            id="actors-search"
            label="Actors"
            checked={!isShows}
            onChange={handleRadioChange}
            value="people"
          />
          {/* <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            onChange={handleRadioChange}
            checked={!isShows}
          /> */}
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button onClick={handleSearch}>Search</button>
      </SearchButtonWrapper>
      {renderResults()}
    </HomePageLayout>
  );
};

export default Home;
