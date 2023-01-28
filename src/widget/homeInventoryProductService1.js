import { StrictMode } from "react";
import { getAllProducts, getProduct } from "../method/homeInventory";
import { inventoryStateData } from "../module/homeInventory";
import { Header1, Header4, HeaderButtens1 } from "./widget";
import { MyTable1, MyTableCounter1 } from "./widget_table";

export function ProductTable({ state, setState }) {
  const { allProduct, page, productPaging, loading, error } = state;
  const title = "INVENTORY";
  const bodyRBody = {
    makeAdd: () =>
      setState({
        product: JSON.parse(JSON.stringify(inventoryStateData.product)),
      }),
    title: "+ New Product",
    drowelList: null,
    onShare: null,
    onDownload: null,
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;
  const body = [];
  if (allProduct !== null)
    for (let i = 0; i < allProduct.length; i++) {
      const it = allProduct[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name, data2: it.product_type, type: 2 },
        { data: it.code, type: 2 },
        { data: it.category_name },
        { data: it.type },
        { data: it.cost },
        { data: it.selling, type: 2 },
        { data: it.MRP },
        { data: it.tax },
        { data: it.stock },
        { data: it.MSL },
      ]);
    }

  const counterProps = {
    total: productPaging?.totalCount,
    page: productPaging?.page_number,
    loading,
    error,
    onTap: (v, limit) => {
      productPaging.limit = limit;
      productPaging.page_number = v;
      getAllProducts(state, setState);
    },
  };

  const tableOnclick = (k) => getProduct(k, state, setState);

  if (page?.path !== "prodect") return null;
  return (
    <StrictMode>
      <Header1
        title={title}
        bodyL={page.title}
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1
        lg
        widths={page.widths}
        heads={page.heads}
        body={body}
        onclick={tableOnclick}
      />
      <MyTableCounter1 props={counterProps} />
    </StrictMode>
  );
}
export function ServiceTable({ state, setState }) {
  const { allService, page, servicesPaging, loading, error } = state;
  var { product } = state;
  const title = "INVENTORY";
  const bodyRBody = {
    makeAdd: () => {
      product = JSON.parse(JSON.stringify(inventoryStateData.product));
      product.type = 2;
      product.is_service = 1;
      setState({ product });
    },
    title: "+ New Service",
    drowelList: null,
    onShare: null,
    onDownload: null,
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const counterProps = {
    total: servicesPaging?.totalCount,
    page: servicesPaging?.page_number,
    loading,
    error,
    onTap: (v, limit) => {
      servicesPaging.limit = limit;
      servicesPaging.page_number = v;
      getAllProducts(state, setState);
    },
  };

  const body = [];
  for (let i = 0; i < allService.length; i++) {
    const it = allService[i];
    body.push([
      { data: it.image, data2: it.name, type: 1 },
      { data: it.name, data2: it.product_type, type: 2 },
      { data: it.code, type: 2 },
      { data: it.category_name },
      { data: it.type },
      { data: it.cost },
      { data: it.selling, type: 2 },
      { data: it.MRP },
      { data: it.tax },
      { data: it.stock },
      { data: it.MSL },
    ]);
  }
  if (page?.path !== "service") return null;

  const tableOnclick = (k) => {
    product = allService[k];
    product.type = parseInt(allService[k].product_type);
    setState({ product });
  };

  return (
    <StrictMode>
      <Header1
        title={title}
        bodyL={page.t2}
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1
        lg
        widths={page.widths}
        heads={page.heads}
        body={body}
        onclick={tableOnclick}
      />
      <MyTableCounter1 props={counterProps} />
    </StrictMode>
  );
}
