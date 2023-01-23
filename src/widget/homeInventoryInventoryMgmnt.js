import { StrictMode, useState } from "react";
import {
  getAllInventoryCountingReivew,
  getSingleStockIssue,
  getSingleStockRecived,
  getStockTakingProdectList,
  getStockTrailList,
  inventorySearchProductStockIssue,
} from "../method/homeInventoryInventoryMgmnt";
import {
  newInventoryCountStruct,
  setAddStockIssueItemStruct,
} from "../module/homeInventoryInventoryMgmnt";
import {
  Header1,
  Header2,
  Header4,
  HeaderButtens1,
  WidgetInputSelect,
} from "./widget";
import {
  WidgetPopUp1,
  WidgetPopUp1Body,
  WidgetPopUp1In1,
} from "./widget_popup";
import { MyTable1, MyTableCounter1 } from "./widget_table";

export function StockIssueTable({ state, setState }) {
  const { allStockIssue, page } = state;
  const body = [];
  if (allStockIssue?.data !== null)
    for (let i = 0; i < allStockIssue?.data?.length; i++) {
      const it = allStockIssue?.data[i];
      body.push([
        { data: "" },
        { data: it.id, type: 3 },
        { data: it.date },
        { data: it.transfer_to },
        { data: it.description },
        { data: it.count },
        { data: it.amount },
        { data: it.status },
      ]);
    }

  const bodyRBody = {
    drowelList: null,
    onShare: null,
    onDownload: null,
    title: "+ Issue Stock",
    makeAdd: () =>
      setState({
        page: { path: "addIssueStock" },
        addIssueStock: setAddStockIssueItemStruct(),
      }),
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const heads = [
    null,
    "Transaction #",
    "Date",
    "Transfer To",
    "Description",
    "Count",
    "Amount",
    "Status",
  ];
  const widths = [
    { width: 1 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 8 },
  ];

  if (page?.path !== "stockIssue") return null;
  const _onClickTable = (v) => {
    setState({
      page: { path: "addIssueStock" },
      addIssueStock: setAddStockIssueItemStruct(),
    });
    getSingleStockIssue(allStockIssue?.data[v].id, state, setState);
  };
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK ISSUE"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1
        lg
        widths={widths}
        heads={heads}
        body={body}
        onclick={_onClickTable}
      />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}

export function StockTransferTable({ state, setState }) {
  const { allIssue, page } = state;
  const body = [];
  if (allIssue !== null)
    for (let i = 0; i < allIssue.length; i++) {
      const it = allIssue[i];
      body.push([
        { data: "" },
        { data: it.id, type: 3 },
        { data: it.date },
        { data: it.transferFrom },
        { data: it.transferTo },
        { data: it.desc },
        { data: it.count },
        { data: it.amount },
        { data: it.status },
      ]);
    }

  const [subPage, setsubPage] = useState(0);
  const pTitles = ["Issued", "Received"];

  const bodyRBody = {
    drowelList: null,
    onShare: null,
    onDownload: null,
    title: "+ Stock Transfer",
    makeAdd: () =>
      setState({
        page: { path: "addStockTransfer" },
        addStockTransfer: { items: [] },
      }),
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const heads = [
    null,
    "Transaction #",
    "Date",
    "Transfer From",
    "Transfer To",
    "Description",
    "Count",
    "Amount",
    "Status",
  ];
  const widths = [
    { width: 1 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 8 },
  ];

  if (page?.path !== "stockTransfer") return null;

  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK TRANSFER"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header2 titles={pTitles} page={subPage} onTap={setsubPage} />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 widths={widths} heads={heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}

export function StockReceivedTable({ state, setState }) {
  const { allStockRecevied, allStockAcknowledged, page } = state;
  const body = [];

  const [subPage, setsubPage] = useState(0);
  const pTitles = ["Issued", "Acknowledged"];

  const items = subPage === 0 ? allStockRecevied : allStockAcknowledged;

  if (items?.data !== null)
    for (let i = 0; i < items?.data?.length; i++) {
      const it = items?.data[i];
      body.push([
        { data: "" },
        { data: it.id, type: 3 },
        { data: it.date },
        { data: it.transfer_to },
        { data: it.description },
        { data: it.count },
        { data: it.amount },
      ]);
    }

  const bodyRBody = { drowelList: null, onShare: null, onDownload: null };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const heads = [
    null,
    "Transaction #",
    "Date",
    "Transfer From",
    "Description",
    "Count",
    "Amount",
  ];
  const widths = [
    { width: 1 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 10 },
  ];

  if (page?.path !== "stockReceived") return null;
  const _onClickTable = (v) => {
    if (subPage === 1) return;
    setState({
      page: { path: "addIssueStock" },
      addIssueStock: setAddStockIssueItemStruct(),
    });
    getSingleStockRecived(allStockRecevied?.data[v].id, state, setState);
  };
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK RECEIVED"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header2 titles={pTitles} page={subPage} onTap={setsubPage} />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1
        widths={widths}
        heads={heads}
        body={body}
        onclick={_onClickTable}
      />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}

export function StockReturnTable({ state, setState }) {
  const { allStockReturn, page } = state;
  const body = [];
  if (allStockReturn?.data !== null)
    for (let i = 0; i < allStockReturn?.data?.length; i++) {
      const it = allStockReturn?.data[i];
      body.push([
        { data: "" },
        { data: it.id, type: 3 },
        { data: it.date },
        { data: it.transferTo },
        { data: it.desc },
        { data: it.count },
        { data: it.amount },
        { data: it.status },
      ]);
    }
  const bodyRBody = {
    drowelList: null,
    onShare: null,
    onDownload: null,
    title: "+ Stock Return",
    makeAdd: () => {
      setState({
        page: { path: "addStockReturn" },
        addStockReturn: { items: [] },
      });
    },
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const heads = [
    null,
    "Transaction #",
    "Date",
    "Transfer To",
    "Description",
    "Count",
    "Amount",
    "Status",
  ];
  const widths = [
    { width: 1 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 8 },
  ];

  if (page?.path !== "stockReturn") return null;
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK RETURN"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={widths} heads={heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}

export function StockReceivedStockReturnTable({ state, setState }) {
  const { allStockRecevied, page } = state;
  const body = [];
  if (allStockRecevied?.data !== null)
    for (let i = 0; i < allStockRecevied?.data?.length; i++) {
      const it = allStockRecevied?.data[i];
      body.push([
        { data: "" },
        { data: it.id, type: 3 },
        { data: it.date },
        { data: it.transferTo },
        { data: it.desc },
        { data: it.count },
        { data: it.amount },
      ]);
    }

  const [subPage, setsubPage] = useState(0);
  const pTitles = ["Issued", "Acknowledged"];

  const bodyRBody = { drowelList: null, onShare: null, onDownload: null };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const heads = [
    null,
    "Transaction #",
    "Date",
    "Transfer To",
    "Description",
    "Count",
    "Amount",
    "Status",
  ];
  const widths = [
    { width: 1 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 8 },
  ];

  if (page?.path !== "stockReceivedStockReturn") return null;
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK RECEIVED"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header2 titles={pTitles} page={subPage} onTap={setsubPage} />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 widths={widths} heads={heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}

export function StockTakingTable({ state, setState }) {
  const {
    allStockTaking,
    allStockTakingComplated,
    allStockTakingCanclleed,
    page,
  } = state;
  const body = [];

  const [subPage, setsubPage] = useState(0);
  const pTitles = ["Due", "Complated", "Canclled"];
  var items = allStockTaking;
  if (subPage === 1) items = allStockTakingComplated;
  if (subPage === 2) items = allStockTakingCanclleed;

  if (items?.data !== null)
    for (let i = 0; i < items?.data?.length; i++) {
      const it = items?.data[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.title },
        { data: it.start_date },
        { data: it.branch },
        { data: it.invetory_type },
        { data: it.end_date },
        { data: it.counting_status },
      ]);
    }

  const bodyRBody = {
    drowelList: null,
    onShare: null,
    onDownload: null,
    title: "+ New Count",
    makeAdd: () =>
      setState({
        newInventoryCount: JSON.parse(JSON.stringify(newInventoryCountStruct)),
      }),
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const heads = [
    null,
    "Count Details",
    "Start Date",
    "Branch",
    "Count Type",
    "End Before",
    "Counting Status",
  ];
  const widths = [
    { width: 3 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 10 },
  ];

  if (page?.path !== "stockTaking") return null;
  const _onClickTable = (v) => {
    setState({
      page: {
        path:
          items?.data[v]?.review_status === "Review"
            ? "inventoryProductReviewPage"
            : "inventoryProductCountPage",
        title: items?.data[v].title,
        stock_taking_id: items?.data[v].id,
        status: items?.data[v].counting_status,
      },
    });
    if (items?.data[v]?.review_status === "Review")
      getAllInventoryCountingReivew(items?.data[v].id, state, setState);
    else getStockTakingProdectList(items?.data[v].id, state, setState);
  };
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK RECEIVED"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header2 titles={pTitles} page={subPage} onTap={setsubPage} />
      <Header4
        title="Invnetory Count"
        desc="Show all the team members recorded against your business"
      />
      <MyTable1
        widths={widths}
        heads={heads}
        body={body}
        onclick={_onClickTable}
      />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}

export function StockTrailTable({ state, setState }) {
  const { page, error, loading, stockTrailProdect, allBranches } = state;
  const { allStockTrails } = state;
  const body = [
    [
      { data: "" },
      { data: "Opening Stock" },
      { data: "" },
      { data: "" },
      { data: allStockTrails.opening_stock },
      { data: allStockTrails.opening_total },
      { data: allStockTrails.closing_stock },
      { data: allStockTrails.closing_total },
    ],
  ];

  if (allStockTrails?.items !== null)
    for (let i = 0; i < allStockTrails?.items?.length; i++) {
      const it = allStockTrails?.items[i];
      body.push([
        { data: "" },
        { data: it.date },
        { data: it.name },
        { data: it.description },
        { data: it.stock_movement },
        { data: it.stock_movemet_value },
        { data: it.closing_stock },
        { data: it.closing_stock_value },
      ]);
    }

  const bodyRBody = { drowelList: null, onShare: null, onDownload: null };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const heads = [
    null,
    "Date",
    "Party",
    "Type",
    "Qty",
    "Amount",
    "Cost",
    "Stock",
  ];
  const widths = [
    { width: 1 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 10 },
    { width: 10 },
  ];

  const [popup, setpopup] = useState(true);

  const popupProps1 = {
    close: () => setState({ page: null, stockTrailProdect: {} }),
    title: "Select Product",
    desc: "Select the prodect to track its journy",
    error,
    loading,
    onChange: (e) => (stockTrailProdect[e.target.id] = e.target.value),
    submit: () => getStockTrailList(state, setState),
    btnTitle: "NEXT",
    hide: stockTrailProdect?.selected,
  };

  if (page?.path !== "stockTrail") return null;
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK TRAIL"
        onTap={() => setState({ page: null, stockTrailProdect: {} })}
        bodyR={bodyR}
      />
      <Header4
        title={stockTrailProdect?.name}
        desc="Shows prices across all the connected branches"
      />
      <MyTable1
        widths={widths}
        heads={heads}
        lg
        body={body}
        onclick={() => {}}
      />
      <MyTableCounter1 props={{ total: 50 }} />
      <WidgetPopUp1 props={popupProps1}>
        <WidgetPopUp1Body>
          <WidgetPopUp1In1 title="Select Product*">
            <WidgetInputSelect
              props={{
                onChange: async (e) => {
                  await inventorySearchProductStockIssue(
                    e.target.value,
                    (v) => (stockTrailProdect.list = v)
                  );
                  setState({ stockTrailProdect });
                },
                list: stockTrailProdect?.list || [],
                clearlist: () => {
                  stockTrailProdect.list = [];
                  setState({ stockTrailProdect });
                },
                setValue: async (v) => {
                  stockTrailProdect.product_id = stockTrailProdect?.list[v].id;
                  stockTrailProdect.name = stockTrailProdect?.list[v].name;
                },
                placeholder: "Search your product",
              }}
            />
          </WidgetPopUp1In1>
          <WidgetPopUp1In1 title="From Date*">
            <input className="hcbAa" id="from_date" type="date" />
          </WidgetPopUp1In1>
        </WidgetPopUp1Body>

        <WidgetPopUp1Body>
          <WidgetPopUp1In1 title="Select Branch*">
            <div className="hcbAc">
              <select className="hcbAa" id="branch_id">
                <option hidden>Select branch</option>
                {allBranches.map((it, k) => (
                  <option key={k} value={it.branch_id}>
                    {it.branch_name}
                  </option>
                ))}
              </select>
            </div>
          </WidgetPopUp1In1>
          <WidgetPopUp1In1 title="To Date*">
            <input className="hcbAa" id="to_date" type="date" />
          </WidgetPopUp1In1>
        </WidgetPopUp1Body>
      </WidgetPopUp1>
    </StrictMode>
  );
}
export function StockLabelsTable({ state, setState }) {
  const { page } = state;
  if (page?.path !== "stocklabels") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
    </StrictMode>
  );
}
export function PromotionsTable({ state, setState }) {
  const { page } = state;
  if (page?.path !== "promotions") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
    </StrictMode>
  );
}
