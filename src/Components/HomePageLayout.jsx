import React from "react";
import Navs from "./Navs";
import Title from "./Title";

const HomePageLayout = ({ children }) => {
  return (
    <div>
      <Title
        title="BOX OFFICE"
        subtitle="Are you looking for an actor or a show"
      />
      <Navs />

      {children}
    </div>
  );
};

export default HomePageLayout;
