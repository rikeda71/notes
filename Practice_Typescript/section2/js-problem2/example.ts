function taxed(amount): number {
  return amount * 1.1;
}

function fee(amount): number {
  return `{amount * 1.4}`;
}

function price(amont) {
  return `${fee(amount)}`; // Error
}

const demand = '￥' + taxed(price(1000)); // Nan
