import React, { Component } from "react";
import ReactDOM from "react-dom";

export const overlayContext = React.createContext();

class FullScreenOverlay extends Component {
  constructor(props) {
    super(props);
    // this.divEl = document.createElement("section");
  }

  render() {
    return ReactDOM.createPortal(
      <section className="FullScreenOverlay d-flex justify-content-center flex-column">
        <section className="FullScreenOverlay-content p-2">
          {this.props.children}
        </section>
      </section>,
      document.getElementById("root")
    );
  }
}

// FullScreenOverlay.propTypes = propTypes;
// FullScreenOverlay.defaultProps = defaultProps;

export default FullScreenOverlay;
