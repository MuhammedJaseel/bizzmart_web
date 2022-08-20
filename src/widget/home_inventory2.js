import React, { StrictMode } from "react";
import { postInventoryProduct, setInventory } from "../method/home_inventory";
import {
  inventoryFormData,
  inventoryPages,
  prodectTypes,
} from "../module/home_inventory";
import { Header1, Header4 } from "./widget";
import { AddingForm1, AddingForm2 } from "./widget_form";
import { AddingFormLayout, FormSwitch, MyForm1 } from "./widget_form";
import { WidgetPopUp1, WidgetPopUp1Body } from "./widget_popup";
import { WidgetPopUp1In1 } from "./widget_popup";

export default function HomeInventoryForms({ state, setState }) {
  return (
    <StrictMode>
      <ProductForm state={state} setState={setState} />
      {/* <ServiceForm state={state} setState={setState} /> */}
      <AssetForm state={state} setState={setState} />
    </StrictMode>
  );
}

function ProductForm({ state, setState }) {
  const { page, setPage, product, isEdit } = state;
  const { allKot, allUnits, allCategoty, allTax } = state;
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
  const t3 = "VARIANT INFORMATION";
  const d3 = (
    <StrictMode>
      What all variants are you planning for this product? <br />
      <br />
      You can set product variants and sub classifications with SKU, Pricing and
      listing details in this section.
      <br />
      <br />
      Choose up to two variable attributes for your product to create and manage
      SKUs and their inventory levels.
    </StrictMode>
  );
  const t4 = "MODIFIER SETTINGS";
  const d4 = (
    <StrictMode>
      What all variants are you planning for this product? <br />
      <br />
      You can set product variants and sub classifications with SKU, Pricing and
      listing details in this section.
      <br />
      <br />
      Choose up to two variable attributes for your product to create and manage
      SKUs and their inventory levels.
    </StrictMode>
  );

  const title = isEdit ? page?.editTitle : page?.title;

  if (page?.path === "addProdect" || page?.path === "addService")
    return (
      <form
        onChange={(e) => {
          const prop = e.target.id;
          if (prop === "") return;
          const value = e.target.value;
          product[prop] = value;
          setState({ product });
        }}
        onSubmit={(e) => {
          e.preventDefault();
          postInventoryProduct(state, setState);
        }}
      >
        <Header1 title="INVENTORY" bodyL={page.title} onTap={setPage} />
        <div className="hinD">
          <Header4 title={title} desc={page.desc} />
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
                    <option key={k} value={it}>
                      {it}
                    </option>
                  ))}
                </select>
                <select className="hinDaA" id="category_id">
                  <option hidden> Select Category</option>
                  {allCategoty.map((it, k) => (
                    <option key={k} value={it.id}>
                      {it.name}
                    </option>
                  ))}
                </select>
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
                value={product.manage_stock === 1}
                onTap={() => {
                  product.manage_stock = product.manage_stock === 1 ? 0 : 1;
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
                <select className="hinDaB" id="primary_unit">
                  <option hidden>Select Unit</option>
                  {allUnits.map((it, k) => (
                    <option value={JSON.stringify(it)}>{it.title}</option>
                  ))}
                </select>
                <select className="hinDaB" id="secondry_unit">
                  <option hidden>Select alternate unit (optional)</option>
                  <option value="">NONE</option>
                  {allUnits.map((it, k) => (
                    <option value={JSON.stringify(it)}>{it.title}</option>
                  ))}
                </select>
                <div className="hinDaB">
                  {product.secondry_unit !== "" ? (
                    <StrictMode>
                      {product.isUseSecondryUnit ? (
                        <div className="hinDaBa">
                          {/* {JSON.parse(product.primary_unit)?.title} = */}
                        </div>
                      ) : (
                        <div className="hinDaBa">
                          {/* {JSON.parse(product.secondry_unit)?.title} = */}
                        </div>
                      )}
                      <input
                        className="hinDaBb"
                        type="number"
                        id="conversion"
                      />
                      {product.isUseSecondryUnit ? (
                        <div className="hinDaBa">
                          {/* {JSON.parse(product.secondry_unit).title} */}
                        </div>
                      ) : (
                        <div className="hinDaBa">
                          {/* {JSON.parse(product.primary_unit).title} */}
                        </div>
                      )}
                      <div
                        className="hinDaBc"
                        onClick={() =>
                          setState({
                            product: {
                              ...product,
                              isUseSecondryUnit: !product.isUseSecondryUnit,
                            },
                          })
                        }
                      />
                    </StrictMode>
                  ) : null}
                </div>
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
                <select className="hinDaB" id="selling_tax">
                  <option hidden>Select tax slab</option>
                  {allTax.map((it, k) => (
                    <option value={JSON.stringify(it)}>{it.name}</option>
                  ))}
                </select>
                <select className="hinDaB" id="tax_inclusion">
                  <option hidden>Select tax type</option>
                  <option value="Inclusive">Inclusive</option>
                  <option value="Exclusive">Exclusive</option>
                </select>
                <input
                  className="hinDaB"
                  placeholder="Only numeric characters"
                  id="hsncode"
                  defaultValue={product.hsncode}
                />
              </div>
            </AddingForm1>
            <AddingForm1 title="Sell online">
              <div className="hinDaG">
                <FormSwitch
                  value={product.is_online === 1}
                  onTap={() => {
                    product.is_online = product.is_online === 1 ? 0 : 1;
                    setState({ product });
                  }}
                />
                &nbsp; Make this product active and available for sale on all
                linked online channels
              </div>
            </AddingForm1>
            <AddingForm1 title="Upload images">
              <ImagePicker state={state} setState={setState} />
            </AddingForm1>
            <AddingForm1 title="Select production station">
              <select
                className="hinDa"
                onChange={(e) => {
                  const v = e.target.value;
                  product.product_kot.push(allKot[v]);
                  allKot.splice(v, 1);
                  setState(product, allKot);
                  e.target.selectedIndex = 0;
                }}
              >
                <option disabled>
                  Select a prodect station to your product
                </option>
                {allKot.map((it, k) => (
                  <option key={k} value={k}>
                    {it.name}
                  </option>
                ))}
              </select>
              <div className="hinDe">
                {product.product_kot.map((it, k) => (
                  <div className="hinDeA" key={k}>
                    {it.name}
                    <div
                      className="hinDeAa"
                      onClick={() => {
                        allKot.push(it);
                        product.product_kot.splice(k, 1);
                        setState(product, allKot);
                      }}
                    />
                  </div>
                ))}
              </div>
            </AddingForm1>
          </AddingFormLayout>
          {/*///////////////////////////////////////////////////////////////////////////////////////////////*/}
          <AddingFormLayout title={t2} desc={d2}>
            {product.is_service === 0 ? (
              <AddingForm1 title="Product type*">
                <SelectButton
                  edit
                  type={product.type}
                  setType={(v) =>
                    setState({ product: { ...product, type: v } })
                  }
                />
              </AddingForm1>
            ) : null}
            {product.type === 1 ? (
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
                      id="bar_code"
                      placeholder="Only uppercase letters and numbers"
                    />
                    <input
                      className="hinDaB"
                      id="ean"
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
                      id="purchase_price"
                      className="hinDaB"
                      placeholder="Enter cost / purchase price"
                    />
                    <select className="hinDaB">
                      <option hidden>Select Purchase Unit</option>
                      {product.primary_unit !== "" ? (
                        <option value={JSON.parse(product.primary_unit).id}>
                          {JSON.parse(product.primary_unit).title}
                        </option>
                      ) : null}
                      {product.secondry_unit !== "" ? (
                        <option value={JSON.parse(product.secondry_unit).id}>
                          {JSON.parse(product.secondry_unit).title}
                        </option>
                      ) : null}
                    </select>
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
                    <input
                      className="hinDaB"
                      id="mrp"
                      placeholder="Enter MRP"
                    />
                    <input
                      className="hinDaB"
                      id="selling_price"
                      placeholder="Enter selling price"
                    />
                    <input
                      id="online_price"
                      className="hinDaB"
                      placeholder="Enter online price"
                    />
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
                    <input
                      className="hinDaB"
                      id="opening_stock"
                      placeholder="0.00"
                      defaultValue={product.opening_stock}
                      type="number"
                    />
                    <input
                      className="hinDaB"
                      id="min_stock_level"
                      placeholder="Enter minimum stock level"
                      defaultValue={product.min_stock_level}
                    />
                    <div className="hinDaB" />
                  </div>
                </AddingForm1>
              </StrictMode>
            ) : null}
            {product.type === 2 ? (
              <StrictMode>
                <AddingForm2>
                  <div className="hinDaB">
                    Single Selectable* <sb>e.g. Colour, Size etc. </sb>
                  </div>
                </AddingForm2>
                <AddingForm1 title="Variant attribute 01*">
                  <div className="hinDa">
                    <input
                      className="hinDaC"
                      placeholder="Enter attribute title"
                      id="attributeName1"
                    />
                    <div
                      className="hinDaC_sideBtn"
                      onClick={() => {
                        if (product.attributeName1 !== "")
                          product.isAttributeName1 = true;
                        setState({ product });
                      }}
                    />
                    <input
                      className={
                        product.isAttributeName1 ? "hinDaD" : "hinDaD iamHidden"
                      }
                      placeholder="Enter values separate by comma and press enter"
                      id="attribute1"
                    />
                    <div
                      className={
                        product.isAttributeName1
                          ? "hinDaC_sideBtn"
                          : "hinDaC_sideBtn iamHidden"
                      }
                      onClick={() => {
                        if (product.attribute1 !== "")
                          product.isAttribute1 = true;
                        setState({ product });
                      }}
                    />
                    <div
                      className={
                        product.isAttribute1 ? "hinDaF" : "hinDaF iamHidden"
                      }
                    >
                      <FormSwitch
                        value={product.isPrimary}
                        onTap={() => {
                          product.isPrimary = !product.isPrimary;
                          setState({ product });
                        }}
                      />
                      <div>
                        Set as primary attribute
                        <div className="hinDaFa">
                          Prices will be binded with primary
                        </div>
                      </div>
                    </div>
                  </div>
                </AddingForm1>
                <AddingForm2>
                  <div
                    className={
                      product.isAttribute1 ? "hinDaB" : "hinDaB iamHidden"
                    }
                  >
                    Single Selectable <sb>e.g. Colour, Size etc. </sb>
                  </div>
                </AddingForm2>
                {product.isAttribute1 ? (
                  <AddingForm1 title="Variant attribute 02*">
                    <div className="hinDa">
                      <input
                        className={
                          product.isAttribute1 ? "hinDaC" : "hinDaC iamHidden"
                        }
                        placeholder="Enter attribute title"
                        id="attributeName2"
                      />
                      <div
                        className={
                          product.isAttribute1
                            ? "hinDaC_sideBtn"
                            : "hinDaC_sideBtn iamHidden"
                        }
                        onClick={() => {
                          if (product.attributeName2 !== "")
                            product.isAttributeName2 = true;
                          setState({ product });
                        }}
                      />
                      <input
                        className={
                          product.isAttributeName2
                            ? "hinDaD"
                            : "hinDaD iamHidden"
                        }
                        placeholder="Enter values separate by comma and press enter"
                        id="attribute2"
                      />
                      <div
                        className={
                          product.isAttributeName2
                            ? "hinDaC_sideBtn"
                            : "hinDaC_sideBtn iamHidden"
                        }
                        onClick={() => {
                          if (product.attribute2 !== "")
                            product.isAttribute2 = true;
                          setState({ product });
                        }}
                      />
                      <div className="hinDaF" />
                    </div>
                  </AddingForm1>
                ) : null}
                {product.isAttribute2 ? (
                  <AddingForm1>
                    <div className="hinDa">
                      <div
                        className="hinDaE"
                        onClick={() => setInventory(state, setState)}
                      >
                        SETUP INVENTORY
                      </div>
                    </div>
                  </AddingForm1>
                ) : null}
              </StrictMode>
            ) : null}
            {product.type === 3 ? (
              <StrictMode>
                <AddingForm1 title="Default Products*">
                  <div className="hinDa">
                    <div
                      className="hinDaE"
                      onClick={() => setState({ isAddProdectPop: true })}
                    >
                      + ADD PRODUCTS
                    </div>
                  </div>
                </AddingForm1>
              </StrictMode>
            ) : null}
          </AddingFormLayout>
          {product.type === 2 && product.variant_products.length > 0 ? (
            <AddingFormLayout title={t3} desc={d3}>
              <VariantProdectTable state={state} setState={setState} />
            </AddingFormLayout>
          ) : null}
          {product.is_service === 0 ? (
            <AddingFormLayout title={t4} desc={d4}>
              <AddingForm1 title="Sell online">
                <div className="hinDaG">
                  <FormSwitch
                    value={product.is_online === 1}
                    onTap={() => {
                      product.is_online = product.is_online === 1 ? 0 : 1;
                      setState({ product });
                    }}
                  />
                  &nbsp;Apply the modifiers saved against parent category
                </div>
              </AddingForm1>
            </AddingFormLayout>
          ) : null}

          <div className="hinDb">
            {isEdit ? <div className="hinDbA">DELETE PRODECT</div> : <div />}
            <div className="hinDbB">
              <div
                className="hinDbBa"
                onClick={() => {
                  if (product.is_service === 1)
                    state.setPage(inventoryPages[0][0].data[0]);
                  else state.setPage(inventoryPages[0][0].data[1]);
                }}
              >
                CANCEL
              </div>
              <button type="submit" className="hinDbBb">
                SAVE
              </button>
            </div>
          </div>
        </div>
        <InventoryAddProdectPop state={state} setState={setState} />
      </form>
    );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////   IMAGE PICKER FOR PRODECT IMAGE    ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////     PRODECT TYPE SELECT BUTTON      ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SelectButton({ dis, type, setType }) {
  return (
    <div className="hinDc">
      <div
        onClick={dis ? () => {} : () => setType(1)}
        className={"hinDcA" + (type === 1 ? " hinDcA_" : "")}
      >
        <div
          className={type === 1 ? "hinDcB_" : "hinDcB" + (dis ? "-dis" : "")}
        >
          Standard Product
        </div>
        <div className="hinDcC" />
        <div
          className={type === 1 ? " hinDcD_" : "hinDcD" + (dis ? "-dis" : "")}
        >
          This product has one SKU with its own inventory
        </div>
      </div>
      <div
        onClick={dis ? () => {} : () => setType(2)}
        className={"hinDcA" + (type === 2 ? " hinDcA_" : "")}
      >
        <div
          className={type === 2 ? " hinDcB_" : "hinDcB" + (dis ? "-dis" : "")}
        >
          Product with Variants
        </div>
        <div className="hinDcC" />
        <div
          className={type === 2 ? " hinDcD_" : "hinDcD" + (dis ? "-dis" : "")}
        >
          These products have different attributes, like size or flavour. Each
          variant has a unique SKU and inventory level.
        </div>
      </div>
      <div
        onClick={dis ? () => {} : () => setType(3)}
        className={"hinDcA" + (type === 3 ? " hinDcA_" : "")}
      >
        <div
          className={type === 3 ? " hinDcB_" : "hinDcB" + (dis ? "-dis" : "")}
        >
          Composite Product
        </div>
        <div className="hinDcC" />
        <div
          className={type === 3 ? " hinDcD_" : "hinDcD" + (dis ? "-dis" : "")}
        >
          A composite contains one or more standard products. It has one SKU but
          adjusts inventory levels for each standard product.
        </div>
      </div>
    </div>
  );
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////        ASSET ADDING FORM        ////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function ServiceForm({ state, setState }) {
//   const { page, setPage } = state;
//   if (page?.path !== "addAsset") return null;
//   return (
//     <StrictMode>
//       <Header1 title="INVENTORY" bodyL={page.title} onTap={setPage} />
//       <Header4 title={page.title} desc={page.desc} />
//       <MyForm1 props={{ noHeader: true }} />
//     </StrictMode>
//   );
// }

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////      VARIANT PRODECT TABLE      ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function VariantProdectTable({ state, setState }) {
  const { product } = state;
  const { variant_products } = product;

  return (
    <div className="hinDf">
      <div className="hinDfA">
        <div className="hinDfAa">Variant</div>
        <div className="hinDfAb">SKU</div>
        <div className="hinDfAb">EAN</div>
        <div className="hinDfAc">Stock</div>
        <div className="hinDfAc">MSL</div>
        <div className="hinDfAd">Cost*</div>
        <div className="hinDfAd">MRP*</div>
        <div className="hinDfAd">RRP</div>
        <div className="hinDfAc">Online Price</div>
      </div>
      {variant_products.map((it, k) => (
        <div key={k} className="hinDfB">
          <div className="hinDfAa">{it.variant_name}</div>
          <input
            className="hinDfAb hinDfBa"
            onChange={(e) => (it.bar_code = e.target.value)}
          />
          <input
            className="hinDfAb hinDfBa"
            onChange={(e) => (it.ean = e.target.value)}
          />
          <input
            className="hinDfAc hinDfBa"
            onChange={(e) => (it.opening_stock = e.target.value)}
          />
          <input
            className="hinDfAc hinDfBa"
            onChange={(e) => (it.min_stock_level = e.target.value)}
          />
          <input
            className="hinDfAd hinDfBa"
            onChange={(e) => (it.cost_price = e.target.value)}
            placeholder="0.00"
          />
          <input
            className="hinDfAd hinDfBa"
            onChange={(e) => (it.mrp = e.target.value)}
            placeholder="0.00"
          />
          <input
            className="hinDfAd hinDfBa"
            onChange={(e) => (it.selling_price = e.target.value)}
            placeholder="0.00"
          />
          <input
            className="hinDfAc hinDfBa"
            onChange={(e) => (it.online_price = e.target.value)}
            placeholder="0.00"
          />
        </div>
      ))}
    </div>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////     INVENTORY PRODECT POPUP     ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function InventoryAddProdectPop({ state, setState }) {
  const { loading, error, isAddProdectPop } = state;
  const body = {
    title: (
      <StrictMode>
        Add Products <span className="hinDh">iPhone 13 Bundle</span>
      </StrictMode>
    ),
    desc: "Add default products for this bundle",
    close: () => setState({ isAddProdectPop: false }),
    // submit: () => postMember(addMember, state, setState),
    loading,
    error,
  };
  if (isAddProdectPop)
    return (
      <WidgetPopUp1 props={body}>
        <WidgetPopUp1Body>
          <WidgetPopUp1In1 title={"Partner Name*"}>
            <select
              className="htmA"
              placeholder="Enter partner’s full name"
              id="name"
            >
              <option hidden> Select product</option>
            </select>
          </WidgetPopUp1In1>
        </WidgetPopUp1Body>
      </WidgetPopUp1>
    );
}
