import React from "react";
import Octicon, { ThreeBars } from "@primer/octicons-react";
import Dropdown from "../Dropdown/Dropdown";

const BrowseCard = ({ song }) => {
  return (
    <div className="BrowseCard card text-white bg-dark">
      <img
        className="card-img-top"
        src="https://i.imgur.com/nvK2vj3.png"
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{song.title}</h5>
        <p className="card-text"> {song.artist}</p>
        <p className="card-text">
          <small className="text-white">{song.album}</small>
        </p>
      </div>
      <div className="d-flex justify-content-end">
        {/* <Octicon icon={ThreeBars} size="medium" verticalAlign="middle" /> */}
        <Dropdown />
      </div>
    </div>
  );
};

export default BrowseCard;
