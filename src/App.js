import React from "react";
import "./styles/index.css";
import { data, VN_HEADER, EN_HEADER, EN_TABS, VN_TABS } from "./soulutionsData";

const mailIcon = require("./imgs/mail.png");
export default class App extends React.Component {
  constructor(props) {
    super(props);
    var ENContents = [];

    this.state = {
      contents: data,
      language: "en",
      active: "ALL"
    };
  }
  componentDidMount() {}

  switchLanguage = language => {
    var currentLanguage = this.state.language;
    var curretnTab = this.state.active;
    var newTab = "";
    if (language === "vn") {
      var indexof = EN_TABS.indexOf(curretnTab);
      newTab = VN_TABS[indexof];
    } else {
      var indexof = VN_TABS.indexOf(curretnTab);
      newTab = EN_TABS[indexof];
    }
  
    if (language !== currentLanguage) {
      this.filterByTab(newTab);
      this.setState({
        ...this.state,
        language: language,
        active: newTab
      });
    }
  };
  getHeader = () => {
    var result = [];
    var header = EN_HEADER;
    var { language } = this.state;
    if (language === "vn") {
      header = VN_HEADER;
    }
    header.map((title, index) => {
      result.push(<th key={`head-${index}`}>{title}</th>);
    });
    return result;
  };
  x;

  getTabs = btnOnClick => {
    var { language } = this.state;
    var result = [];
    var tabs = EN_TABS;
    if (language === "vn") {
      tabs = VN_TABS;
    }
    tabs.map((tab, i) => {
      result.push(
        <button
          className={`btn-tab ${
            tab === this.state.active ? "btn-tab-active" : ""
          }`}
          onClick={() => {
            btnOnClick(tab);
          }}
          key={i}
        >
          {tab}
        </button>
      );
    });
    return result;
  };

  getRow = language => {
    var { contents } = this.state;
    var result = [];
    if (language === "en") {
      contents.map((e, index) => {
        result.push(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <a href={e.URLSolutions}>{e.solutionEN}</a>
            </td>
            <td>{e.descriptionEN}</td>
            <td>{e.targetclientsEN}</td>

            <td>
              <p>
                {" "}
                <a href={e.URLcompany}>{e.companyEN}</a>
              </p>

              <p> {e.fullName}</p>
              <p> {e.Position} </p>

              <p>
                <img style={{ width: "15px", height: "15px" }} src={mailIcon} />
                <span> {e.Email}</span>
              </p>
            </td>
          </tr>
        );
      });
    } else {
      contents.map((e, index) => {
        if (e.VN === "1") {
          result.push(
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <a href={e.URLSolutions}>{e.solutionVN}</a>
              </td>
              <td>{e.descriptionVN}</td>
              <td>{e.targetclientsVN}</td>

              <td>
                <p>
                  {" "}
                  <a href={e.URLcompany}>{e.companyVN}</a>
                </p>
                <p> {e.fullName}</p>
                <p> {e.Position}</p>

                <p>
                  <img
                    style={{ width: "15px", height: "15px" }}
                    src={mailIcon}
                  />
                  <span> {e.Email}</span>
                </p>
              </td>
            </tr>
          );
        }
      });
    }
    var count =  result.length;
    console.log("Count: "+ count);
    return result;
    
  };

  filterByTab = value => {
    if (value === "ALL" || value === "TẤT CẢ") {
      this.setState({
        ...this.state,
        active: value,
        contents: Object.assign([], data)
      });
    } else {
      value = value.toUpperCase();
      var { language } = this.state;
      var result = [];
      var otherResult = [];
      data.map(solution => {
        if (
          solution.industryEN.toUpperCase().includes(value) &&
          language === "en"
        ) {
          result.push(solution);
        } else if (
          solution.industryVN.toUpperCase().includes(value) &&
          language === "vn"
        ) {
          result.push(solution);
          console.log("RESULT:", result);
        } else {
          otherResult.push(solution);
        }
      });
      this.setState({
        ...this.state,
        active: value,
        contents:
          value === "other" || value === "khác"
            ? Object.assign([], otherResult)
            : Object.assign([], result)
      });
    }
  };

  render() {
    const { contents, language } = this.state;
    return (
      <div className="vnito-container">
        <div className="toolbar">
          <div
            className="btn-group-left"
            style={{ paddingLeft: "15px", paddingRight: "15px" }}
          >
            {this.getTabs(this.filterByTab)}
          </div>
          <div className="btn-group-right" style={{ display: "flex" }}>
            <button
              className={`btn-language ${
                language === "en" ? "btn-language-active" : ""
              }`}
              onClick={() => {
                this.switchLanguage("en");
              }}
            >
              English
            </button>
            <button
              className={`btn-language ${
                language === "vn" ? "btn-language-active" : ""
              }`}
              onClick={() => {
                this.switchLanguage("vn");
              }}
            >
              Vietnamese
            </button>
          </div>
        </div>

        <div
          style={{ minWidth: "900px", maxHeight: "100vh", overflowY: "auto" }}
        >
       
          <table className="responstable">
            <thead>
              <tr>{this.getHeader()}</tr>
            </thead>
            <tbody>{this.getRow(language)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
