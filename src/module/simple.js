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
