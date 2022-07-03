import React, { Component } from "react";
import AreaComp from "./areacomp";
import VoiceRecocomponent from "./voicerecocomponent";
class MainComp extends Component {
  constructor(props) {
    super(props);
    this.obset = {
      text: "Mounted",
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container-fluid">
        <div className="row py-4">
          <VoiceRecocomponent />
          <AreaComp />
        </div>
      </div>
    );
  }
}

export default MainComp;
