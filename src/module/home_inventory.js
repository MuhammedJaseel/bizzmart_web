export const prodectTypes = [
  "Stock",
  "Raw Material",
  "Ingredient",
  "Operational Item",
  "Consumabl",
];

export const inventoryPages = [
  [
    {
      t: "Product managemet",
      t1: "Add and manage the products and services you're dealing with",
      data: [
        {
          path: "prodect",
          t: "Add Products >",
          d: "What products are you providing?",
          d1: "Add all the products your business offering to its customers",
          title: "Product List",
          desc: "Shows all the team members recorded against your business",
          heads: [
            null,
            "Product Name",
            "Code",
            "Category",
            "Type",
            "Cost",
            "Selling",
            "MRP",
            "Tax",
            "Stock",
            "MSL",
          ],
          widths: [
            { width: 4 },
            { width: 20 },
            { width: 9 },
            { width: 11 },
            { width: 8 },
            { width: 8 },
            { width: 9 },
            { width: 9 },
            { width: 9 },
            { width: 7 },
            { width: 4 },
          ],
        },
        {
          t: "Add Services >",
          d: "What services are you providing?",
          d1: "Add all the services your business offering to its customers",
          path: "service",
          title: "Service List",
          desc: "Shows all the team members recorded against your business",
          heads: [
            null,
            "Product Name",
            "Code",
            "Category",
            "Type",
            "Cost",
            "Selling",
            "MRP",
            "Tax",
            "Stock",
            "MSL",
          ],
          widths: [
            { width: 4 },
            { width: 20 },
            { width: 9 },
            { width: 11 },
            { width: 8 },
            { width: 8 },
            { width: 9 },
            { width: 9 },
            { width: 9 },
            { width: 7 },
            { width: 4 },
          ],
        },
        {
          t: "Add Assets >",
          d: "How you are managing your assets to run your business?",
          d1: "Add all the assets your business own",
          path: "asset",
          title: "Asset List",
          desc: "Shows all the team members recorded against your business",
          heads: [
            null,
            "Asset detail",
            "Category",
            "Branch",
            "Custodian",
            "Date bougth",
            "Cost",
            "Book value",
          ],
          widths: [
            { width: 4 },
            { width: 20 },
            { width: 15 },
            { width: 10 },
            { width: 15 },
            { width: 10 },
            { width: 10 },
            { width: 10 },
          ],
        },
      ],
    },
    {
      t: "Price management",
      t1: "Manage prices of your products and services",
      data: [
        {
          t: "Price Lookup >",
          d: "What are the prices you set for the products you are selling?",
          d1: "Shows prices across all the connected branches",
          path: "priceLookup",
          t2: "PRICE LOOKUP",
          title: "Price Lookup",
          desc: "Shows prices across all the connected branches",
          heads: [
            null,
            "Product Name",
            "Code",
            "Category",
            "Type",
            "Cost",
            "Selling",
            "MRP",
            "Tax",
            "Stock",
            "MSL",
          ],
          widths: [
            { width: 4 },
            { width: 20 },
            { width: 9 },
            { width: 11 },
            { width: 8 },
            { width: 8 },
            { width: 9 },
            { width: 9 },
            { width: 9 },
            { width: 7 },
            { width: 4 },
          ],
        },
        {
          t: "Stock Lookup >",
          d: "What is the current stock position across the branches?",
          d1: "Shows stock positions across all the connected branches",
          path: "stockLookup",
          title: "Stock Lookup",
          desc: "Shows stock positions across all the connected branches",
          heads: [
            null,
            "Product Name",
            "Code",
            "Category",
            "Type",
            "Stock (Primary)",
            "Stock (Secondary)",
          ],
          widths: [
            { width: 4 },
            { width: 25 },
            { width: 20 },
            { width: 20 },
            { width: 10 },
            { width: 10 },
            { width: 8 },
          ],
        },
        {
          t: "Price Change >",
          d: "Do you want to manage the prices you are selling?",
          d1: "You can change price branch level or global business level here",
          path: "priceCharge",
          title: "Price Charge",
          desc: "You can change price branch level or global business level here",
          heads: [
            null,
            "Product Name",
            "Code",
            "Category",
            "Type",
            "Cost",
            "Selling",
            "MRP",
            "Tax",
            "Stock",
            "MSL",
          ],
          widths: [
            { width: 4 },
            { width: 20 },
            { width: 9 },
            { width: 11 },
            { width: 8 },
            { width: 8 },
            { width: 9 },
            { width: 9 },
            { width: 9 },
            { width: 7 },
            { width: 4 },
          ],
        },
        {
          t: "MSL Lookup >",
          d: "Want to lookup the products below minimum stock level?",
          d1: "Shows the items below MSL level at the branch level",
          path: "mslLookup",
          title: "MSL Lookupt",
          desc: "Shows prices across all the connected branches",
          heads: [
            null,
            "Product Name",
            "Code",
            "Category",
            "Type",
            "MSL",
            "Stock",
            "Difference",
          ],
          widths: [
            { width: 4 },
            { width: 25 },
            { width: 15 },
            { width: 15 },
            { width: 10 },
            { width: 10 },
            { width: 10 },
            { width: 10 },
          ],
        },
      ],
    },
  ],
  [
    {
      t: "Inventory management",
      t1: "Manage all the required inventory operations here",
      data: [
        {
          t: "Stock Issue >",
          d: "Do you want to issue stock from your main branch to another?",
          d1: "Issue stock from your main branch to connected branches",
          path: "stockIssue",
          title: "Stock Issue",
          desc: "Issue stock from your main branch to connected branches",
          heads: [
            null,
            "Transaction #",
            "Date",
            "Transfer To",
            "Description",
            "Count",
            "Amount",
            "Status",
          ],
          widths: [
            { width: 1 },
            { width: 15 },
            { width: 15 },
            { width: 15 },
            { width: 15 },
            { width: 15 },
            { width: 15 },
            { width: 8 },
          ],
        },
        {
          t: "Stock Transfer >",
          d: "Do you want to transfer an item from a branch to another?",
          d1: "Transfer stock from one branch to another",
          path: "stockTransfer",
          title: "Stock Transfer",
          desc: "Transfer stock from one branch to another",
          heads: [
            null,
            "Transaction #",
            "Date",
            "Transfer From",
            "Transfer To",
            "Description",
            "Count",
            "Amount",
            "Status",
          ],
          widths: [
            { width: 1 },
            { width: 12 },
            { width: 12 },
            { width: 12 },
            { width: 12 },
            { width: 12 },
            { width: 12 },
            { width: 12 },
            { width: 8 },
          ],
        },
        {
          t: "Stock Received >",
          d: "Do you want to record stock received entry at the branch level?",
          d1: "Record entry against a stock transfer or a stock issue at the branch level",
          path: "stockReceived",
          title: "Stock Issue",
          desc: "Issue stock from your main branch to connected branches",
          heads: [
            null,
            "Transaction #",
            "Date",
            "Transfer From",
            "Description",
            "Count",
            "Amount",
          ],
          widths: [
            { width: 1 },
            { width: 16 },
            { width: 16 },
            { width: 16 },
            { width: 16 },
            { width: 16 },
            { width: 10 },
          ],
        },
        {
          t: "Stock Return >",
          d: "How you can return a stock item to main branch or your supplier?",
          d1: "Record a stock return transaction at the branch level",
          path: "stockReturn",
          title: "Stock Issue",
          desc: "Issue stock from your main branch to connected branches",
          heads: [
            null,
            "Transaction #",
            "Date",
            "Transfer To",
            "Description",
            "Count",
            "Amount",
            "Status",
          ],
          widths: [
            { width: 1 },
            { width: 15 },
            { width: 15 },
            { width: 15 },
            { width: 15 },
            { width: 15 },
            { width: 15 },
            { width: 8 },
          ],
        },
        {
          t: "Stock Taking >",
          d: "How you can initiate and manage a stoke taking both partially or wholly?",
          d1: "Initiate, manage and record a stock taking event at the branch level",
          path: "stockTaking",
        },
        {
          t: "Stock Trail >",
          d: "Do you want to track a product journey?",
          d1: "Track a product in case of a stock discrepency",
          path: "stockTrail",
        },
        {
          t: "Print Labels >",
          d: "Do you want to print labels for your products?",
          d1: "Print labels such as barcodes for your products",
          path: "printLabels",
        },
        {
          t: "Promotions >",
          d: "Do you want to add and manage promotions for your business?",
          d1: "Setup promotions and track the performance at the business level ",
          path: "promptions",
        },
      ],
    },
  ],
];

export const inventoryFormData = [
  {
    path: "addProdect",
    title: "New Product",
    editTitle: "Edit Product",
    desc: "Add and view prodect for selling across all your linked bizzMart channel",
  },
  {
    path: "addService",
    title: "New Service",
    editTitle: "Edit Service",
    desc: "Add and view service for selling across all your linked bizzMart channel",
  },
  {
    path: "addAsset",
    title: "Add Existiong Asset",
    desc: "Add existing assets alreay owned by your business",
  },
];

export const inventoryPopupsData = [
  {
    title: "Transfer an Asset",
    desc: "Record the transfer of assets between your branches",
  },
  {
    title: "Writeoff an Asset",
    desc: "Write off assets you own againest any reason",
  },
];

export const inventoryStateData = {
  product: {
    isUseSecondryUnit: false,
    inventoryTable: [],
    attribute1: "",
    attribute2: "",
    attributeName1: "",
    attributeName2: "",
    isAttribute1: false,
    isAttribute2: false,
    isAttributeName1: false,
    isAttributeName2: false,
    isPrimary: false,

    // BASIC //////////////////////////////////////////////////////////
    type: 1,
    is_service: 0,
    product_name: "",
    category_id: "",
    product_description: "",
    manage_stock: 0,
    primary_unit: "",
    secondry_unit: "",
    enable_unit_conversion: false,
    conversion: "",
    selling_tax: "",
    cost_tax: "",
    online_tax: "",
    tax_inclusion: "",
    hsncode: "",
    is_online: 0,
    product_kot: [],
    product_type: "",
    bar_code: "",
    ean: "", //NOT CONFIRMED
    purchase_price: "",
    stock_unit: "",
    cost_price: "",
    cost_with_tax: "",
    cost_tax_amount: "",
    selling_price: "",
    online_price: "",
    mrp: "",
    opening_stock: "",
    stock_date: "",
    stock_price: "",
    min_stock_level: "",
    product_modifier: "",
    image: [],
    // STANDARD PRODUCT ///////////////////////////////////////////////
    // VARIANTS PRODUCT ///////////////////////////////////////////////
    variant_attribute: [],
    variant_products: [],
    selectable: "",
    classification: [],
    // COMPOSITE PRODUCT //////////////////////////////////////////////
  },
};
