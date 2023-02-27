const isFalsy = value => !value && value !== 0;
console.log(isFalsy(null));
console.log(isFalsy(undefined));
console.log(isFalsy(0));
console.log(isFalsy(false));
console.log(isFalsy(''));
console.log(isFalsy(NaN));
