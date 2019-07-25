import React, { useRef, useState } from "react";
import BrowseCard from "../../components/BrowseCard/BrowseCard";
import Octicon, { Search } from "@primer/octicons-react";

const defaultProps = {
  library: {
    "-1": {
      title: "",
      id: -1,
      artist: "",
      album: "",
      duration: -1
    }
  }
};

const filterEnums = {
  ARTIST: "ARTIST",
  TITLE: "TITLE",
  ALBUM: "ALBUM"
};

const MainDisplayContainer = ({ library }) => {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState(filterEnums.TITLE);
  const searchRef = useRef();

  const onFilter = evt => {
    if (evt.key === "Enter") {
      triggerFilter();
    }
  };
  const triggerFilter = () => {
    // console.log(searchRef.current.value);
    setSearchText(searchRef.current.value.toLowerCase());
  };

  const runFilterRender = () => {
    let searchedResult = Object.values(library).filter(song => {
      return (
        song.title.toLowerCase().includes(searchText) ||
        song.artist.toLowerCase().includes(searchText) ||
        song.album.toLowerCase().includes(searchText)
      );
    });
    if (filter && searchedResult.length > 0) {
      let filtered;
      switch (filter) {
        case filterEnums.ARTIST:
          filtered = searchedResult.sort((a, b) => {
            return a.artist < b.artist ? -1 : 1;
          });
          break;
        case filterEnums.TITLE:
          filtered = searchedResult.sort((a, b) => {
            return a.title < b.title ? -1 : 1;
          });
          break;
        case filterEnums.ALBUM:
          filtered = searchedResult.sort((a, b) => {
            return a.album < b.album ? -1 : 1;
          });
          break;
        default:
          return searchedResult.map((song, idx) => {
            return <BrowseCard key={idx} song={song} />;
          });
      }
      return filtered.map((song, idx) => {
        return <BrowseCard key={idx} song={song} />;
      });
    } else {
      return searchedResult.map((song, idx) => {
        return <BrowseCard key={idx} song={song} />;
      });
    }
  };

  const onFilterChange = evt => {
    setFilter(evt.currentTarget.innerHTML);
  };

  return (
    <section className="MaindisplayContainer d-flex flex-grow-1 flex-column">
      <nav className="m-3">
        <h1>Browse</h1>
        <section className="SearchBar">
          {/* <input
            onInput={onSearch}
            ref={searchRef}
            type="search"
            placeholder="Filter for songs"
          /> */}
          <div className="input-group mb-3">
            <input
              onKeyUp={onFilter}
              ref={searchRef}
              type="search"
              className="form-control"
              placeholder="Filter for songs"
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <Octicon icon={Search} />
              </span>
            </div>
          </div>
        </section>
        <section className="FilterBar d-flex">
          <p>Sort by</p>
          <ul
            className="noselect"
            style={{ listStyle: "none", display: "flex" }}
          >
            <li
              className={filter === filterEnums.ARTIST ? "active" : ""}
              onClick={onFilterChange}
              value={filterEnums.ARTIST}
            >
              {filterEnums.ARTIST}
            </li>
            <li
              className={filter === filterEnums.TITLE ? "active" : ""}
              onClick={onFilterChange}
            >
              {filterEnums.TITLE}
            </li>
            <li
              className={filter === filterEnums.ALBUM ? "active" : ""}
              onClick={onFilterChange}
            >
              {filterEnums.ALBUM}
            </li>
          </ul>
        </section>
      </nav>
      <section className="LibraryContainer d-flex flex-wrap align-items-center justify-content-center flex-grow-1">
        {library ? runFilterRender() : <span />}
      </section>
    </section>
  );
};

MainDisplayContainer.defaultProps = defaultProps;
export default MainDisplayContainer;
