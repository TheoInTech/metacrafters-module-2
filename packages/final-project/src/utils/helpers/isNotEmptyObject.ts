export function isNotEmptyObject(obj: Object = {}) {
  const newObj = Object.assign({}, {...obj});
  return Object.keys(newObj).length !== 0 && typeof newObj !== 'undefined';
}
