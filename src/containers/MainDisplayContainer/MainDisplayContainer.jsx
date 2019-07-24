import React, { useContext } from "react";
import BrowseCard from "../../components/BrowseCard/BrowseCard";
import { playListContext } from "../../App";

const MainDisplayContainer = ({ library }) => {
  const plCont = useContext(playListContext);

  return (
    <section className="MaindisplayContainer d-flex flex-grow-1 flex-column">
      <nav>
        <h1>Browse</h1>
        <section className="SearchBar">
          <input type="text" />
        </section>
        <section className="FilterBar d-flex">
          <p>Filter by</p>
          <ul style={{ listStyle: "none", display: "flex" }}>
            <li>Artist</li>
            <li>Name</li>
            <li>Date</li>
            <li>Duration</li>
          </ul>
        </section>
        <button
          onClick={() => {
            plCont.clearPlaylists();
          }}
        >
          KILL
        </button>
      </nav>
      <section className="LibraryContainer d-flex flex-wrap justify-content-sm-center flex-shrink-1">
        {library ? (
          Object.values(library).map((song, idx) => {
            return <BrowseCard key={idx} song={song} />;
          })
        ) : (
          <span />
        )}
      </section>
    </section>
  );
};

export default MainDisplayContainer;
