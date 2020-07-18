function taxed(amount) {
  return amount * 1.1;
}

function fee(amount) {
  return `{amount * 1.4}`;
}

function price(amont) {
  return `${fee(amount)}`;
}

const demand = '￥' + taxed(price(1000)); // Nan
