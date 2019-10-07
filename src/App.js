import React from "react";
import "./App.css";
import { data, VN_HEADER, EN_HEADER, EN_TABS, VN_TABS } from "./soulutionsData";
// function App() {
//   return (
//     <div className="App">

//     </div>
//   );
// }
export default class App extends React.Component {
  constructor(props) {
    super(props);
    var ENContents = [];
    // data.map(content => {
    //   if (content.VN !== "1") {
    //     ENContents.push(content);
    //   }
    // });
    this.state = {
      contents: data,
      language: "en"
    };
    debugger;
  }
  componentDidMount() {}

  switchLanguage = () => {
    var currentLanguage = this.state.language;
    if (currentLanguage === "en") {
      this.setState({
        ...this.state,
        language: "vn"
      });
    } else {
      this.setState({
        ...this.state,
        language: "en"
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
              <a href={e.URLcompany}>{e.companyEN}</a>

              <br />
              {e.fullName}
              <br />
              {e.Position}
              <br />
              {e.Email}
            </td>
          </tr>
        );
      });
    } else {
      contents.map((e, index) => {
        result.push(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <a href={e.URLSolutions}>{e.solutionVN}</a>
            </td>
            <td>{e.descriptionVN}</td>
            <td>{e.targetclientsVN}</td>

            <td>
              <a href={e.URLcompany}>{e.companyVN}</a>
              <br />
              {e.fullName}
              <br />
              {e.Position}
              <br />
              {e.Email}
            </td>
          </tr>
        );
      });
    }
    return result;
  };

  filterByTab = value => {
    if (value === "ALL" || value === "TẤT CẢ") {
      this.setState({
        ...this.state,
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
        } else {
          otherResult.push(solution);
        }
      });
      this.setState({
        ...this.state,
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
      <div
        className="vnito-container"
        style={{ maxWidth: "1140px", margin: "auto" }}
      >
        <div className="btn-group">{this.getTabs(this.filterByTab)}</div>
        <div className="btn-group">
          <button className="btn btn-language" onClick={this.switchLanguage}>
            English
          </button>
          <button className="btn btn-language" onClick={this.switchLanguage}>
            Việt Nam
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table border="1" className="responstable" style={{width: "100%"}}>
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
