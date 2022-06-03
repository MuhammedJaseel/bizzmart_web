import React, { Component, useState } from "react";
import { Header1 } from "./headers";
import "../style/hin.css";
import icDownload from "../asset/icon/ic_download.png";
import icShare from "../asset/icon/ic_share.png";
import icArrow2 from "../asset/icon/ic_arrow2.png";
import { addInventory, getCategoryList } from "../method/home_inventory";
import { getProduct } from "../method/home_inventory";
import { DropDown1, DropDown2, ImageUploder1 } from "./inputs";
import { SelectButton1, SwitchButton1 } from "./buttons";
import { getComaPriceDec } from "../module/simple";
import { InventoryAddModifirePopup } from "./popups";

export default class HomeInventory extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      addpage: true,
      allProduct: null,
      prodectMaxCount: 10,
      productPage: 1,
      totelProduct: 0,
      allCategoty: [],
      error: null,
      product: null,
      loading: true,
      //type1 ///////////
      modifirePop: false,
      allModifire: [],
      sellOnline: true,
      manageStock: true,
      categoryDefault: true,
    };
  }

  componentDidMount() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    getProduct(state, setState);
    getCategoryList(state, setState);
  }

  render() {
    const { page, addpage, modifirePop } = this.state;

    const setState = (v) => this.setState(v);
    const state = this.state;

    const titleBL = (
      <div className="hinB" onClick={() => this.setState({ addpage: false })}>
        PRODUCRS LIST
      </div>
    );
    const titleBR = (
      <div className="hinC">
        <div className="hinCa">
          <img alt="ic" className="hinCaA" src={icDownload} />
        </div>
        <div className="hinCa">
          <img alt="ic" className="hinCaA" src={icShare} />
        </div>
        <div className="hinCc">
          <div
            className="hinCcA"
            onClick={() => this.setState({ addpage: true, product: null })}
          >
            + New {page === 0 ? "Product" : "Service"}
          </div>
          <div className="hinCcB">
            <img alt="ic" className="hinCcBa" src={icArrow2} />
          </div>
          <div className="hinCcC">
            <div
              className="hinCcCa"
              onClick={() =>
                this.setState({ page: 0, addpage: true, product: null })
              }
            >
              Add Product
            </div>
            <div className="hinCcCa">Add Service</div>
            <div className="hinCcCa">Inventory Count</div>
          </div>
        </div>
      </div>
    );

    const hTitle = (
      <React.StrictMode>INVENTORY&nbsp;{" > "}&nbsp;</React.StrictMode>
    );

    return (
      <React.StrictMode>
        <Header1
          title={hTitle}
          bodyL={titleBL}
          bodyR={!addpage ? titleBR : null}
        />
        <div className="hinE">
          <div
            className="hinEa"
            onClick={() => setState({ page: 0, addpage: false })}
          >
            <div className={page === 0 ? "hinEb_" : "hinEb"}>Product</div>
            <div className={page === 0 ? "hinEc_" : "hinEc"} />
          </div>
          <div
            className="hinEa"
            onClick={() => setState({ page: 1, addpage: false })}
          >
            <div className={page === 1 ? "hinEb_" : "hinEb"}>Service</div>
            <div className={page === 1 ? "hinEc_" : "hinEc"} />
          </div>
        </div>
        {page === 0 ? (
          addpage ? (
            <AddProdect state={state} setState={setState} />
          ) : (
            <ProdectList state={state} setState={setState} />
          )
        ) : null}
        {modifirePop ? (
          <InventoryAddModifirePopup setState={setState} state={state} />
        ) : null}
      </React.StrictMode>
    );
  }
}

function ProdectList({ state, setState }) {
  const { allProduct, productPage, totelProduct, prodectMaxCount } = state;
  const { loading, allCategoty } = state;
  var pageNumbers = [];
  for (let i = 0; i < totelProduct / prodectMaxCount; i++) {
    pageNumbers.push(1);
  }
  return (
    <React.StrictMode>
      <div className="hinF">Product List</div>
      <div className="hinG">
        <div className="hinGa">
          Shows all the team members recorded against your business
        </div>
        <div className="hinGb">
          <input className="hinGbA" placeholder="Search a product" />
          <div className="hinGbA-icon" />
          <div className="hinGbB">SHOWING:</div>
          <select className="hinGbC">
            <option>All Product</option>
          </select>
          <select className="hinGbD">
            <option>All Category</option>
            {allCategoty.map((cat) => (
              <option>{cat.name}</option>
            ))}
          </select>
          <div className="hinGbE">APPLY</div>
        </div>
      </div>
      <div className="hinI">
        <div className="hinIa">
          <div className="hinIb">
            <div className="hinIbB" />
            <div className="hinIbC">Product Name</div>
            <div className="hinIbD">Code</div>
            <div className="hinIbF">Category</div>
            <div className="hinIbG">Type</div>
            <div className="hinIbH">Cost</div>
            <div className="hinIbI">Selling</div>
            <div className="hinIbJ">MRP</div>
            <div className="hinIbK">Tax</div>
            <div className="hinIbL">Stock</div>
            <div className="hinIbM">MSL</div>
          </div>
          <div className="hinIc">
            {loading ? (
              <div
                className="hinIcA"
                onClick={() => setState({ product: it, addpage: true })}
              >
                <div className="hinIbB hinIcAb">
                  <div className="hinIcAbA">...</div>
                </div>
                <div className="hinIbC hinIcAc">
                  <div className="hinIcAcA">...</div>
                  <div className="hinIcAcB">...</div>
                </div>
                <div className="hinIbD hinIcAd">...</div>
                <div className="hinIbF hinIcAe">...</div>
                <div className="hinIbG hinIcAf">...</div>
                <div className="hinIbH hinIcAg">...</div>
                <div className="hinIbI hinIcAh">...</div>
                <div className="hinIbJ hinIcAi">...</div>
                <div className="hinIbK hinIcAj">...</div>
                <div className="hinIbL hinIcAk">...</div>
                <div className="hinIbM hinIcAl">...</div>
              </div>
            ) : null}
            {allProduct !== null
              ? allProduct.map((it, k) => (
                  <div
                    key={k}
                    className="hinIcA"
                    onClick={() => setState({ product: it, addpage: true })}
                  >
                    <div className="hinIbB hinIcAb">
                      {it.image === null ? (
                        <div className="hinIcAbA">
                          {it.name.substring(0, 2).toUpperCase()}
                        </div>
                      ) : (
                        <img alt="img" src={it.image} className="hinIcAbA" />
                      )}
                    </div>
                    <div className="hinIbC hinIcAc">
                      <div className="hinIcAcA">{it.name}</div>
                      <div className="hinIcAcB">{it.product_type}</div>
                    </div>
                    <div className="hinIbD hinIcAd">{it.code}</div>
                    <div className="hinIbF hinIcAe">{it.category_name}</div>
                    <div className="hinIbG hinIcAf">{it.type}</div>
                    <div className="hinIbH hinIcAg">{it.cost}</div>
                    <div className="hinIbI hinIcAh">
                      {getComaPriceDec(it.selling)}
                    </div>
                    <div className="hinIbJ hinIcAi">
                      {getComaPriceDec(it.MRP)}
                    </div>
                    <div className="hinIbK hinIcAj">{it.tax}</div>
                    <div className="hinIbL hinIcAk">{it.stock} PCS</div>
                    <div className="hinIbM hinIcAl">{it.MSL} PSC</div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
      <div className="hinJ">
        <div className="hinJa">
          SHOW:
          <input
            onChange={(e) => {
              if (e.target.value < 2) e.target.value = 2;
              else {
                setState({ prodectMaxCount: e.target.value, productPage: 1 });
                setState({ loading: true });
                getProduct(state, setState);
              }
            }}
            min="2"
            defaultValue={prodectMaxCount}
            className="hinJaB"
            type="number"
          />
          ENTRIES
        </div>
        <div className="hinJb">
          Showing {prodectMaxCount * productPage - prodectMaxCount + 1} to{" "}
          {prodectMaxCount * productPage} of {totelProduct} entries
        </div>
        <div className="hinJb">
          <div
            className="hinJbA"
            onClick={() => {
              if (productPage !== 1) {
                setState({ productPage: productPage - 1 });
                setState({ loading: true });
                getProduct(state, setState);
              }
            }}
          >
            Previous Page
          </div>
          {pageNumbers.map((i, k) => (
            <div
              onClick={() => {
                setState({ productPage: k + 1 });
                setState({ loading: true });
                getProduct(state, setState);
              }}
              className={productPage === k + 1 ? "hinJbB hinJbB_" : "hinJbB"}
            >
              {k + 1}
            </div>
          ))}
          <div
            className="hinJbA"
            onClick={() => {
              setState({ productPage: productPage + 1 });
              setState({ loading: true });
              getProduct(state, setState);
            }}
          >
            Next
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
}

function AddProdect({ state, setState }) {
  const edit = state.product;
  const isEdit = edit !== null;

  const { allModifire, manageStock, sellOnline, categoryDefault } = state;

  const [type, setType] = useState(0);
  const [station, setStation] = useState([]);

  return (
    <form onSubmit={(e) => addInventory(e, state, setState)}>
      <div className="hinF">{edit ? "Edit" : "New"} Product</div>
      <div className="hinG">
        <div className="hinGa">
          Add a vew product for selling across all your linked bizzSmart
          channels
        </div>
      </div>
      <div className="hinK">
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* /////////////////////GENERAL DETAILS//////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        <div className="hinKa">GENERAL DETAILS</div>
        <div className="hinKbB" />
        <div className="hinKb">
          <div className="hinKbA">
            <div className="hinKbC">
              What all are the general information about your new product?
            </div>
            <div className="hinKbC">
              Add product name, supplier info, tags, product description and
              images for your new product in this section.
            </div>
          </div>
          <div className="hinKbE">
            <div className="hinKbEa">
              <div className="hinKbEaA">Product name *</div>
              <input
                className="hinKbEaB"
                defaultValue={isEdit ? edit.name : null}
                id="product_name"
                placeholder="Enter a name for your product"
              />
            </div>
            <div className="hinKbEb">
              <div className="hinKbEbB">Select product type</div>
              <div className="hinKbEbB">Category *</div>
            </div>
            <div className="hinKbEa">
              <div className="hinKbEaA">Inventory type *</div>
              <div className="hinKbEaE">
                <DropDown2 id="product_type" />
                <DropDown2
                  id="category_id"
                  ph={"Select alternate unit (optional)"}
                />
              </div>
            </div>
            <div className="hinKbEa">
              <div className="hinKbEaA">Product description</div>
              <textarea
                rows={4}
                id="product_description"
                defaultValue={isEdit ? edit.name : null}
                className="hinKbEaD"
                placeholder="Enter a brief description for your product, this will be shown on all the linked selling channels for your customers."
              />
            </div>
            <div className="hinKbEa">
              <div className="hinKbEaA">Manage stock</div>
              <div className="hinKbEaE">
                <SwitchButton1
                  onTap={() => setState({ manageStock: !manageStock })}
                  value={manageStock}
                />
              </div>
            </div>
            <div className="hinKbEb">
              <div className="hinKbEbB">Selling unit *</div>
              <div className="hinKbEbB">Alternate unit</div>
            </div>
            <div className="hinKbEa">
              <div className="hinKbEaA">Units *</div>
              <div className="hinKbEaE">
                <DropDown2 id="primary_unit" />
                <DropDown2
                  id="secondry_unit"
                  ph={"Select alternate unit (optional)"}
                />
              </div>
            </div>
            <div className="hinKbEb">
              <div className="hinKbEbB">Tax slab</div>
              <div className="hinKbEbB">Tax treatment</div>
            </div>
            <div className="hinKbEa">
              <div className="hinKbEaA">Tax info *</div>
              <div className="hinKbEaE">
                <DropDown2 />
                <DropDown2 />
              </div>
            </div>
            <div className="hinKbEa">
              <div className="hinKbEaA">Sell online</div>
              <div className="hinKbEaE">
                <SwitchButton1
                  onTap={() => setState({ sellOnline: !sellOnline })}
                  value={sellOnline}
                />
                <div className="hinKbEaEc">
                  Make this product active and available for sale on all linked
                  online channels
                </div>
              </div>
            </div>
            <div className="hinKbEa">
              <div className="hinKbEaA">Upload images</div>
              <ImageUploder1 />
            </div>
            <div className="hinKbEa">
              <div className="hinKbEaA">Select production station</div>
              <DropDown1 ph={"Select a production station for your product"} />
            </div>
            <div className="hinKbEa">
              <div className="hinKbEaA" />
              <div className="hinKbEaF">
                <div className="hinKbEaFa">
                  Apple
                  <div className="hinKbEaFa-btn" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* ///////////////////INVENTORY INFORMATION//////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        <div className="hinKa">INVENTORY INFORMATION</div>
        <div className="hinKbB" />
        <div className="hinKb">
          <div className="hinKbA">
            <div className="hinKbC">
              How you want to store, list, track and sell your new product?
            </div>
            <div className="hinKbC">
              You can set product supply details, suppliers, selling channels,
              supply & sales details in this section.
            </div>
          </div>
          <div className="hinKbE">
            <div className="hinKbEa">
              <div className="hinKbEaA">Product type*</div>
              <SelectButton1 dis={isEdit} type={type} setType={setType} />
            </div>
            {/* ----------------------------------------------------------------- */}
            {/* -------------------------type 1---------------------------------- */}
            {/* ----------------------------------------------------------------- */}
            {type === 0 ? (
              <React.StrictMode>
                {/* ///////////// */}
                <div className="hinKbEb">
                  <div className="hinKbEbB">
                    SKU7&nbsp;
                    <div className="hinKbEbBa">
                      will be auto generated once left blank
                    </div>
                  </div>
                  <div className="hinKbEbB">
                    EAN&nbsp;
                    <div className="hinKbEbBa">
                      will be used for integrations
                    </div>
                  </div>
                </div>
                <div className="hinKbEa">
                  <div className="hinKbEaA">Product Barcode (SKU)</div>
                  <input
                    className="hinKbEaC"
                    placeholder="Only uppercase letters and numbers"
                  />
                  <input
                    className="hinKbEaC"
                    placeholder="Only numeric characters"
                  />
                </div>
                {/* ///////////// */}
                <div className="hinKbEb">
                  <div className="hinKbEbB">Supplier / Cost*</div>
                  <div className="hinKbEbB">Purchase unit </div>
                </div>
                <div className="hinKbEa">
                  <div className="hinKbEaA">Purchase Info *</div>
                  <input
                    className="hinKbEaC"
                    id="purchase_price"
                    placeholder="Enter cost / purchase price"
                  />
                  <DropDown2 />
                </div>
                {/* ////////////////// */}
                <div className="hinKbEb">
                  <div className="hinKbEbB">
                    MRP * &nbsp;
                    <div className="hinKbEbBa">Maximum Retail Price</div>
                  </div>
                  <div className="hinKbEbB">
                    RRP &nbsp;
                    <div className="hinKbEbBa">Recommended Retail Price</div>
                  </div>
                  <div className="hinKbEbB">Online Price</div>
                </div>
                <div className="hinKbEa">
                  <div className="hinKbEaA">Selling info *</div>
                  <input
                    id="mrp"
                    className="hinKbEaC"
                    placeholder="Enter MRP"
                  />
                  <span className="hinKbEaC-unit">/PSC</span>
                  <input
                    id="selling_price"
                    className="hinKbEaC"
                    placeholder="Enter RRP"
                  />
                  <span className="hinKbEaC-unit">/PSC</span>
                  <input
                    id="online_price"
                    className="hinKbEaC"
                    placeholder="Enter online price"
                  />
                  <span className="hinKbEaC-unit">/PSC</span>
                </div>
                {/* ////////////////// */}
                <div className="hinKbEb">
                  <div className="hinKbEbB">
                    Stock &nbsp;
                    <div className="hinKbEbBa">
                      Available stock in primary selling unit
                    </div>
                  </div>
                  <div className="hinKbEbB">
                    MSL &nbsp;
                    <div className="hinKbEbBa">Minimum stock level</div>
                  </div>
                </div>
                <div className="hinKbEa">
                  <div className="hinKbEaA">Selling info *</div>
                  <input className="hinKbEaC" placeholder="" />
                  <span className="hinKbEaC-unit">/PSC</span>
                  <input
                    className="hinKbEaC"
                    placeholder="Enter minimum stock level"
                    id="min_stock_level"
                  />
                  <span className="hinKbEaC-unit">/PSC</span>
                </div>
              </React.StrictMode>
            ) : null}
            {/* ----------------------------------------------------------------- */}
            {/* -------------------------type 2---------------------------------- */}
            {/* ----------------------------------------------------------------- */}
            {type === 0 ? <React.StrictMode></React.StrictMode> : null}
            {/* ----------------------------------------------------------------- */}
            {/* -------------------------type 3---------------------------------- */}
            {/* ----------------------------------------------------------------- */}
            {type === 0 ? <React.StrictMode></React.StrictMode> : null}
          </div>
        </div>
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* /////////////////////MODIFIER SETTINGS////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {type === 0 ? (
          <React.StrictMode>
            <div className="hinKa">MODIFIER SETTINGS</div>
            <div className="hinKbB" />
            <div className="hinKb">
              <div className="hinKbA">
                <div className="hinKbC">
                  How you want to store, list, track and sell your new product?
                </div>
                <div className="hinKbC">
                  You can set product supply details, suppliers, selling
                  channels, supply & sales details in this section.
                </div>
              </div>
              <div className="hinKbE">
                <div className="hinKbEa">
                  <div className="hinKbEaA">Apply category defaults</div>
                  <div className="hinKbEaE">
                    <SwitchButton1
                      onTap={() =>
                        setState({ categoryDefault: !categoryDefault })
                      }
                      value={categoryDefault}
                    />
                    <div className="hinKbEaEc">
                      Apply the modifiers saved against parent category
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <div className="hinKbEb">
                  <div className="hinKbEbB">
                    Multiple Selectable &nbsp;
                    <div className="hinKbEbBa">
                      e.g. No sugar, cook well etc.
                    </div>
                  </div>
                </div>
                <div className="hinKbE">
                  <div className="hinKbEa">
                    <div className="hinKbEaA">
                      Add product specific modifiers
                    </div>
                    <div className="hinKbEaE">
                      <div
                        className="hinKbEaG"
                        onClick={() => setState({ modifirePop: true })}
                      >
                        + ADD MODIFIERS
                      </div>
                      <div className="hinKbEaH">
                        {allModifire.map((it, k) => (
                          <div key={k} className="popBr">
                            {it.title}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {it.price}
                            <div
                              className="popBr-btn"
                              onClick={() => {
                                allModifire.splice(k, 1);
                                setState({ allModifire });
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.StrictMode>
        ) : null}
      </div>
      <div className="hinL">
        {isEdit ? <div className="hinLa">DELETE PRODECT</div> : <div />}
        <div className="hinLb">
          <div className="hinLbA">CANCEL</div>
          <button type="submil" className="hinLbB">
            SAVE
          </button>
        </div>
      </div>
    </form>
  );
}
