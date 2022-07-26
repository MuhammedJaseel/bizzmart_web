import React, { Component } from "react";
import { teamMembers, teamPartners } from "../module/dummydata";
import { MyTable1, MyTableCounter1 } from "./widget_table";
import { Header1, Header2, Header4 } from "./widget";
import { HeaderButtens1, TitleFilter1 } from "./widget";
import "../style/hdb.css";
import { getAllMembers, getAllPartners } from "../method/home_team";

const pTitles = ["Team Members", "Partners"];
const titles = {
  title: [`Team List`, `Partners List`],
  titleAdd: [`Team List`, `Partners List`],
  desc: [
    `Shows all the team members recorded against your business`,
    `Shows all the partners recorded against your business`,
  ],
};

const heads0 = [
  null,
  "Name",
  "Code",
  "JoiningDate",
  "PhoneNumber",
  "Email",
  "SystemUser",
  "Status",
];
const heads1 = [
  null,
  "Name",
  "JoiningDate",
  "PhoneNumber",
  "Email",
  "Status",
  "Actions",
];

const statDot = (v) => <div className={"hprA_" + v} />;

export default class HomeTeam extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      allTeamMember: [],
      allTeamPartner: [],
    };
  }

  componentDidMount() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    getAllMembers(state, setState);
    getAllPartners(state, setState);
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page, addPage } = state;

    const filterBody = {
      searchPh: "Search " + (page === 0 ? "team members" : "partners"),
      noDate: true,
    };
    const filter = !addPage ? <TitleFilter1 props={filterBody} /> : null;
    const titleL = page === 0 ? "TEAM LIST" : "PARTNERS";
    const bodyRBody = {
      makeAd: () => setState({ addPage: true }),
      title: page === 0 ? "+ NEW EMPLOYEE" : "+ ADD PARTNER",
      drowelList:
        page === 0
          ? [
              { title: "New Employee", fun: () => alert() },
              { title: "Payslip", fun: () => alert() },
              { title: "Payrun", fun: () => alert() },
              { title: "Paytoll Advance", fun: () => alert() },
            ]
          : [],
    };
    const bodyR = <HeaderButtens1 props={bodyRBody} />;

    return (
      <React.StrictMode>
        <Header1 title="TEAM" bodyL={titleL} bodyR={bodyR} />
        <Header2 titles={pTitles} page={page} setState={setState} />
        <Header4
          title={titles.title[page]}
          desc={titles.desc[page]}
          body={filter}
        />
        <HomeTeamMembersTable state={state} setState={setState} />
        <HomeTeamPartnersTable state={state} setState={setState} />
        <HomeTeamMembersForm state={state} setState={setState} />
        <HomeTeamPartnersForm state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomeTeamMembersTable({ state, setState }) {
  const { page, addPage, allTeamMember } = state;

  const widths = [
    { width: 4 },
    { width: 22 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 15 },
    { width: 10 },
    { width: 8 },
  ];
  const body = [];
  if (allTeamMember !== null)
    for (let i = 0; i < allTeamMember.length; i++) {
      const it = allTeamMember[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name },
        { data: it.code, type: 2 },
        { data: it.joiningDate },
        { data: it.phoneNumber },
        { data: it.email },
        { data: [statDot(it.systemUser === "NO" ? "r" : "g"), it.systemUser] },
        {
          data: [statDot(it.status === "ACTIVE" ? "g" : "r"), it.status],
          type: 2,
        },
      ]);
    }
  if (page !== 0 || addPage) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads0} body={body} />
      <MyTableCounter1 props={{ total: 100 }} />
    </React.StrictMode>
  );
}
function HomeTeamPartnersTable({ state, setState }) {
  const { page, addPage, allTeamPartner } = state;

  const widths = [
    { width: 4 },
    { width: 25 },
    { width: 15 },
    { width: 15 },
    { width: 20 },
    { width: 18 },
    { width: 8 },
  ];
  const body = [];
  if (allTeamPartner !== null)
    for (let i = 0; i < allTeamPartner.length; i++) {
      const it = allTeamPartner[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name },
        { data: it.joiningDate },
        { data: it.phone },
        { data: it.email },
        {
          data: [statDot(it.status === "ACTIVE" ? "g" : "r"), it.status],
          type: 2,
        },
        { data: it.actions },
      ]);
    }
  if (page !== 1 || addPage) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads1} body={body} />
      <MyTableCounter1 props={{ total: 100 }} />
    </React.StrictMode>
  );
}

function HomeTeamMembersForm({ state, setState }) {
  const { page, addPage } = state;
  if (page !== 0 || !addPage) return null;
  return <React.StrictMode></React.StrictMode>;
}
function HomeTeamPartnersForm({ state, setState }) {
  const { page, addPage } = state;
  if (page !== 1 || !addPage) return null;
  return <React.StrictMode></React.StrictMode>;
}
