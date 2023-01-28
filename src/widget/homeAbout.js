import { Component, StrictMode } from "react";
import { Header1, Header2 } from "./widget";
import "../style/hdb.css";

const pTitles = ["All About"];

export default class HomeAbout extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0 };
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page } = state;
    const titleL = page === 0 ? "ABOUT US" : "PARTNERS";

    return (
      <StrictMode>
        <Header1 title="ABOUT" bodyL={titleL} />
        <Header2 titles={pTitles} page={page} setState={setState} />
      </StrictMode>
    );
  }
}
