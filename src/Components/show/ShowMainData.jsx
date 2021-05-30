import React from "react";
import IMG_PLACEHOLDER from "../../images/not-found.png";
import { Star } from "../styledComponents";
import { Headline, MainDataWrapper, TagList } from "./ShowMainData.Styled";

const ShowMainData = ({ name, rating, summary, tags, image }) => {
  return (
    <MainDataWrapper>
      <img src={image ? image.original : IMG_PLACEHOLDER} alt="show-cover" />
      <div className="text-side">
        <Headline>
          <h1>{name}</h1>
          <div>
            <Star active />
            <span>{rating.average || "N/A"}</span>
          </div>
        </Headline>
        {/* to set the data having html tags already in it to be processed as html */}
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        />

        <TagList>
          Tags:
          <div>
            {tags.map((tag, i) => (
              <span key={i}>{tag} </span>
            ))}
          </div>
        </TagList>
      </div>
    </MainDataWrapper>
  );
};

export default ShowMainData;
