const allPage = [
  [
    {
      t: "Sales reports",
      t1: "Detailed report to show how your sales performing",
      data: [
        {
          t: "Sales Summary",
          d: "How’z your sales performing?",
          d1: "Shows sales summary for a given date range",
          path: "salesSummary",
        },
        {
          t: "Sales Invoices",
          d: "What all sales invoices are recorded in my business?",
          d1: "Shows all the sales invoices recorded for a given date range",
          path: "salesInvoices",
        },
        {
          t: "Sales Rank",
          d: "What all are your best selling and least selling products?",
          d1: "Shows all the products sales performance in descending order for a given date range",
          path: "salesRank",
        },
        {
          t: "Sales Comparison",
          d: "HHow’s your business growing compared to the last period?",
          d1: "Shows sales performance compared with the last time preset counterpart",
          path: "salesComparison",
        },
        {
          t: "Profit Analysis",
          d: "How much profit I have made from my business?",
          d1: "Shows your profitability against product, invoice and even customers for a given date range",
          path: "profitAnalysis",
        },
      ],
    },

    {
      t: "Purchase reports",
      t1: "Detailed report to show how your purchases performing",
      data: [
        {
          t: "Purchase Summary",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "purchaseSummary",
        },
        {
          t: "Purchase Invoices (GRN)",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "purchaseInvoices",
        },
        {
          t: "Purchase Rank",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "purchaseRank",
        },
        {
          t: "Cost Variance",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "costVariance",
        },
        {
          t: "Supplier Statement",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "supplierStatement",
        },
        {
          t: "Supplier List",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "supplierList",
        },
      ],
    },

    {
      t: "Aging reports",
      t1: "Detailed report to show how your sales performing",
      data: [
        {
          t: "Inventory Aging Report",
          d: "What all are my inventories and how old are they?",
          d1: "Shows income, expense and profit for a given date range",
          path: "inventoryAging",
        },
        {
          t: "Aged Payments",
          d: "How much money owed and how old they are?",
          d1: "Shows income, expense and profit for a given date range",
          path: "agedPayments",
        },
      ],
    },

    {
      t: "Tax reports",
      t1: "Detailed report to show how your sales performing",
      data: [
        {
          t: "GSTR1",
          d: "How much sales tax do I owe?",
          d1: "Shows income, expense and profit for a given date range",
          path: "gSTR1",
        },
        {
          t: "GSTR 3B",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "gSTR3B",
        },
        {
          t: "GSTR 1B",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "gSTR1B",
        },
      ],
    },
  ],
  [
    {
      t: "Inventory reports",
      t1: "Detailed report to know your inventory position and tracking",
      data: [
        {
          t: "Stock Summary",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "stockSummary",
        },
        {
          t: "Stock Trail",
          d: "What stock items came in and out during a given date range?",
          d1: "Shows income, expense and profit for a given date range",
          path: "stockTrail",
        },
        {
          t: "Minimum Stock Summary",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "minimumStock",
        },
        {
          t: "Stock Adjustment",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "stockAdjustment",
        },
        {
          t: "Stock Rate Card",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "stockRate",
        },
      ],
    },

    {
      t: "Expense reports",
      t1: "Detailed report to show how your sales performing",
      data: [
        {
          t: "Expense Summary",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "expenseSummary",
        },
        {
          t: "Expense Transactions",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "expenseTransactions",
        },
        {
          t: "Expense Category Report",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "expenseCategory",
        },
        {
          t: "Expense Rank",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "expenseRank",
        },
      ],
    },

    {
      t: "Cash reports",
      t1: "Detailed report to show how your sales performing",
      data: [
        {
          t: "Cashflow Summary",
          d: "How much actual cash came in and out?",
          d1: "Shows income, expense and profit for a given date range",
          path: "cashflowSummary",
        },
        {
          t: "Cash Transactions",
          d: "What are the cash transactions and running balance for a selected cash accoun?",
          d1: "Shows income, expense and profit for a given date range",
          path: "cashTransactions",
        },
        {
          t: "Bank Transactions",
          d: "What are the bank transactions and running balance for a selected bank accoun?",
          d1: "Shows income, expense and profit for a given date range",
          path: "bankTransactions",
        },
        {
          t: "Aggregator Transactions",
          d: "What are the transactions and running balance for a selected aggregator accoun?",
          d1: "Shows income, expense and profit for a given date range",
          path: "aggregatorTransactions",
        },
      ],
    },

    {
      t: "Financial reports",
      t1: "Detailed report to show how your sales performing",
      data: [
        {
          t: "Profit & Loss",
          d: "How much profit I have made from my business?",
          d1: "Shows income, expense and profit for a given date range",
          path: "profit&",
        },
        {
          t: "Balance Sheet",
          d: "How much are my assets and labilites worth?",
          d1: "Shows income, expense and profit for a given date range",
          path: "balanceSheet",
        },
        {
          t: "Trial Balance",
          d: "What is the balace of each ledger account?",
          d1: "Shows income, expense and profit for a given date range",
          path: "trialBalance",
        },
      ],
    },
  ],
];
const favoritesPage = [[], []];
const salesPage = [[], []];
const inventoryPage = [[], []];
const purchasePage = [[], []];
const expensePage = [[], []];
const cashPage = [[], []];
const financePage = [[], []];
const taxPage = [[], []];

export const reportPages = [
  allPage,
  favoritesPage,
  favoritesPage,
  salesPage,
  inventoryPage,
  purchasePage,
  expensePage,
  cashPage,
  financePage,
  taxPage,
];
