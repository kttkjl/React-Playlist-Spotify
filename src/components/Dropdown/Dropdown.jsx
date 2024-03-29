import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Octicon, { ThreeBars } from "@primer/octicons-react";

const propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      menuAction: PropTypes.func,
      menuTag: PropTypes.string
    })
  )
};

const defaultProps = {
  menuItems: [
    {
      menuAction: () => {
        console.log("fake1");
      },
      menuTag: "fake action"
    }
  ]
};

const Dropdown = ({ menuItems }) => {
  let [triggered, setTriggered] = useState(false);

  useEffect(() => {
    // console.log("effect triggered", triggered);
    if (triggered) {
      document.addEventListener("click", closeMenu);
    }
    return () => {
      document.removeEventListener("click", closeMenu);
      // console.log("cleanup");
    };
  }, [triggered]);

  const openMenu = evt => {
    evt.stopPropagation();

    setTriggered(true);
  };

  const closeMenu = evt => {
    evt.stopPropagation();
    setTriggered(false);
    // console.log("closed");
  };

  return (
    <section className="Dropdown-container" onClick={openMenu}>
      <div className="Dropdown-trigger">
        <Octicon icon={ThreeBars} size="small" />
      </div>
      {triggered ? (
        <div className="Dropdown-menu d-flex flex-column">
          {menuItems.map((item, idx) => {
            return (
              <button
                key={idx}
                className="Dropdown-item"
                onClick={item.menuAction}
              >
                <small>{item.menuTag}</small>
              </button>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
export default Dropdown;
