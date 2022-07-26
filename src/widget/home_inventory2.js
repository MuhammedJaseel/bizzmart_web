import React, { StrictMode } from "react";
import { prodectTypes } from "../module/home_inventory";
import { Header1, Header4 } from "./widget";
import { AddingForm1, AddingForm2 } from "./widget_form";
import { AddingFormLayout, FormSwitch, MyForm1 } from "./widget_form";

export default function HomeInventoryForms({ state, setState }) {
  return (
    <StrictMode>
      <ProductForm state={state} setState={setState} />
      <ServiceForm state={state} setState={setState} />
      <AssetForm state={state} setState={setState} />
    </StrictMode>
  );
}

function ProductForm({ state, setState }) {
  const { page, setPage, product, isEdit } = state;
  const t1 = "GENERAL DETAILS";
  const d1 = (
    <StrictMode>
      What all are the general information about your new product? <br />
      <br />
      Add product name, supplier info, tags, product description and images for
      your new product in this section.
    </StrictMode>
  );
  const t2 = "INVENTORY INFORMATION";
  const d2 = (
    <StrictMode>
      How you want to store, list, track and sell your new product?
      <br />
      <br />
      You can set product supply details, suppliers, selling channels, supply &
      sales details in this section.
    </StrictMode>
  );

  if (page?.path !== "addProdect") return null;
  return (
    <form
      onChange={(e) => {
        const prop = e.target.id;
        const value = e.target.value;
        product[prop] = value;
        setState({ product });
        console.log(product);
      }}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(product);
      }}
    >
      <Header1 title="INVENTORY" bodyL={page.title} onTap={setPage} />
      <div className="hinD">
        <Header4
          title={isEdit ? page?.editTitle : page?.title}
          desc={page?.desc}
        />
        <AddingFormLayout title={t1} desc={d1}>
          <AddingForm1 title="Product name *">
            <input
              className="hinDa"
              placeholder="Enter a name for your product"
              id="product_name"
              defaultValue={product.product_name}
            />
          </AddingForm1>
          <AddingForm2>
            <div className="hinDaA">Select product type</div>
            <div className="hinDaA">Category *</div>
          </AddingForm2>
          <AddingForm1 title="Business Legal Name">
            <div className="hinDa">
              <select className="hinDaA">
                <option hidden> Select prodect type</option>
                {prodectTypes.map((it, k) => (
                  <option key={k} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </select>
              <select className="hinDaA"></select>
            </div>
          </AddingForm1>
          <AddingForm1 title="Product description">
            <textarea
              className="hinDa"
              placeholder="Enter a brief description for your product, this will be shown on all the linked selling channels for your customers."
              id="product_description"
              defaultValue={product.product_description}
            />
          </AddingForm1>
          <AddingForm1 title="Manage stock">
            <FormSwitch
              value={product.is_service === 1}
              onTap={() => {
                product.is_service = product.is_service === 1 ? 0 : 1;
                setState({ product });
              }}
            />
          </AddingForm1>
          <AddingForm2>
            <div className="hinDaB">Selling unit *</div>
            <div className="hinDaB">Alternate unit</div>
            <div className="hinDaB" />
          </AddingForm2>
          <AddingForm1 title="Units *">
            <div className="hinDa">
              <select className="hinDaB"></select>
              <select className="hinDaB"></select>
              <div className="hinDaB" />
            </div>
          </AddingForm1>
          <AddingForm2>
            <div className="hinDaB">Tax slab</div>
            <div className="hinDaB">Tax treatment</div>
            <div className="hinDaB">
              HSN<sb>will be used for GST reports</sb>
            </div>
          </AddingForm2>
          <AddingForm1 title="Tax info *">
            <div className="hinDa">
              <select className="hinDaB"></select>
              <select className="hinDaB"></select>
              <input
                className="hinDaB"
                placeholder="Only numeric characters"
                id="hsncode"
                defaultValue={product.hsncode}
              />
            </div>
          </AddingForm1>
          <AddingForm1 title="Sell online">
            <FormSwitch
              value={product.is_online === 1}
              onTap={() => {
                product.is_online = product.is_online === 1 ? 0 : 1;
                setState({ product });
              }}
            />
          </AddingForm1>
          <AddingForm1 title="Upload images">
            <ImagePicker state={state} setState={setState} />
          </AddingForm1>
          <AddingForm1 title="Select production station">
            <select className="hinDa"></select>
          </AddingForm1>
        </AddingFormLayout>
        {/*///////////////////////////////////////////////////////////////////////////////////////////////*/}
        <AddingFormLayout title={t1} desc={d1}>
          <AddingForm1 title="Product type*">
            <SelectButton
              edit
              type={product.type}
              setType={(v) => setState({ product: { ...product, type: v } })}
            />
          </AddingForm1>
          {product.type === 0 ? (
            <StrictMode>
              <AddingForm2>
                <div className="hinDaB">
                  SKU<sb>will be auto generated once left blank</sb>
                </div>
                <div className="hinDaB">
                  EAN<sb>will be used for integrations</sb>
                </div>
                <div className="hinDaB" />
              </AddingForm2>
              <AddingForm1 title="Product barcode (SKU)">
                <div className="hinDa">
                  <input
                    className="hinDaB"
                    placeholder="Only uppercase letters and numbers"
                  />
                  <input
                    className="hinDaB"
                    placeholder="Only numeric characters"
                  />
                  <div className="hinDaB" />
                </div>
              </AddingForm1>
              <AddingForm2>
                <div className="hinDaB">Supplier / Cost* </div>
                <div className="hinDaB">Purchase unit </div>
                <div className="hinDaB" />
              </AddingForm2>
              <AddingForm1 title="Purchase info *">
                <div className="hinDa">
                  <input
                    className="hinDaB"
                    placeholder="Enter cost / purchase price"
                  />
                  <select className="hinDaB"></select>
                  <div className="hinDaB" />
                </div>
              </AddingForm1>
              <AddingForm2>
                <div className="hinDaB">
                  MRP *<sb>Maximum Retail Price</sb>
                </div>
                <div className="hinDaB">
                  RRP<sb>Recommended Retail Price</sb>
                </div>
                <div className="hinDaB">Online price</div>
              </AddingForm2>
              <AddingForm1 title="Selling info *">
                <div className="hinDa">
                  <input className="hinDaB" placeholder="Enter MRP" />
                  <input className="hinDaB" placeholder="Enter selling price" />
                  <input className="hinDaB" placeholder="Enter online price" />
                </div>
              </AddingForm1>
              <AddingForm2>
                <div className="hinDaB">
                  Stock <sb>Available stock in primary selling unit</sb>
                </div>
                <div className="hinDaB" />
                <div className="hinDaB" />
              </AddingForm2>
              <AddingForm1 title="Stock info *">
                <div className="hinDa">
                  <input className="hinDaB" defaultValue="0.00" type="number" />
                  <input
                    className="hinDaB"
                    placeholder="Enter minimum stock level"
                  />
                  <div className="hinDaB" />
                </div>
              </AddingForm1>
            </StrictMode>
          ) : null}
          {product.type === 1 ? (
            <StrictMode>
              <AddingForm2>
                <div className="hinDaB">
                  Single Selectable* <sb>e.g. Colour, Size etc. </sb>
                </div>
              </AddingForm2>
              <AddingForm1 title="Variant attribute 01*">
                <div className="hinDa">
                  <input
                    className="hinDaB"
                    placeholder="Enter attribute title"
                  />
                  <input
                    className="hinDaB"
                    placeholder="Enter values separate by comma and press enter"
                  />
                  <div className="hinDaB" />
                </div>
              </AddingForm1>
              <AddingForm2>
                <div className="hinDaB">
                  Single Selectable <sb>e.g. Colour, Size etc. </sb>
                </div>
              </AddingForm2>
              <AddingForm1 title="Variant attribute 02*">
                <div className="hinDa">
                  <input
                    className="hinDaB"
                    placeholder="Enter attribute title"
                  />
                  <input
                    className="hinDaB"
                    placeholder="Enter values separate by comma and press enter"
                  />
                  <div className="hinDaB" />
                </div>
              </AddingForm1>
            </StrictMode>
          ) : null}
          {product.type === 2 ? (
            <StrictMode>
              <AddingForm1 title="Default Products*"></AddingForm1>
            </StrictMode>
          ) : null}
        </AddingFormLayout>
        <div className="hinDb">
          {isEdit ? <div className="hinDbA">DELETE PRODECT</div> : <div />}
          <div className="hinDbB">
            <div className="hinDbBa">CANCEL</div>
            <button type="submit" className="hinDbBb">
              SAVE
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function ImagePicker({ state, setState }) {
  const images = [
    "url(https://bobbyhadz.com/images/blog/javascript-update-all-values-in-object/banner.webp)",
    "url(https://bobbyhadz.com/images/blog/javascript-update-all-values-in-object/banner.webp)",
    "url(https://bobbyhadz.com/images/blog/javascript-update-all-values-in-object/banner.webp)",
    "url(https://bobbyhadz.com/images/blog/javascript-update-all-values-in-object/banner.webp)",
    "url(https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e)",
    "url(https://bobbyhadz.com/images/blog/javascript-update-all-values-in-object/banner.webp)",
  ];
  return (
    <div className="hinDd">
      <div className="hinDdA">
        {images.map((it, k) => (
          <div
            key={k}
            className={k === 0 ? "hinDdAa_pr" : "hinDdAa"}
            style={{ backgroundImage: it }}
            draggable
          >
            <div className="hinDdAaA">
              <div className="hinDdAaAa" />
            </div>
            <div className="hinDdAaB">
              Drag to
              <br />
              reorder
            </div>
            <div />
          </div>
        ))}
      </div>
      <div className="hinDdB"></div>
      <div className="hinDdC">
        <div className="hinDdCa">
          <div className="hinDdCaA">DRAG</div>&nbsp;images here or&nbsp;
          <div className="hinDdCaA"> BROWSE</div>&nbsp;to upload
        </div>
        <div className="hinDdCb">CLEAR</div>
      </div>
    </div>
  );
}

function SelectButton({ dis, type, setType }) {
  return (
    <div className="hinDc">
      <div
        onClick={dis ? () => {} : () => setType(0)}
        className={"hinDcA" + (type === 0 ? " hinDcA_" : "")}
      >
        <div
          className={type === 0 ? "hinDcB_" : "hinDcB" + (dis ? "-dis" : "")}
        >
          Standard Product
        </div>
        <div className="hinDcC" />
        <div
          className={type === 0 ? " hinDcD_" : "hinDcD" + (dis ? "-dis" : "")}
        >
          This product has one SKU with its own inventory
        </div>
      </div>
      <div
        onClick={dis ? () => {} : () => setType(1)}
        className={"hinDcA" + (type === 1 ? " hinDcA_" : "")}
      >
        <div
          className={type === 1 ? " hinDcB_" : "hinDcB" + (dis ? "-dis" : "")}
        >
          Product with Variants
        </div>
        <div className="hinDcC" />
        <div
          className={type === 1 ? " hinDcD_" : "hinDcD" + (dis ? "-dis" : "")}
        >
          These products have different attributes, like size or flavour. Each
          variant has a unique SKU and inventory level.
        </div>
      </div>
      <div
        onClick={dis ? () => {} : () => setType(2)}
        className={"hinDcA" + (type === 2 ? " hinDcA_" : "")}
      >
        <div
          className={type === 2 ? " hinDcB_" : "hinDcB" + (dis ? "-dis" : "")}
        >
          Composite Product
        </div>
        <div className="hinDcC" />
        <div
          className={type === 2 ? " hinDcD_" : "hinDcD" + (dis ? "-dis" : "")}
        >
          A composite contains one or more standard products. It has one SKU but
          adjusts inventory levels for each standard product.
        </div>
      </div>
    </div>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        ASSET ADDING FORM        ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ServiceForm({ state, setState }) {
  const { page, setPage } = state;
  if (page?.path !== "addService") return null;
  return (
    <StrictMode>
      <Header1 title="INVENTORY" bodyL={page.title} onTap={setPage} />
      <Header4 title={page.title} desc={page.desc} />
      <MyForm1 props={{ noHeader: true }} />
    </StrictMode>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        ASSET ADDING FORM        ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AssetForm({ state, setState }) {
  const { page, setPage } = state;
  if (page?.path !== "addAsset") return null;
  return (
    <StrictMode>
      <Header1 title="INVENTORY" bodyL={page.title} onTap={setPage} />
      <Header4 title={page.title} desc={page.desc} />
      <MyForm1 props={{ noHeader: true }} />
    </StrictMode>
  );
}
