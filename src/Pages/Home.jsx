import React from "react";
import HomePageLayout from "../Components/HomePageLayout";
import { apiGet } from "../misc/config";

const Home = () => {
  const [input, setInput] = React.useState("");
  const [results, setResults] = React.useState(null);

  function handleInputChange(ev) {
    setInput(ev.target.value);
  }

  function handleSearch() {
    apiGet(`/search/shows?q=${input}`).then((result) => {
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
      return results.map((item) => <p key={item.show.id}>{item.show.name}</p>);
  }
  return (
    <HomePageLayout>
      <input
        type="text"
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button onClick={handleSearch}>Search</button>
      {renderResults()}
    </HomePageLayout>
  );
};

export default Home;
