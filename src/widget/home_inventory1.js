import React, { useState } from "react";
import "../style/hin.css";
import { addInventory, getProduct } from "../method/home_inventory";
import { getProducts } from "../method/home_inventory";
import { DropDown1, DropDown2, ImageUploder1 } from "./inputs";
import { SelectButton1, SwitchButton1 } from "./buttons";
import { getComaPriceDec } from "../module/simple";
import { prodectTypes, taxTypes } from "../module/home_inventory";

export function ProdectList({ state, setState }) {
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
                    onClick={() => {
                      state.product = it;
                      setState({ addpage: true });
                      getProduct(state, setState);
                    }}
                  >
                    <div className="hinIbB hinIcAb">
                      {it.image === "" || it.image === null ? (
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
                getProducts(state, setState);
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
                getProducts(state, setState);
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
                getProducts(state, setState);
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
              getProducts(state, setState);
            }}
          >
            Next
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
}

export function AddProdect({ state, setState }) {
  const edit = state.product;
  const isEdit = edit !== null;

  const { manageStock, sellOnline, categoryDefault } = state;
  const { allModifire, allStations } = state;
  const { allCategoty, allUnits, allKot, allTax } = state;
  const { allVariant1, allVariant2 } = state;
  var { allVariantList, selectedUnits } = state;

  const [type, setType] = useState(0);
  const [unit, setUnit] = useState("");

  return (
    <form onSubmit={(e) => addInventory(e, state, setState, type, unit)}>
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
                <DropDown2 value="id" id="product_type" items={prodectTypes} />
                <DropDown2
                  value="id"
                  items={allCategoty}
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
                <DropDown2
                  id="primary_unit"
                  items={allUnits}
                  name="title"
                  ph="Select Unit"
                  onchange={(v) => {
                    selectedUnits[0] = JSON.parse(v);
                    setState({ selectedUnits });
                    setUnit(JSON.parse(v).title);
                  }}
                />
                <DropDown2
                  id="secondry_unit"
                  items={allUnits}
                  ph={"Select alternate unit (optional)"}
                  name="title"
                  onchange={(v) => {
                    selectedUnits[1] = JSON.parse(v);
                    setState({ selectedUnits });
                  }}
                />
                {selectedUnits[1] !== null && selectedUnits[0] !== null ? (
                  <div className="hinKbEaI">
                    {selectedUnits[0].title}=
                    <input
                      id="conversion"
                      className="hinKbEaIa"
                      placeholder="0.00"
                    />
                    {selectedUnits[1].title}
                    <div className="hinKbEaIb" />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="hinKbEb">
              <div className="hinKbEbB">Tax slab</div>
              <div className="hinKbEbB">Tax treatment</div>
              <div className="hinKbEbB">
                HSN&nbsp;
                <div className="hinKbEbBa">will be used for GST reports</div>
              </div>
            </div>
            <div className="hinKbEa">
              <div className="hinKbEaA">Tax info *</div>
              <div className="hinKbEaE">
                <DropDown2 value="id" items={allTax} id="selling_tax" />
                <DropDown2 value="id" items={taxTypes} id="tax_inclusion" />
                <input
                  defaultValue={isEdit ? edit.hsn_code : null}
                  id="hsncode"
                  type="number"
                  className="hinKbEaC"
                  placeholder="Only numeric characters"
                />
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
              <ImageUploder1 state={state} setState={setState} />
            </div>
            <div className="hinKbEa">
              <div className="hinKbEaA">Select production station</div>
              <DropDown1
                setState={setState}
                items={allKot}
                allStations={allStations}
                ph={"Select a production station for your product"}
              />
            </div>
            <div className="hinKbEa">
              <div className="hinKbEaA" />
              <div className="hinKbEaF">
                {allStations.map((stat, k) => (
                  <div className="hinKbEaFa" key={k}>
                    {stat.name}
                    <div
                      className="hinKbEaFa-btn"
                      onClick={() => {
                        allStations.splice(k, 1);
                        setState({ allStations });
                      }}
                    />
                  </div>
                ))}
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
                    id="bar_code"
                    className="hinKbEaC"
                    placeholder="Only uppercase letters and numbers"
                    defaultValue={isEdit ? edit.barcode : null}
                  />
                  <input
                    type="number"
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
                    defaultValue={isEdit ? edit.selling_price : null}
                  />
                  <DropDown2
                    value="title"
                    name="title"
                    items={
                      selectedUnits[0] === null
                        ? []
                        : selectedUnits[1] === null
                        ? [selectedUnits[0]]
                        : selectedUnits
                    }
                    onchange={(v) => setUnit(v)}
                  />
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
                    type="number"
                    className="hinKbEaC"
                    placeholder="Enter MRP"
                    defaultValue={isEdit ? edit.mrp : null}
                  />
                  <span className="hinKbEaC-unit">/{unit}</span>
                  <input
                    id="selling_price"
                    type="number"
                    className="hinKbEaC"
                    placeholder="Enter RRP"
                    defaultValue={isEdit ? edit.selling_price : null}
                  />
                  <span className="hinKbEaC-unit">/{unit}</span>
                  <input
                    id="online_price"
                    type="number"
                    className="hinKbEaC"
                    placeholder="Enter online price"
                    defaultValue={isEdit ? edit.online_price : null}
                  />
                  <span className="hinKbEaC-unit">/{unit}</span>
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
                  <input
                    id="opening_stock"
                    type="number"
                    className="hinKbEaC"
                    placeholder=""
                    defaultValue={isEdit ? edit.stock : null}
                  />
                  <span className="hinKbEaC-unit">/{unit}</span>
                  <input
                    className="hinKbEaC"
                    type="number"
                    placeholder="Enter minimum stock level"
                    id="min_stock_level"
                    defaultValue={isEdit ? edit.min_stock_level : null}
                  />
                  <span className="hinKbEaC-unit">/{unit}</span>
                </div>
              </React.StrictMode>
            ) : null}
            {/* ----------------------------------------------------------------- */}
            {/* -------------------------type 2---------------------------------- */}
            {/* ----------------------------------------------------------------- */}
            {type === 1 ? (
              <React.StrictMode>
                <div className="hinKbEb">
                  <div className="hinKbEbB">
                    Single Selectable* &nbsp;
                    <div className="hinKbEbBa">e.g. Colour, Size etc.</div>
                  </div>
                </div>
                <div className="hinKbEa">
                  <div className="hinKbEaA">Variant attributes *</div>
                  <input className="hinKbEaJ" placeholder="CAPACITY" />
                  <div className="hinKbEaJ-btn" />
                  <div className="hinKbEaK">
                    {allVariant1.map((it, k) => (
                      <div key={k} className="popBr">
                        {it}
                        <div
                          className="popBr-btn"
                          onClick={() => {
                            allVariant1.splice(k, 1);
                            setState({ allVariant1 });
                          }}
                        />
                      </div>
                    ))}
                    <input
                      className="gblINet"
                      onChange={(e) => {
                        const val = e.target.value.split(",");
                        if (val.length > 1) {
                          e.target.value = "";
                          allVariant1.push(val[0]);
                          setState({ allVariant1 });
                        }
                      }}
                    />
                  </div>
                  <SwitchButton1 />
                  <div>
                    <div className="hinKbEaL">
                      Set as primary attribute
                      <div className="hinKbEaLa">
                        Prices will be binded with primary
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hinKbEb">
                  <div className="hinKbEbB">
                    Single Selectable* &nbsp;
                    <div className="hinKbEbBa">e.g. Colour, Size etc.</div>
                  </div>
                </div>
                <div className="hinKbEa">
                  <div className="hinKbEaA">Variant attributes</div>
                  <input className="hinKbEaJ" placeholder="CAPACITY" />
                  <div className="hinKbEaJ-btn" />
                  <div className="hinKbEaK">
                    {allVariant2.map((it, k) => (
                      <div key={k} className="popBr">
                        {it}
                        <div
                          className="popBr-btn"
                          onClick={() => {
                            allVariant2.splice(k, 1);
                            setState({ allVariant2 });
                          }}
                        />
                      </div>
                    ))}
                    <input
                      className="gblINet"
                      onChange={(e) => {
                        const val = e.target.value.split(",");
                        if (val.length > 1) {
                          e.target.value = "";
                          allVariant2.push(val[0]);
                          setState({ allVariant2 });
                        }
                      }}
                    />
                  </div>
                </div>
                <div
                  className="hinKbEc"
                  onClick={() => {
                    allVariantList = [];
                    for (let i = 0; i < allVariant1.length; i++) {
                      const e1 = allVariant1[i];
                      for (let j = 0; j < allVariant2.length; j++) {
                        const e2 = allVariant2[j];
                        allVariantList.push({ title: `${e1}/${e2}` });
                      }
                    }
                    setState({ allVariantList });
                  }}
                >
                  SETUP INVENTORY
                </div>
              </React.StrictMode>
            ) : null}
            {/* ----------------------------------------------------------------- */}
            {/* -------------------------type 3---------------------------------- */}
            {/* ----------------------------------------------------------------- */}
            {type === 2 ? <React.StrictMode></React.StrictMode> : null}
          </div>
        </div>
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* /////////////////////VARIANT INFORMATION//////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {type === 1 && allVariantList.length !== 0 ? (
          <React.StrictMode>
            <div className="hinKa">VARIANT INFORMATION</div>
            <div className="hinKbB" />
            <div className="hinKb">
              <div className="hinKbA">
                <div className="hinKbC">
                  What all variants are you planning for this product?
                </div>
                <div className="hinKbC">
                  You can set product variants and sub classifications with SKU,
                  Pricing and listing details in this section.
                </div>
                <div className="hinKbC">
                  Choose up to two variable attributes for your product to
                  create and manage SKUs and their inventory levels.
                </div>
              </div>
              <div className="hinKbE">
                <div className="hinKbEd">
                  <div className="hinKbEdA">
                    <div className="hinKbEdAa">Variant</div>
                    <div className="hinKbEdAb">SKU</div>
                    <div className="hinKbEdAb">EAN</div>
                    <div className="hinKbEdAc">Stock</div>
                    <div className="hinKbEdAc">MSL</div>
                    <div className="hinKbEdAd">Cost*</div>
                    <div className="hinKbEdAd">MRP*</div>
                    <div className="hinKbEdAd">RRP</div>
                    <div className="hinKbEdAc">Online Price</div>
                  </div>
                  {allVariantList.map((item, k) => (
                    <div key={k} className="hinKbEdB">
                      <div className="hinKbEdAa">{item.title}</div>
                      <input className="hinKbEdAb hinKbEdBa" />
                      <input className="hinKbEdAb hinKbEdBa" />
                      <input className="hinKbEdAc hinKbEdBa" />
                      <input className="hinKbEdAc hinKbEdBa" />
                      <input className="hinKbEdAd hinKbEdBa" />
                      <input className="hinKbEdAd hinKbEdBa" />
                      <input className="hinKbEdAd hinKbEdBa" />
                      <input className="hinKbEdAc hinKbEdBa" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </React.StrictMode>
        ) : null}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* /////////////////////MODIFIER SETTINGS////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {/* //////////////////////////////////////////////////////////// */}
        {type !== 2 ? (
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
