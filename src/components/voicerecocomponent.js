import React, { Component } from "react";

class VoiceRecocomponent extends Component {
  constructor(props) {
    super(props);
    this.corderStyle = {
      width: 80 + `px`,
      height: 80 + `px`,
      borderRadius: 80 + `px`,
    };
    this.state = {
      activeClass: "btn-dark",
      recognition: false,
      recognitionVariable: null,
      recordingStatus: `Nieko nevyksta`,
      defaultLanguage: `lt-LT`,
    };
    this.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.reco = new this.SpeechRecognition();
    this.langMap = [
      {
        languageName: "Lietuvių",
        languageCode: "lt-LT",
      },
      {
        languageName: "Anglų",
        languageCode: "en-US",
      },
      {
        languageName: "Ukrainiečių",
        languageCode: "uk-UA",
      },
    ];
    this.buttonClick = this.buttonClick.bind(this);
    this.changeCode = this.changeCode.bind(this);
  }

  componentDidMount() {
    window.navigator.mediaDevices.getUserMedia({ audio: true });
  }

  vocabulary(textField, word) {
    word = String(word).toLowerCase().trim();
    let textString = textField.textContent;
    if (String(textString.slice(-2)).includes(".")) {
      word = String(word).charAt(0).toUpperCase() + String(word).slice(1);
    }
    switch (word) {
      case "kablelis" || "comma":
        textField.textContent = textField.textContent + ", ";
        break;
      case "tarpas" || "space":
        textField.textContent = textField.textContent + " ";
        break;
      case "taškas" || "dot":
        textField.textContent = textField.textContent + ". ";
        break;
      default:
        textField.textContent = textField.textContent + ` ${word}`;
        break;
    }
  }

  voiceCorder() {
    const textSelector = document.querySelector("#textOutput");
    this.reco.lang = this.state.defaultLanguage;
    this.reco.continuous = true;
    this.reco.onresult = (e) => {
      for (var i = e.resultIndex; i < e.results.length; i++) {
        let transcript = e.results[i][0].transcript;
        this.vocabulary(textSelector, transcript);
      }
    };
    this.reco.start();
  }

  voiceCorderStop() {
    this.reco.stop();
  }

  buttonClick() {
    if (this.state.activeClass === "btn-dark") {
      this.setState(
        { activeClass: "btn-danger", recordingStatus: `Įrašoma` },
        () => {
          this.voiceCorder();
        }
      );
    } else if (this.state.activeClass === "btn-danger") {
      this.setState(
        { activeClass: "btn-dark", recordingStatus: `Nieko nevyksta` },
        () => {
          this.voiceCorderStop();
        }
      );
    }
  }

  changeCode(passedE) {
    this.setState(
      {
        defaultLanguage: passedE,
      },
      () => {
        this.reco.lang = this.state.defaultLanguage;
      }
    );
  }

  render() {
    return (
      <div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 text-center my-4 mx-auto">
          <select
            className="form-control form-control-lg"
            onChange={(e) => {
              this.voiceCorderStop();
              this.setState({ activeClass: "btn-dark" });
              this.changeCode(e.currentTarget.value);
            }}
          >
            {this.langMap.map((lang, i) => {
              return (
                <option key={i} value={lang.languageCode}>
                  {lang.languageName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center my-4">
          <button
            className={`btn btn-lg ` + this.state.activeClass}
            style={this.corderStyle}
            onClick={this.buttonClick}
          >
            <i className="bi bi-mic-fill"></i>
          </button>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mx-auto my-4">
          <label className="form-control form-control-lg text-center">
            {this.state.recordingStatus}
          </label>
        </div>
      </div>
    );
  }
}

export default VoiceRecocomponent;
