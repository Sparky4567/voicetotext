import React, { Component } from "react";

class AreaComp extends Component {
  constructor(props) {
    super(props);
    this.textareaStyle = {
      rowCount: 18,
    };
    this.textareaStyleWidth = {
      width: 100 + `%`,
    };
  }

  render() {
    return (
      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 my-4 mx-auto">
        <textarea
          id="textOutput"
          rows={this.textareaStyle.rowCount}
          className="form-control form-control-lg"
          style={this.textareaStyleWidth}
        ></textarea>
      </div>
    );
  }
}

export default AreaComp;
