import React from "react";
import { Link } from "react-router-dom";

import { ProSearchCard } from "./showCardStyled";

const ShowCard = ({ id, image, name, summary }) => {
  //getting first 10 words from the summary and replacing html tags using regular expression
  const summaryAsText = summary
    ? `${summary.split(" ").slice(0, 10).join(" ").replace(/<.+?>/g, "")}...`
    : "No description";

  return (
    <ProSearchCard>
      <div class="img-wrapper">
        <img src={image} alt="show" />
      </div>

      <h1>{name}</h1>

      <p>{summaryAsText}</p>

      <div className="btns">
        <Link to={`/show/${id}`}>Read more</Link>
        <button type="button">Star me</button>
      </div>
    </ProSearchCard>
  );
};

export default ShowCard;