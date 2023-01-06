import icDashbord from "../asset/icon/ic_dashbord.png";
import icDashbordW from "../asset/icon/ic_dashbord-w.png";
import icCalendar from "../asset/icon/ic_calendar.png";
import icCalendarW from "../asset/icon/ic_calendar-w.png";
import icReports from "../asset/icon/ic_reports.png";
import icReportsW from "../asset/icon/ic_reports-w.png";
import icSales from "../asset/icon/ic_sales.png";
import icSalesW from "../asset/icon/ic_sales-w.png";
import icPurchases from "../asset/icon/ic_purchases.png";
import icPurchasesW from "../asset/icon/ic_purchases-w.png";
import icExpenses from "../asset/icon/ic_expences.png";
import icExpensesW from "../asset/icon/ic_expences-w.png";
import icInventory from "../asset/icon/ic_inventory.png";
import icInventoryW from "../asset/icon/ic_inventory-w.png";
import icJob from "../asset/icon/ic_job_card.png";
import icJobW from "../asset/icon/ic_job_card-w.png";
import icOnline from "../asset/icon/ic_online.png";
import icOnlineW from "../asset/icon/ic_online-w.png";
import icCash from "../asset/icon/ic_cash.png";
import icCashW from "../asset/icon/ic_cash-w.png";
import icParties from "../asset/icon/ic_parties.png";
import icPartiesW from "../asset/icon/ic_parties-w.png";
import icTeam from "../asset/icon/ic_team.png";
import icTeamW from "../asset/icon/ic_team-w.png";
import icSettings from "../asset/icon/ic_settings.png";
import icSettingsW from "../asset/icon/ic_settings-w.png";
import icAbout from "../asset/icon/ic_about.png";
import icAboutW from "../asset/icon/ic_about-w.png";
import HomeDashboard from "../widget/home_dashboard";
import HomeInventory from "../widget/homeInventory";
import HomeCalender from "../widget/homeCalendar";
import HomeOnline from "../widget/home_online";
import HomeReports from "../widget/home_reports";
import HomeSales from "../widget/home_sales";
import HomePurchase from "../widget/home_purchase";
import HomeExpense from "../widget/home_expense";
import HomeJobcard from "../widget/home_jobcard";
import HomeCashbank from "../widget/home_cashbank";
import HomeParties from "../widget/home_parties";
import HomeTeam from "../widget/home_team";
import HomeSettings from "../widget/home_settings";
import HomeAbout from "../widget/home_about";

const sidebarIc = [
  // {
  //   title: "Dashboard",
  //   icon: icDashbord,
  //   iconW: icDashbordW,
  //   path: "dashboard",
  //   widget: HomeDashboard,
  // },
  {
    title: "Calendar",
    icon: icCalendar,
    iconW: icCalendarW,
    path: "calendar",
    widget: HomeCalender,
  },
  {
    title: "Reports",
    icon: icReports,
    iconW: icReportsW,
    path: "reports",
    widget: HomeReports,
  },
  {
    title: "Sales",
    icon: icSales,
    iconW: icSalesW,
    path: "sales",
    widget: HomeSales,
  },
  {
    title: "Purchases",
    icon: icPurchases,
    iconW: icPurchasesW,
    path: "purchases",
    widget: HomePurchase,
  },
  {
    title: "Expenses",
    icon: icExpenses,
    iconW: icExpensesW,
    path: "expenses",
    widget: HomeExpense,
  },
  {
    title: "Inventory",
    icon: icInventory,
    iconW: icInventoryW,
    path: "inventory",
    widget: HomeInventory,
  },
  // {
  //   title: "Job card",
  //   icon: icJob,
  //   iconW: icJobW,
  //   path: "jobcard",
  //   widget: HomeJobcard,
  // },
  // {
  //   title: "Online",
  //   icon: icOnline,
  //   iconW: icOnlineW,
  //   path: "online",
  //   widget: HomeOnline,
  // },
  {
    title: "Cash & bank",
    icon: icCash,
    iconW: icCashW,
    path: "cashandbank",
    widget: HomeCashbank,
  },
  {
    title: "Parties",
    icon: icParties,
    iconW: icPartiesW,
    path: "parties",
    widget: HomeParties,
  },
  {
    title: "Team",
    icon: icTeam,
    iconW: icTeamW,
    path: "team",
    widget: HomeTeam,
  },
  {
    title: "Settings",
    icon: icSettings,
    iconW: icSettingsW,
    path: "settings",
    widget: HomeSettings,
  },
  // {
  //   title: "About",
  //   icon: icAbout,
  //   iconW: icAboutW,
  //   path: "about",
  //   widget: HomeAbout,
  // },
];

export default sidebarIc;
