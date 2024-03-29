export function getComaPriceDec(p) {
  var dv = p.split(".");
  var price = dv[0].toString();
  if (price.length > 3) {
    var rprice = "";
    var j = 0;
    for (let i = price.length - 1; i >= 0; i--) {
      rprice = rprice + price[i];
      if (i < price.length - 1 && i > 0) {
        j++;
        if (j % 2 === 0) rprice = rprice + ",";
      }
    }
    price = "";

    for (let i = rprice.length - 1; i >= 0; i--) {
      price = price + rprice[i];
    }
    return price + "." + dv[1];
  } else return price + "." + dv[1];
}

export function getTodayType1() {
  var today = new Date();
  var yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  today = dd + "-" + mm + "-" + yyyy;
  return today;
}

export function getTodayType2() {
  var today = new Date();
  var y = today.getFullYear();
  let m = today.getMonth() + 1;
  let d = today.getDate();
  today = `${y}-${m.toString().padStart(2, 0)}-${d.toString().padStart(2, 0)}`;
  return today;
}

export function makeMyDate(d) {
  if (d === undefined) return "";
  if (d === "") return "";
  const ds = d.split("-");
  if (ds.length < 3) return "";
  return `${ds[2]}-${ds[1]}-${ds[0]}`;
}

export function addNumberList(list, name) {
  var value = 0;
  for (let i = 0; i < list?.length; i++) value += Number(list[i][name]);
  return value;
}
