import { StrictMode } from "react";

export const addProdectTitles = {
  general: {
    t: "GENERAL DETAILS",
    d: (
      <StrictMode>
        What all are the general information about your new product? <br />
        <br />
        Add product name, supplier info, tags, product description and images
        for your new product in this section.
      </StrictMode>
    ),
  },
  inventory: {
    t: "INVENTORY INFORMATION",
    d: (
      <StrictMode>
        How you want to store, list, track and sell your new product?
        <br />
        <br />
        You can set product supply details, suppliers, selling channels, supply
        & sales details in this section.
      </StrictMode>
    ),
  },
  modifier: {
    t: "MODIFIER SETTINGS",
    d: (
      <StrictMode>
        What all variants are you planning for this product? <br />
        <br />
        You can set product variants and sub classifications with SKU, Pricing
        and listing details in this section.
        <br />
        <br />
        Choose up to two variable attributes for your product to create and
        manage SKUs and their inventory levels.
      </StrictMode>
    ),
  },
  variant: {
    t: "VARIANT INFORMATION",
    d: (
      <StrictMode>
        What all variants are you planning for this product? <br />
        <br />
        You can set product variants and sub classifications with SKU, Pricing
        and listing details in this section.
        <br />
        <br />
        Choose up to two variable attributes for your product to create and
        manage SKUs and their inventory levels.
      </StrictMode>
    ),
  },
  product: {
    t: "PRODUCT COMPOSITION",
    d: (
      <StrictMode>
        What products you planning for compositing within this product?
        <br />
        <br />
        You can add products from your existing list of items and sell as a
        composite product. You can set a custom price for the new product.
      </StrictMode>
    ),
  },
};
