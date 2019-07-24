import React, { Component } from "react";
import ReactDOM from "react-dom";

export const overlayContext = React.createContext();

class FullScreenOverlay extends Component {
  render() {
    return ReactDOM.createPortal(
      <section className="FullScreenOverlay d-flex active justify-content-center flex-column">
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
