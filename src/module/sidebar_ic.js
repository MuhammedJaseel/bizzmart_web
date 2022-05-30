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
import icAssets from "../asset/icon/ic_assets.png";
import icAssetsW from "../asset/icon/ic_assets-w.png";
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
import HomeInventory from "../widget/home_inventory";
import HomeCalender from "../widget/home_calendar";

const sidebarIc = [
  {
    title: "Dashboard",
    icon: icDashbord,
    iconW: icDashbordW,
    widget: HomeDashboard,
  },
  {
    title: "Calendar",
    icon: icCalendar,
    iconW: icCalendarW,
    widget: HomeCalender,
  },
  {
    title: "Reports",
    icon: icReports,
    iconW: icReportsW,
    widget: HomeDashboard,
  },
  {
    title: "Sales",
    icon: icSales,
    iconW: icSalesW,
    widget: HomeDashboard,
  },
  {
    title: "Purchases",
    icon: icPurchases,
    iconW: icPurchasesW,
    widget: HomeDashboard,
  },
  {
    title: "Expenses",
    icon: icExpenses,
    iconW: icExpensesW,
    widget: HomeDashboard,
  },
  {
    title: "Inventory",
    icon: icInventory,
    iconW: icInventoryW,
    widget: HomeInventory,
  },
  {
    title: "Job card",
    icon: icJob,
    iconW: icJobW,
    widget: HomeDashboard,
  },
  {
    title: "Online",
    icon: icOnline,
    iconW: icOnlineW,
    widget: HomeDashboard,
  },
  {
    title: "Assets",
    icon: icAssets,
    iconW: icAssetsW,
    widget: HomeDashboard,
  },
  {
    title: "Cash & bank",
    icon: icCash,
    iconW: icCashW,
    widget: HomeDashboard,
  },
  {
    title: "Parties",
    icon: icParties,
    iconW: icPartiesW,
    widget: HomeDashboard,
  },
  {
    title: "Team",
    icon: icTeam,
    iconW: icTeamW,
    widget: HomeDashboard,
  },
  {
    title: "Settings",
    icon: icSettings,
    iconW: icSettingsW,
    widget: HomeDashboard,
  },
  {
    title: "About",
    icon: icAbout,
    iconW: icAboutW,
    widget: HomeDashboard,
  },
];

export default sidebarIc;
