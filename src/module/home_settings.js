import {
  getAllAssetAndRecExpense,
  getAllEquity,
  getAllSalesTaxes,
  getBussinessSettings,
} from "../method/home_settings";

export const allSettings = [
  {
    title: "General Settings",
    desc: "Configure all the general settings for your business here.",
    data: [
      {
        title: "Business & GST Settings",
        desc: "Manage General business and legal settings for your business in bizzSmart here. You can set GST settings, store opening and closing times, contacts, timezone details etc.",
        path: "bussnessSettings",
        initCall: getBussinessSettings,
      },
      // {
      //   title: "Upload Items",
      //   desc: "Manage your business details here, you can customize informations showing to your customers on the invoices and other documents.",
      //   path: "uploadItems",
      // },
      {
        title: "Payment & Bank",
        desc: "Manage your business details here, you can customize informations showing to your customers on the invoices and other documents.",
        path: "paymentBank",
      },
      // {
      //   title: "Online Store Settings",
      //   desc: "Manage your business details here, you can customize informations showing to your customers on the invoices and other documents.",
      //   path: "onlineStoreSetting",
      // },
      // {
      //   title: "Backup & Security",
      //   desc: "Manage your business details here, you can customize informations showing to your customers on the invoices and other documents",
      //   path: "backupSettings",
      // },
    ],
  },
  // {
  //   title: "Document Settings",
  //   desc: "Configure invoice and all other documents for your business here.",
  //   data: [
  //     {
  //       title: "Invoice Form Settings",
  //       desc: "Manage your business details here, you can customize informations showing to your customers on the invoices and other documents.",
  //       path: "invoiceForm",
  //     },
  //     {
  //       title: "Document Prefix",
  //       desc: "Manage your business details here, you can customize informations showing to your customers on the invoices and other documents.",
  //       path: "documentPrefix",
  //     },
  //     {
  //       title: "Barcode Settings",
  //       desc: "Manage your business details here, you can customize informations showing to your customers on the invoices and other documents.",
  //       path: "barcode",
  //     },
  //     {
  //       title: "Service & Job Order Settings",
  //       desc: "Manage your business details here, you can customize informations showing to your customers on the invoices and other documents",
  //       path: "serviceAndOrder",
  //     },
  //   ],
  // },
  // {
  //   title: "Account Settings",
  //   desc: "Configure account and accessibility settings for bizzSmart here",
  //   data: [
  //     {
  //       title: "Referral Page",
  //       desc: "Manage your business details here, you can customis informations shouing to your customers on the invoices and ofter documents",
  //       path: "",
  //     },
  //     {
  //       title: "Loyalty Settings",
  //       desc: "Manage your business details here, you can customize informations showing to your customers on the voices and other documents",
  //       path: "",
  //     },
  //   ],
  // },
  // {
  //   title: "Employee Settings",
  //   desc: "Configure all your employee related settings for your business here.",
  //   data: [
  //     {
  //       title: "Allowances & Incentives",
  //       desc: "Manage your business dealss here, you can customize informations showing to your customers on the invoices and other documents",
  //       path: "allowenceAndIncentives",
  //     },
  //     {
  //       title: "Roles & Rights",
  //       desc: "Manage your business dealss here, you can customize informations showing to your customers on the invoices and other documents",
  //       path: "",
  //     },
  //   ],
  // },
  {
    title: "Masterdata Settings",
    desc: "Configure all the available masterdata settings here.",
    data: [
      {
        title: "Expense Categories",
        desc: "Manage your business details here, you ran customize informations showing to your customers on that invoices and other documents.",
        path: "expenceCategories",
      },
      {
        title: "Product Categories",
        desc: "Manage your business details here, you ran customize informations showing to your customers on that invoices and other documents.",
        path: "productCategories",
      },
      {
        title: "Asset Categories",
        desc: "Manage your business details here, you ran customize informations showing to your customers on that invoices and other documents.",
        path: "assetCategories",
      },
      {
        title: "Sales Taxes",
        desc: "Manage your business details here, you ran customize informations showing to your customers on that invoices and other documents.",
        path: "salesTaxes",
        myFunction: getAllSalesTaxes,
      },
      // {
      //   title: "Productions Stations",
      //   desc: "Manage your business details here, you ran customize informations showing to your customers on that invoices and other documents.",
      //   path: "prodectionStations",
      // },
    ],
  },
  {
    title: "Other Settings",
    desc: "Configure other financial and fiscal year settings for your business here",
    data: [
      {
        title: "Assets & Recurring Expenses",
        desc: "Manage your business details here, you can customize informations showing for your customers on the invoices and other documents.",
        path: "assetsAndExpenses",
        myFunction: getAllAssetAndRecExpense,
      },
      {
        title: "Equity & Earnings",
        desc: "Manage your business details here, you can customize informations showing for your customers on the invoices and other documents.",
        path: "equityEarnings",
        myFunction: getAllEquity,
      },
      // {
      //   title: "Discount Settings",
      //   desc: "Manage your business details here, you can customize informations showing for your customers on the invoices and other documents.",
      //   path: "",
      // },
    ],
  },
];

export const allTimeZone = ["Channai", "Asia/Kolkata", "Mumbail"];

export const addPaymentDummy = {
  name: "",
  target_account_id: "",
  type: "Card",
  upi_id: "",
};
