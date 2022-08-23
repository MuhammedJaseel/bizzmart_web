import React, { Component, StrictMode } from "react";
import { MyTable1, MyTableCounter1 } from "./widget_table";
import { Header1, Header2, Header4 } from "./widget";
import { HeaderButtens1, TitleFilter1 } from "./widget";
import {
  deletePartner,
  getAllMembers,
  getAllPartners,
  postMember,
  postPartner,
  updatedPartner,
} from "../method/home_team";
import { teamHeads0, teamHeads1 } from "../module/home_team";
import { teamPTitles, teamTitles } from "../module/home_team";
import { DrawerForm1 } from "./widget_form";
import {
  WidgetConfirmPopup,
  WidgetPopUp1,
  WidgetPopUp1Body,
} from "./widget_popup";
import { WidgetPopUp1In1 } from "./widget_popup";
import "../style/htm.css";
import {
  HomeTeamPayAdpancePop,
  HomeTeamPayRoll,
  HomeTeamPaySlip,
} from "./home_team1";

const pTitles = teamPTitles;
const titles = teamTitles;
const heads0 = teamHeads0;
const heads1 = teamHeads1;

const statDot = (v) => <div className={"hprA_" + v} />;

export default class HomeTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      loading: false,
      error: null,
      addPage: false,
      isEdit: false,
      allMember: [],
      allPartner: [],
      member: null,
      addMember: {},
      addPartner: {},
      payrollAdvance: null,
      succesPop: props.succesPop,
      deletePartnerConfirmPop: null,
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
      makeAdd: () => setState({ addPage: true }),
      title: page === 0 ? "+ NEW EMPLOYEE" : "+ ADD PARTNER",
      drowelList:
        page === 0
          ? [
              { title: "New Employee", fun: () => setState({ addPage: true }) },
              { title: "Payslip", fun: () => setState({ page: 2 }) },
              { title: "Payrun", fun: () => setState({ page: 3 }) },
              {
                title: "Paytoll Advance",
                fun: () => setState({ payrollAdvance: {} }),
              },
            ]
          : null,
    };
    const bodyR = <HeaderButtens1 props={bodyRBody} />;

    return (
      <React.StrictMode>
        {page === 0 || page === 1 ? (
          <StrictMode>
            <Header1 title="TEAM" bodyL={titleL} bodyR={bodyR} />
            <Header2
              titles={pTitles}
              page={page}
              onTap={(k) => setState({ page: k, addPage: false })}
            />
            <Header4
              title={titles.title[page]}
              desc={titles.desc[page]}
              body={filter}
            />
          </StrictMode>
        ) : null}
        <HomeTeamMembersTable state={state} setState={setState} />
        <HomeTeamPartnersTable state={state} setState={setState} />
        <HomeTeamMembersForm state={state} setState={setState} />
        <HomeTeamPartnersForm state={state} setState={setState} />
        <HomeTeamPaySlip state={state} setState={setState} />
        <HomeTeamPayRoll state={state} setState={setState} />
        <HomeTeamPayAdpancePop state={state} setState={setState} />
        <WidgetConfirmPopup props={state.deletePartnerConfirmPop} />
      </React.StrictMode>
    );
  }
}

function HomeTeamMembersTable({ state, setState }) {
  const { page, allMember } = state;

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
  if (allMember !== null)
    for (let i = 0; i < allMember.length; i++) {
      const it = allMember[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name },
        { data: it.code, type: 2 },
        { data: it.joindate },
        { data: it.phone },
        { data: it.email },
        { data: [statDot(it.systemUser === "NO" ? "r" : "g"), it.systemUser] },
        {
          data: [statDot(it.status === "ACTIVE" ? "g" : "r"), it.status],
          type: 2,
        },
      ]);
    }
  if (page !== 0) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads0} body={body} />
      <MyTableCounter1 props={{ total: 100 }} />
    </React.StrictMode>
  );
}
function HomeTeamPartnersTable({ state, setState }) {
  const { page, allPartner, error, loading } = state;

  const widths = [
    { width: 4 },
    { width: 25 },
    { width: 15 },
    { width: 15 },
    { width: 20 },
    { width: 18 },
    { width: 8 },
  ];

  const setStatClass = (it) => {
    if (!loading && it.status === "ACTIVE") return "htmCa";
    if (!loading && it.status === "PENDING") return "htmCc";
    return "htmCb";
  };
  const onClickStatus = (it) => {
    if (it.status !== "PENDING") updatedPartner(it, state, setState);
  };

  const onClickDelete = (it) =>
    setState({
      deletePartnerConfirmPop: {
        error,
        loading,
        desc: "Are you sure you want to delate this Partner",
        close: () => setState({ deletePartnerConfirmPop: null }),
        onSubmit: () => deletePartner(it.id, state, setState),
      },
    });

  const body = [];
  if (allPartner !== null)
    for (let i = 0; i < allPartner.length; i++) {
      const it = allPartner[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name },
        { data: it.joindate },
        { data: it.phone },
        { data: it.email },
        {
          data: [
            statDot(
              it.status === "ACTIVE" ? "g" : it.status === "PENDING" ? "o" : "r"
            ),
            it.status,
          ],
          type: 2,
        },
        {
          data: (
            <div className="htmC">
              <div
                className={setStatClass(it)}
                onClick={() => onClickStatus(it)}
              />
              <div className="htmCd" onClick={() => onClickDelete(it)} />
            </div>
          ),
        },
      ]);
    }
  if (page !== 1) return null;
  return (
    <React.StrictMode>
      <MyTable1
        widths={widths}
        heads={heads1}
        body={body}
        onclick={
          (v) => {}
          // setState({ isEdit: true, addPage: true, addPartner: allPartner[v] })
        }
      />
      <MyTableCounter1 props={{ total: 100 }} />
    </React.StrictMode>
  );
}

function HomeTeamMembersForm({ state, setState }) {
  const { loading, error, page, addPage, addMember } = state;
  const body = {
    title: "NEW TEAM MEMBER",
    show: page === 0 && addPage,
    close: () => setState({ addPage: false }),
    submit: () => postMember(addMember, state, setState),
    loading,
    error,
    type: "member",
  };
  return (
    <form onChange={(e) => (addMember[e.target.id] = e.target.value)}>
      <DrawerForm1 props={body} />
    </form>
  );
}

function HomeTeamPartnersForm({ state, setState }) {
  const { loading, page, addPage, error, addPartner, isEdit } = state;
  const popProps = {
    title: isEdit ? addPartner.name : "Add Partner",
    desc: "Add and invite a partner for accessing bizzWorks dashboard app",
    btnTitle: isEdit ? "UPDATE PARTNER" : "ADD PARTNER",
    close: () => setState({ addPage: false, addPartner: {}, isEdit: false }),
    submit: () => postPartner(state, setState),
    error,
    loading,
  };
  if (page !== 1 || !addPage) return null;
  return (
    <form
      onChange={(e) => {
        addPartner[e.target.id] = e.target.value;
        setState({ addPartner });
      }}
    >
      <WidgetPopUp1 props={popProps}>
        <WidgetPopUp1Body>
          <WidgetPopUp1In1 title={"Partner Name*"}>
            <input
              className="htmA"
              placeholder="Enter partner’s full name"
              id="name"
              defaultValue={addPartner.name}
            />
          </WidgetPopUp1In1>
          <WidgetPopUp1In1 title={"Mobile Number*"}>
            <input
              className="htmA"
              placeholder="Partner’s 10 digit mobile number"
              type="number"
              id="phone"
              defaultValue={addPartner.phone}
            />
          </WidgetPopUp1In1>
          <WidgetPopUp1In1 title={"Email Address"}>
            <input
              className="htmA"
              placeholder="Partner’s mail ID"
              type="email"
              id="email"
              defaultValue={addPartner.email}
            />
          </WidgetPopUp1In1>
        </WidgetPopUp1Body>
        <WidgetPopUp1Body>
          <WidgetPopUp1In1 title={"How to access dashboard?"}>
            <div className="htmB">
              <div className="htmBa">01</div>
              Download bizzWorks Dashboard from Playstore or Appstore
              <div className="htmBa">02</div>
              Register using the 10 digit mobile number used here
              <div className="htmBa">03</div>Set a custom password while
              registering bizzWorks
            </div>
          </WidgetPopUp1In1>
        </WidgetPopUp1Body>
      </WidgetPopUp1>
    </form>
  );
}
