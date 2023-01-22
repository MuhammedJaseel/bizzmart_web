import React, { Component, StrictMode, useRef, useState } from "react";
import {
  getAllBranches,
  getAllDistricts,
  getAllStates,
  getFormListes,
  postNewBranch,
} from "../method/branch";
import { onClickUserLogout } from "../method/login";
import "../style/br.css";
import { Input } from "../widget/interface";
import { DrawerLayout1 } from "../widget/widget_form";

export default class BranchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      setScreen: this.props.setScreen,
      allBranches: [],
      addBranch: null,
      allCountry: [],
      allState: [],
      allDistrict: [],
      allIndustryType: [],
      allBusinessType: [],
    };
  }

  componentDidMount() {
    const setState = (v) => this.setState(v);
    getAllBranches(this.state, setState);
  }

  render() {
    const setState = (v) => this.setState(v);
    const { setScreen, allBranches } = this.state;
    return (
      <StrictMode>
        <div className="br_A">
          <div className="br_B">
            <div className="br_C">
              <div className="br_D">
                <div className="br_E" />
                <div className="br_F">bizzWorks</div>
              </div>
              <select className="br_G">
                <option>My Business</option>
              </select>
            </div>
            <div className="br_J">
              {/* <div className="hmAaJ"></div>
              <div className="hmAaM">
                <div className="hmAaO">Help</div>
              </div> */}
              <div className="hmAaQ">
                <img
                  alt="ic"
                  className="hmAaR"
                  // src="https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg"
                  src={window.localStorage.getItem("profilePic")}
                />
                <div
                  className="hmAaQa"
                  onClick={() => onClickUserLogout(this.state)}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
          <div className="br_O">My Branches</div>
          {/* <div className="br_P">
            <select className="br_Q">
              <option>Show: All Branches</option>
            </select>
            <input className="br_R" placeholder="Search Branch" />
          </div> */}

          <div className="br_S">
            <div className="br_T">
              <div className="br_U">BUSSNESS & BRANCH</div>
              <div className="br_W">BRANCH CODE</div>
              <div className="br_W">STATUS</div>
              <div className="br_X">LAST LOGIN</div>
              <div className="br_Y">ONLINE STORE</div>
              <div className="br_Z">PLAN</div>
              <div className="br_Aa">VALID TILL</div>
              <div width={{ minWidth: "20%" }}></div>
            </div>
            {allBranches.map((it, k) => (
              <div key={k} className="br_Ab">
                <div className="br_U brAc" style={{ background: "none" }}>
                  <img className="br_Ad" src={it?.image} alt="LOgo" />
                  <div className="br_Ae">
                    <div className="br_Af">{it?.business_name}</div>
                    <div className="br_Ag">{it.branch_name}</div>
                  </div>
                </div>
                <div className="br_W brAh">{it.branch_code}</div>
                <div className="br_W brAh">{it.status}</div>
                <div className="br_X brAi">{it.last_login_time}</div>
                <div className="br_Y brAj">{it.online_store}</div>
                <div className="br_Z brAk">{it.plan}</div>
                <div className="br_Aa brAl">{it.valied_till}</div>
                <div
                  className="br_Am"
                  onClick={() => {
                    window.localStorage.setItem("branchId", it.branch_id);
                    // window.localStorage.setItem("profilePic", res.image);
                    // window.localStorage.setItem("userName", res.data.phone);
                    // window.localStorage.setItem("userId", res.data.id);
                    // window.localStorage.setItem("address", res.data.address);
                    setScreen("/dashboard");
                  }}
                >
                  VIEW STORE
                </div>
              </div>
            ))}
          </div>
          <div className="br_Ao">
            <div
              className="br_Ap"
              onClick={() => {
                getFormListes(this.state, setState);
                setState({ addBranch: {} });
              }}
            >
              <div className="br_Aq" />
              <div className="br_Ar">Add Branch</div>
            </div>
          </div>
        </div>
        <AddBranchDrower state={this.state} setState={setState} />
      </StrictMode>
    );
  }
}

function AddBranchDrower({ state, setState }) {
  const { error, addBranch, loading } = state;
  const { allCountry, allState, allDistrict } = state;
  const { allIndustryType, allBusinessType } = state;
  const refForKey = useRef(null);
  const [selected, setSelected] = useState(0);

  const body = (
    <form
      onChange={(e) => {
        addBranch[e.target.id] = e.target.value;
        setState(addBranch);
      }}
    >
      <div className="brCa">
        <div className="brCaA">ADD BRANCH</div>
        <div className="brCaB" onClick={() => setState({ addBranch: null })} />
      </div>
      <div className="brCb">
        <div className="brCbA">
          <div className="brCbAa">
            {addBranch?.image !== undefined ? (
              <img
                className="brCbAaA"
                src={URL.createObjectURL(addBranch.image)}
              />
            ) : (
              <div className="brCbAaA" />
            )}
            <div className="brCbAaB" onClick={() => refForKey.current.click()}>
              <div className="brCbAaBa"></div>
            </div>
            <input
              ref={refForKey}
              type="file"
              id="image"
              className="brCbAaC"
              onChange={(e) => {
                addBranch.image = e.target.files[0];
                setState(addBranch);
              }}
            />
          </div>
          <div className={selected === 0 ? "brCbAb_" : "brCbAb"}>
            Branch Details
          </div>
          <div className={selected === 1 ? "brCbAb_" : "brCbAb"}>
            Contact Information
          </div>
          <div className={selected === 2 ? "brCbAb_" : "brCbAb"}>
            Other Details
          </div>
          <div className={selected === 3 ? "brCbAb_" : "brCbAb"}>
            Credential Information
          </div>
          <div className={selected === 4 ? "brCbAb_" : "brCbAb"}>
            Inventory Import
          </div>
        </div>
        {addBranch !== null ? (
          <div className="brCbB">
            <div className="brCbBa">BASIC INFORMATION</div>
            <div className="brCbBb">
              <div className="brCbBbA">Branch Name *</div>
              <input
                className="brCbBbB"
                onFocus={() => setSelected(0)}
                placeholder="Enter branch name"
                id="branch_name"
              />
              <div className="brCbBbA">Business Legal Name</div>
              <input
                className="brCbBbB"
                onFocus={() => setSelected(0)}
                placeholder="Enter vusiness legal name"
                id="business_legal_name"
              />
              <div className="brCbBbA">Branch Address</div>
              <textarea
                className="brCbBbB"
                onFocus={() => setSelected(0)}
                placeholder="Enter branch address"
                id="address"
              />
              <div className="brCbBbA">
                <div className="brCbBbAa">Business Country*</div>
                <div className="brCbBbAa">State or Province*</div>
              </div>
              <div className="brCbBbB">
                <select
                  className="brCbBbBa"
                  onFocus={() => setSelected(0)}
                  id="country"
                  onChange={(e) => {
                    addBranch.state_id = undefined;
                    addBranch.district_id = undefined;
                    getAllStates(e.target.value, setState);
                  }}
                >
                  <option hidden>Select country</option>
                  {allCountry?.map((it, k) => (
                    <option value={it.name} key={k}>
                      {it.name}
                    </option>
                  ))}
                </select>
                <select
                  className="brCbBbBa"
                  onFocus={() => setSelected(0)}
                  id="state_id"
                  disabled={addBranch?.country === undefined}
                  onChange={(e) => {
                    addBranch.district_id = undefined;
                    getAllDistricts(e.target.value, setState);
                  }}
                >
                  <option hidden>Select state</option>
                  {allState?.map((it, k) => (
                    <option value={it.id} key={k}>
                      {it.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="brCbBbA">
                <div className="brCbBbAa">PIN Code</div>
                <div className="brCbBbAa">District</div>
              </div>
              <div className="brCbBbB">
                <input
                  className="brCbBbBa"
                  onFocus={() => setSelected(0)}
                  placeholder="PIN Code"
                  type="number"
                  id="pin_code"
                />
                <select
                  className="brCbBbBa"
                  onFocus={() => setSelected(0)}
                  disabled={addBranch?.state_id === undefined}
                  id="district_id"
                >
                  <option hidden>Select district</option>
                  {allDistrict?.map((it, k) => (
                    <option value={it.id} key={k}>
                      {it.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="brCbBbA">
                <div className="brCbBbAa">Location Coordinaties</div>
                <div className="brCbBbAa" />
              </div>
              <div className="brCbBbB">
                <input
                  className="brCbBbBa"
                  onFocus={() => setSelected(0)}
                  placeholder="Latitude"
                  type="number"
                  id="latitude"
                />
                <input
                  className="brCbBbBa"
                  onFocus={() => setSelected(0)}
                  placeholder="Longitude"
                  id="longitude"
                  type="number"
                />
              </div>
            </div>
            <div className="brCbBa">CONTACT INFORMATION</div>
            <div className="brCbBb">
              <div className="brCbBbA">
                <div className="brCbBbAa">Registered Mobile *</div>
                <div className="brCbBbAa">Sales Contact</div>
              </div>
              <div className="brCbBbB">
                <input
                  className="brCbBbBa"
                  onFocus={() => setSelected(1)}
                  placeholder="Enter registered number"
                  type="number"
                  id="phone"
                />
                <input
                  className="brCbBbBa"
                  onFocus={() => setSelected(1)}
                  placeholder="Enter sales contact number"
                  type="number"
                  id="sales_number"
                />
              </div>
              <div className="brCbBbA">
                <div className="brCbBbAa">Support Contact</div>
                <div className="brCbBbAa">WhatsApp Number</div>
              </div>
              <div className="brCbBbB">
                <input
                  className="brCbBbBa"
                  onFocus={() => setSelected(1)}
                  placeholder="Enter support contact"
                  type="number"
                  id="support_number"
                />
                <input
                  className="brCbBbBa"
                  onFocus={() => setSelected(1)}
                  placeholder="Enter whatsapp number"
                  type="number"
                  id="whatsApp_number"
                />
              </div>
              <div className="brCbBbA">
                <div className="brCbBbAa">Business Email</div>
                <div className="brCbBbAa">Website</div>
              </div>
              <div className="brCbBbB">
                <input
                  className="brCbBbBa"
                  onFocus={() => setSelected(1)}
                  placeholder="Enter email address"
                  type="email"
                  id="email"
                />
                <input
                  className="brCbBbBa"
                  onFocus={() => setSelected(1)}
                  placeholder="Enter website"
                  id="web_site"
                />
              </div>
            </div>
            <div className="brCbBa">OTHER DETAILS</div>
            <div className="brCbBb">
              {/* <div className="brCbBbA">Time Zone *</div>
            <select className="brCbBbB" onFocus={() => setSelected(0)}>
              <option hidden>Select time zonet</option>
              {allTimeZone?.map((it, k) => (
                <option value={it.id} key={k}>
                  {it.title}
                </option>
              ))}
            </select> */}
              <div className="brCbBbA">
                {/* <div className="brCbBbAa">Base Currency*</div> */}
                <div className="brCbBbAa">Industry Type*</div>
                <div className="brCbBbAa">Business Type*</div>
              </div>
              <div className="brCbBbB">
                {/* <select className="brCbBbBa" onFocus={() => setSelected(0)}>
                <option hidden>Select currency</option>{" "}
                {allCurrency?.map((it, k) => (
                  <option value={it.id} key={k}>
                    {it.title}
                  </option>
                ))}
              </select> */}
                <select
                  className="brCbBbBa"
                  onFocus={() => setSelected(0)}
                  id="industry_type_id"
                >
                  <option hidden>Select industry type</option>{" "}
                  {allIndustryType?.map((it, k) => (
                    <option value={it.id} key={k}>
                      {it.name}
                    </option>
                  ))}
                </select>
                <select
                  className="brCbBbBa"
                  onFocus={() => setSelected(0)}
                  id="business_type_id"
                >
                  <option hidden>Select bussness type</option>{" "}
                  {allBusinessType?.map((it, k) => (
                    <option value={it.id} key={k}>
                      {it.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="brCbBbA">
                {/* <div className="brCbBbAa">Business Type*</div> */}
                <div className="brCbBbAa">TRN Number</div>
              </div>
              <div className="brCbBbB">
                <input
                  className="brCbBbBa"
                  onFocus={() => setSelected(1)}
                  placeholder="Enter TRN number"
                  id="gst_status"
                />
              </div>
            </div>
            <div className="brCbBa">CREDENTIAL INFORMATION</div>
            <div className="brCbBb">
              <div className="brCbBbA">
                <div className="brCbBbAa">Username</div>
                <div className="brCbBbAa">Password*</div>
              </div>
              <div className="brCbBbB">
                <input
                  className="brCbBbBa"
                  onFocus={() => setSelected(1)}
                  value={addBranch?.phone}
                  disabled
                />
                <Input
                  style={{ width: "48%" }}
                  onFocus={() => setSelected(1)}
                  placeholder="Enter Password"
                  type="password"
                  id="password"
                />
              </div>
            </div>
            <div className="brCbBa">INVENTORY REPORT</div>
            <div className="brCbBb">
              <div className="brCbBbA">Inventory Source</div>
              <input
                className="brCbBbB"
                onFocus={() => setSelected(4)}
                disabled
                value={window.localStorage.getItem("branchName")}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="brDd">
        <div className="brDdA">{error}</div>
        <div className="brDdB" onClick={() => setState({ addBranch: null })}>
          CANCEL
        </div>
        <div
          type="submit"
          className={loading ? "brDdC_" : "brDdC"}
          onClick={() => postNewBranch(state, setState)}
        >
          SAVE
        </div>
      </div>
    </form>
  );
  return <DrawerLayout1 show={addBranch !== null} body={body} />;
}
