export default function getData() {
  return fetch('../data/products.json').then(data => data.json());
};
