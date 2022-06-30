import React, { Component, StrictMode } from "react";
import { Header1, Header2, Header4, MyTable1 } from "./widget";

const title = "Services List";
const desc = "Shows all the team members recorded against your business";

export default class HomeInService extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      addpage: false,
    };
  }

  componentDidMount() {}

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const {} = state;
    const back = this.props.back;
    return (
      <StrictMode>
        <Header1 title="INVENTORY > PRODUCT MANAGEMET" onclick={back} />
        <Header2 titles={["Service"]} page={0} />
        <Header4 title={title} desc={desc} />
        {/* <MyTable1 /> */}
      </StrictMode>
    );
  }
}
