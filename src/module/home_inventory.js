export const prodectTypes = [
  { name: "Stock", id: "Stock" },
  { name: "Raw Material", id: "Raw Material" },
  { name: "Ingredient", id: "Ingredient" },
  { name: "Operational Item", id: "Operational Item" },
  { name: "Consumabl", id: "Consumabl" },
];

export const taxTypes = [
  { name: "Inclusive", id: "Inclusive" },
  { name: "Exclusive", id: "Exclusive" },
];

export const inventoryPages = [
  [
    {
      t: "Product managemet",
      t1: "Add and manage the products and services you're dealing with",
      data: [
        {
          t: "Add Products >",
          d: "What products are you providing?",
          d1: "Add all the products your business offering to its customers",
        },
        {
          t: "Add Services >",
          d: "What services are you providing?",
          d1: "Add all the services your business offering to its customers",
        },
        {
          t: "Add Assets >",
          d: "How you are managing your assets to run your business?",
          d1: "Add all the assets your business own",
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
        },
        {
          t: "Stock Lookup >",
          d: "What is the current stock position across the branches?",
          d1: "Shows stock positions across all the connected branches",
        },
        {
          t: "Price Change >",
          d: "Do you want to manage the prices you are selling?",
          d1: "You can change price branch level or global business level here",
        },
        {
          t: "MSL Lookup >",
          d: "Want to lookup the products below minimum stock level?",
          d1: "Shows the items below MSL level at the branch level",
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
          t: "Stock Trail >",
          d: "Do you want to track a product journey?",
          d1: "Track a product in case of a stock discrepency",
        },
        {
          t: "Print Labels >",
          d: "Do you want to print labels for your products?",
          d1: "Print labels such as barcodes for your products",
        },
        {
          t: "Promotions >",
          d: "Do you want to add and manage promotions for your business?",
          d1: "Setup promotions and track the performance at the business level ",
        },
        {
          t: "Stock Issue >",
          d: "Do you want to issue stock from your main branch to another?",
          d1: "Issue stock from your main branch to connected branches",
        },
        {
          t: "Stock Transfer >",
          d: "Do you want to transfer an item from a branch to another?",
          d1: "Transfer stock from one branch to another",
        },
        {
          t: "Stock Received >",
          d: "Do you want to record stock received entry at the branch level?",
          d1: "Record entry against a stock transfer or a stock issue at the branch level",
        },
        {
          t: "Stock Return >",
          d: "How you can return a stock item to main branch or your supplier?",
          d1: "Record a stock return transaction at the branch level",
        },
        {
          t: "Stock Taking >",
          d: "How you can initiate and manage a stoke taking both partially or wholly?",
          d1: "Initiate, manage and record a stock taking event at the branch level",
        },
      ],
    },
  ],
];
