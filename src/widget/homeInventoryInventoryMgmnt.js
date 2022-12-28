import { StrictMode, useState } from "react";
import { Header1, Header2, Header4, HeaderButtens1 } from "./widget";
import { MyTable1, MyTableCounter1 } from "./widget_table";

export function StockIssueTable({ state, setState }) {
  const { allIssue, page } = state;
  const body = [];
  if (allIssue !== null)
    for (let i = 0; i < allIssue.length; i++) {
      const it = allIssue[i];
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
    title: "+ Issue Stock",
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  if (page?.path !== "stockIssue") return null;
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK ISSUE"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
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
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;
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
      <MyTable1 widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}
export function StockReceivedTable({ state, setState }) {
  const { allIssue, page } = state;
  const body = [];
  if (allIssue !== null)
    for (let i = 0; i < allIssue.length; i++) {
      const it = allIssue[i];
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

  if (page?.path !== "stockReceived") return null;
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
      <MyTable1 widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}
export function StockReturnTable({ state, setState }) {
  const { allIssue, page } = state;
  const body = [];
  if (allIssue !== null)
    for (let i = 0; i < allIssue.length; i++) {
      const it = allIssue[i];
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
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

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
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}

export function StockReceivedStockReturnTable({ state, setState }) {
  const { allIssue, page } = state;
  const body = [];
  if (allIssue !== null)
    for (let i = 0; i < allIssue.length; i++) {
      const it = allIssue[i];
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
      <MyTable1 widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}

export function StockTakingTable({ state, setState }) {
  const { page } = state;
  if (page?.path !== "stockTaking") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
    </StrictMode>
  );
}

export function StockTrailTable({ state, setState }) {
  const { page } = state;
  if (page?.path !== "stockTaking") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
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
