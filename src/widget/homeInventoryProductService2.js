import React, { StrictMode, useRef } from "react";
import { postInventoryProduct, setInventory } from "../method/homeInventory";
import { prodectTypes } from "../module/homeInventory";
import { addProdectTitles } from "../module/homeInventory1";
import { AssetForm } from "./homeInventoryAssest";
import { Header1, Header4 } from "./widget";
import WidgetFooterSubmit from "./widget_footer";
import { AddingForm1, AddingForm2 } from "./widget_form";
import { AddingFormLayout, FormSwitch, MyForm1 } from "./widget_form";

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
  const { page, product, loading, error } = state;
  const { allKot, allUnits, allCategoty, allTax } = state;

  const conRef = useRef(null);

  if (product === null) return null;
  const isEdit = product?.hasOwnProperty("id");
  const title = isEdit ? page?.editTitle : page?.title;
  return (
    <form
      onChange={(e) => {
        setState({ product });
        if (e.target.id === "") return;
        const value = e.target.value;
        product[e.target.id] = value;
        setState({ product });
      }}
    >
      <Header1
        title="INVENTORY"
        bodyL={page?.title}
        onTap={() => setState({ page: null, product: null })}
      />
      <div className="hinD">
        <Header4 title={title} desc={page?.desc} />
        {/*///////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////         COMMEN VALUES         ///////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////*/}
        <AddingFormLayout
          title={addProdectTitles.general.t}
          desc={addProdectTitles.general.d}
        >
          <AddingForm1 title="Product name *">
            <input
              className="hinDa"
              placeholder="Enter a name for your product"
              onChange={(e) => (product.product_name = e.target.value)}
              value={product?.product_name}
            />
          </AddingForm1>
          <AddingForm2>
            <div className="hinDaA">Select product type</div>
            <div className="hinDaA">Category *</div>
          </AddingForm2>
          <AddingForm1 title="Inventory type *">
            <div className="hinDa">
              <select
                className="hinDaA"
                onChange={(e) => (product.inventory_type = e.target.value)}
                value={product?.inventory_type}
              >
                <option hidden> Select prodect type</option>
                {prodectTypes.map((it, k) => (
                  <option key={k} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </select>
              <select
                className="hinDaA"
                onChange={(e) => (product.category_id = e.target.value)}
                value={product?.category_id}
              >
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
              onChange={(e) => (product.product_description = e.target.value)}
              value={product?.product_description}
            />
          </AddingForm1>
          <AddingForm1 title="Manage stock">
            <FormSwitch
              value={product?.manage_stock === 1}
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
              <select
                className="hinDaB"
                onChange={(e) => (product.primary_unit = e.target.value)}
                value={product?.primary_unit}
              >
                <option hidden>Select Unit</option>
                {allUnits.map((it, k) => (
                  <option value={it.title}>{it.title}</option>
                ))}
              </select>
              <select
                className="hinDaB"
                onChange={(e) => (product.secondry_unit = e.target.value)}
                defaultValue={product?.secondry_unit}
              >
                <option hidden>Select alternate unit (optional)</option>
                <option value="">NONE</option>
                {allUnits.map((it, k) => (
                  <option value={it.title}>{it.title}</option>
                ))}
              </select>
              <div className="hinDaB">
                {product?.secondry_unit !== "" ? (
                  <StrictMode>
                    <div className="hinDaBa">
                      1{" "}
                      {product?.secUnit
                        ? product?.primary_unit
                        : product?.secondry_unit}
                    </div>
                    <input
                      className="hinDaBb"
                      type="number"
                      id="conversion"
                      ref={conRef}
                      value={product.conversion}
                      placeholder="0.00"
                    />
                    <div className="hinDaBa">
                      {!product?.secUnit
                        ? product?.primary_unit
                        : product?.secondry_unit}
                    </div>
                    <div
                      className="hinDaBc"
                      onClick={() => {
                        conRef.current.value = 1 / product?.conversion;
                        product.conversion = 1 / product?.conversion;
                        product.secUnit = !product?.secUnit;
                        setState({ product });
                      }}
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
              <select
                className="hinDaB"
                id="selling_tax"
                defaultValue={product?.selling_tax}
              >
                <option hidden>Select tax slab</option>
                {allTax.map((it, k) => (
                  <option key={k} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </select>
              <select
                className="hinDaB"
                value={product?.tax_inclusion}
                onChange={(e) => (product.tax_inclusion = e.target.value)}
              >
                <option hidden>Select tax type</option>
                <option value="Inclusive">Inclusive</option>
                <option value="Exclusive">Exclusive</option>
              </select>
              <input
                className="hinDaB"
                placeholder="Only numeric characters"
                id="hsncode"
                defaultValue={product?.hsncode}
              />
            </div>
          </AddingForm1>
          <AddingForm1 title="Sell online">
            <div className="hinDaG">
              <FormSwitch
                value={product?.is_online === 1}
                onTap={() => {
                  product.is_online = product?.is_online === 1 ? 0 : 1;
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
          <AddingForm1 title="Set category default prodection station">
            <div className="hinDaG">
              <FormSwitch
                value={product?.category_default_kot === 1}
                onTap={() => {
                  product.category_default_kot =
                    product?.category_default_kot === 1 ? 0 : 1;
                  setState({ product });
                }}
              />
            </div>
          </AddingForm1>
          <AddingForm1 title="Select production station">
            <select
              className="hinDa"
              id="product_kot"
              defaultValue={product?.product_kot}
              disabled={product?.category_default_kot === 1}
            >
              <option hidden>Select a prodect station to your product</option>
              {allKot.map((it, k) => (
                <option key={it.id} value={k}>
                  {it.title}
                </option>
              ))}
            </select>
          </AddingForm1>
        </AddingFormLayout>
        {/*///////////////////////////////////////////////////////////////////////////////////////////////*/}
        <AddingFormLayout
          title={addProdectTitles?.inventory?.t}
          desc={addProdectTitles?.inventory?.d}
        >
          {/* {product?.is_service === 0 ? (
            <AddingForm1 title="Product type*">
              <SelectButton
                isEdit
                type={product.type}
                setType={(v) =>
                  setState({
                    product: { ...product, type: v, variant_products: [] },
                  })
                }
              />
            </AddingForm1>
          ) : null} */}
          {/*///////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////      STARNDERD PRODUCT      ///////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////// */}
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
                    type="number"
                    placeholder="Enter cost / purchase price"
                  />
                  <select className="hinDaB">
                    <option hidden>Select Purchase Unit</option>
                    {product?.primary_unit !== "" ? (
                      <option value={product?.primary_unit}>
                        {product?.primary_unit}
                      </option>
                    ) : null}
                    {product?.secondry_unit !== "" ? (
                      <option value={product?.secondry_unit}>
                        {product?.secondry_unit}
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
                    type="number"
                  />
                  <input
                    className="hinDaB"
                    id="selling_price"
                    placeholder="Enter selling price"
                    type="number"
                  />
                  <input
                    id="online_price"
                    className="hinDaB"
                    placeholder="Enter online price"
                    type="number"
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
                    defaultValue={product?.opening_stock}
                    type="number"
                  />
                  <input
                    className="hinDaB"
                    id="min_stock_level"
                    placeholder="Enter minimum stock level"
                    defaultValue={product?.min_stock_level}
                  />
                  <div className="hinDaB" />
                </div>
              </AddingForm1>
            </StrictMode>
          ) : null}
          {/*///////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////       VARIANT PRODUCT       ///////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////// */}
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
                      if (product?.attributeName1 !== "")
                        product.isAttributeName1 = true;
                      setState({ product });
                    }}
                  />
                  <input
                    className={
                      product?.isAttributeName1 ? "hinDaD" : "hinDaD iamHidden"
                    }
                    onChange={() => {
                      product.classification = [];
                      setState({ product });
                    }}
                    placeholder="Enter values separate by comma and press enter"
                    id="attribute1"
                  />
                  <div
                    className={
                      product?.isAttributeName1
                        ? "hinDaC_sideBtn"
                        : "hinDaC_sideBtn iamHidden"
                    }
                    onClick={() => {
                      if (product?.attribute1 !== "")
                        product.isAttribute1 = true;
                      setState({ product });
                    }}
                  />
                  <div
                    className={
                      product?.isAttribute1 ? "hinDaF" : "hinDaF iamHidden"
                    }
                  >
                    <FormSwitch
                      value={product?.isPrimary}
                      onTap={() => {
                        product.isPrimary = !product?.isPrimary;
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
                    product?.isAttribute1 ? "hinDaB" : "hinDaB iamHidden"
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
                        product?.isAttribute1 ? "hinDaC" : "hinDaC iamHidden"
                      }
                      placeholder="Enter attribute title"
                      id="attributeName2"
                    />
                    <div
                      className={
                        product?.isAttribute1
                          ? "hinDaC_sideBtn"
                          : "hinDaC_sideBtn iamHidden"
                      }
                      onClick={() => {
                        if (product?.attributeName2 !== "")
                          product.isAttributeName2 = true;
                        setState({ product });
                      }}
                    />
                    <input
                      className={
                        product?.isAttributeName2
                          ? "hinDaD"
                          : "hinDaD iamHidden"
                      }
                      placeholder="Enter values separate by comma and press enter"
                      id="attribute2"
                    />
                    <div
                      className={
                        product?.isAttributeName2
                          ? "hinDaC_sideBtn"
                          : "hinDaC_sideBtn iamHidden"
                      }
                      onClick={() => {
                        if (product?.attribute2 !== "")
                          product.isAttribute2 = true;
                        setState({ product });
                      }}
                    />
                    <div className="hinDaF" />
                  </div>
                </AddingForm1>
              ) : null}
              <AddingForm2>
                <div
                  className={
                    product?.isAttribute2 ? "hinDaB" : "hinDaB iamHidden"
                  }
                >
                  Multiple Selectable <sb>e.g. Toppings, Drinks etc. </sb>
                </div>
              </AddingForm2>
              {product?.isAttribute2 ? (
                <AddingForm1>
                  <div className="hinDa">
                    <input
                      className={
                        product?.isAttribute2 ? "hinDaC" : "hinDaC iamHidden"
                      }
                      placeholder="Enter attribute title"
                      id="attribute_title"
                    />
                    <div
                      className="hinDaC_sideBtn"
                      onClick={() => {
                        if (product.attribute_title !== "")
                          setState({ addToppings: [] });
                      }}
                    />
                    {product.classification.length !== 0 ? (
                      <div className="hinDaJ">
                        {product.classification.map((it, k) => (
                          <div
                            key={k}
                            className={
                              it.is_default === 1 ? "hinDaJa_g" : "hinDaJa"
                            }
                          >
                            <div className="hinDaJaA">{it.topping_title}</div>
                            {it.charge_amount}-{it.variant_title}
                            <div
                              className="hinDaJaB"
                              onClick={() => {
                                product.classification.splice(k, 1);
                                setState({ product });
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="hinDaJ iamHidden" />
                    )}
                  </div>
                </AddingForm1>
              ) : null}
              {product?.isAttribute2 ? (
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
          <InventoryCompositProduct state={state} setState={setState} />
        </AddingFormLayout>
        {/*///////////////////////////////////////////////////////////////////////////////////////
          //////////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////    COMPOSIT PRODUCT PRICING    /////////////////////////////
          //////////////////////////////////////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////////////////////////////////// */}
        {product?.isCompositSetted ? (
          <AddingFormLayout
            title={addProdectTitles.product?.t}
            desc={addProdectTitles.product?.d}
          >
            <AddingForm2>
              <div className="hinDaB">
                Barcode / SKU <sb>Autogenerated once left blank</sb>
              </div>
            </AddingForm2>
            <AddingForm1 title="Bundle code *">
              <div className="hinDa">
                <input
                  className="hinDaB"
                  id="bar_code"
                  placeholder="Alapha numeric in caps, no special chars"
                />
              </div>
            </AddingForm1>
            <AddingForm2>
              <div className="hinDaB">MRP *</div>
              <div className="hinDaB">RRP</div>
              <div className="hinDaB">Online price</div>
            </AddingForm2>
            <AddingForm1 title="Selling information *">
              <div className="hinDa">
                <input
                  className="hinDaB"
                  type="number"
                  id="mrp"
                  placeholder="Enter MRP"
                />
                <input
                  className="hinDaB"
                  id="selling_price"
                  placeholder="Enter selling price"
                  type="number"
                />
                <input
                  id="online_price"
                  type="number"
                  className="hinDaB"
                  placeholder="Enter online price"
                />
              </div>
            </AddingForm1>
          </AddingFormLayout>
        ) : null}
        {product?.type === 2 && product?.variant_products.length > 0 ? (
          <AddingFormLayout
            title={addProdectTitles.variant.t}
            desc={addProdectTitles.variant.d}
          >
            <VariantProdectTable state={state} setState={setState} />
          </AddingFormLayout>
        ) : null}
        {/*///////////////////////////////////////////////////////////////////////////////////////
          //////////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////     ADD MODIFIER PRODUCT      //////////////////////////////
          //////////////////////////////////////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////////////////////////////////// */}
        {product?.is_service === 0 ? (
          <AddingFormLayout
            title={addProdectTitles.modifier.t}
            desc={addProdectTitles.modifier.d}
          >
            <AddingForm1 title="Apply category defaults">
              <div className="hinDaG">
                <FormSwitch
                  value={product?.category_default_modifier === 1}
                  onTap={() => {
                    product.category_default_modifier =
                      product?.category_default_modifier === 1 ? 0 : 1;
                    setState({ product });
                  }}
                />
                &nbsp;Apply the modifiers saved against parent category
              </div>
            </AddingForm1>
            <AddingForm2>
              <div>
                Multiple Selectable <sb>e.g. No sugar, cook well etc.</sb>
              </div>
            </AddingForm2>
            <AddingForm1 title="Selling info *">
              <div className="hinDa">
                <div
                  className="hinDaE"
                  onClick={() => setState({ isModifer: true })}
                >
                  + ADD MODIFIERS
                </div>
                {product?.product_modifier?.length !== 0 ? (
                  <div className="hinDaH">
                    {product?.product_modifier?.map((it, k) => (
                      <div className="hinDaHa" key={k}>
                        {it.title}
                        <div className="hinDaHb">{it.charge}</div>
                        <div
                          className="hinDaHc"
                          onClick={() => {
                            product?.product_modifier.splice(k, 1);
                            setState({ product });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </AddingForm1>
          </AddingFormLayout>
        ) : null}
      </div>
      <WidgetFooterSubmit
        props={{
          isEdit,
          onTap: () => postInventoryProduct(state, setState),
          onCancel: () => setState({ page: null }),
          loading,
          error,
        }}
      />
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
  const { product } = state;
  const { image } = product;
  const refForKey = useRef(null);
  return (
    <div className="hinDd">
      <div className="hinDdA">
        {image?.length !== 0 ? (
          image?.map((it, k) => (
            <div
              key={k}
              className={k === 0 ? "hinDdAa_pr" : "hinDdAa"}
              style={{
                backgroundImage: `url( ${
                  typeof it === "string" ? it : URL.createObjectURL(it)
                })`,
              }}
              draggable
            >
              <div className="hinDdAaA">
                <div
                  className="hinDdAaAa"
                  onClick={() => {
                    product?.image.splice(k, 1);
                    setState({ product });
                  }}
                />
              </div>
              <div className="hinDdAaB">
                Drag to
                <br />
                reorder
              </div>
              <div />
            </div>
          ))
        ) : (
          <div className="hinDdAb" onClick={() => refForKey.current.click()} />
        )}
        <input
          ref={refForKey}
          type="file"
          className="hinDdAc"
          multiple
          onChange={(e) => {
            for (let i = 0; i < e.target.files.length; i++)
              if (e.target.files[0].type.split("/")[0] === "image")
                product?.image.push(e.target.files[i]);
            setState({ product });
          }}
        />
      </div>
      <div className="hinDdB"></div>
      <div className="hinDdC">
        <div className="hinDdCa">
          <div className="hinDdCaA">DRAG</div>&nbsp;images here or&nbsp;
          <div className="hinDdCaA" onClick={() => refForKey.current.click()}>
            BROWSE
          </div>
          &nbsp;to upload
        </div>
        <div
          className="hinDdCb"
          onClick={() => {
            product.image = [];
            setState({ product });
          }}
        >
          CLEAR
        </div>
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
            type="number"
            onChange={(e) => (it.opening_stock = e.target.value)}
          />
          <input
            className="hinDfAc hinDfBa"
            type="number"
            onChange={(e) => (it.min_stock_level = e.target.value)}
          />
          <input
            className="hinDfAd hinDfBa"
            type="number"
            onChange={(e) => (it.cost_price = e.target.value)}
            placeholder="0.00"
          />
          <input
            className="hinDfAd hinDfBa"
            onChange={(e) => (it.mrp = e.target.value)}
            placeholder="0.00"
            type="number"
          />
          <input
            className="hinDfAd hinDfBa"
            onChange={(e) => (it.selling_price = e.target.value)}
            placeholder="0.00"
            type="number"
          />
          <input
            className="hinDfAc hinDfBa"
            onChange={(e) => (it.online_price = e.target.value)}
            placeholder="0.00"
            type="number"
          />
        </div>
      ))}
    </div>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////     INVENTORY COMPOSIT PRODECT     ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function InventoryCompositProduct({ state, setState }) {
  const { product } = state;
  const { default_composites, selectable_composites, type } = product;
  if (type !== 3) return null;

  const setAddType = () => {
    if (default_composites?.length === 0) return 0;
    return selectable_composites.length + 1;
  };

  return (
    <StrictMode>
      {default_composites?.length !== 0 ? (
        <StrictMode>
          <AddingForm2>
            <div className="hinDaA">
              Default products{" "}
              <sb>These products will be added in to the cart</sb>
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setState({ addProdectPop: 0 })}
            >
              Edit
            </div>
          </AddingForm2>
          <AddingForm1 title="Default Products*">
            <div className="hinDaH_">
              {default_composites[0]?.composites?.map((it, k) => (
                <div className="hinDaHa" key={k}>
                  {it.name}
                  <div className="hinDaHb">{it.cost}</div>
                  <div
                    className="hinDaHc"
                    onClick={() => {
                      default_composites[0]?.composites.splice(k, 1);
                      if (default_composites[0]?.composites.length === 1)
                        product.default_composites = [];
                      setState({ product });
                    }}
                  />
                </div>
              ))}
            </div>
          </AddingForm1>
        </StrictMode>
      ) : null}
      {selectable_composites?.map((it, k) => (
        <StrictMode>
          <AddingForm2>
            <div className="hinDaA">
              {it.composite_name} <sb>Select</sb> {it.selectable}{" "}
              <sb>Select</sb>
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setState({ addProdectPop: k + 1 })}
            >
              Edit
            </div>
          </AddingForm2>
          <AddingForm1 title="Default Products*">
            <div className="hinDaH_">
              {it.composites?.map((it, k) => (
                <div className="hinDaHa" key={k}>
                  {it.name}
                  <div className="hinDaHb">{it.cost}</div>
                  <div
                    className="hinDaHc"
                    onClick={() => {
                      it.composites.splice(k, 1);
                      if (it.composites.length === 1)
                        product.selectable_composites = [];
                      setState({ product });
                    }}
                  />
                </div>
              ))}
            </div>
          </AddingForm1>
        </StrictMode>
      ))}
      <AddingForm1 title="Default Products*">
        <div className="hinDa">
          <div
            className="hinDaE"
            onClick={() => setState({ addProdectPop: setAddType() })}
          >
            + ADD PRODUCTS
          </div>
          {default_composites.length !== 0 ? (
            <div
              className="hinDaE"
              onClick={() => {
                product.isCompositSetted = true;
                setState({ product });
              }}
            >
              SETUP INVENTORY
            </div>
          ) : null}
        </div>
      </AddingForm1>
    </StrictMode>
  );
}
