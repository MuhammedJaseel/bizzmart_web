import { StrictMode } from "react";
import { Header4 } from "./widget";
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
  if (page?.path !== "stockIssue") return null;
  return (
    <StrictMode>
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
  if (page?.path !== "stockTransfer") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
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
  if (page?.path !== "stockReceived") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
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
  if (page?.path !== "stockReturn") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
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
