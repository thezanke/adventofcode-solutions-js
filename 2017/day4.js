exports.isValid = passphrase => {
  const arr = passphrase.split(' ');
  return new Set(arr).size === arr.length;
};

exports.isValidAdv = passphrase => {
  const arr = passphrase.split(' ').map(word => word.split('').sort().join(''));
  return new Set(arr).size === arr.length;
};
