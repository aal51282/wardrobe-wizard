export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export const filterData = {
  categories: [
    { id: 'cat1', label: 'T-Shirts', value: 't-shirts' },
    { id: 'cat2', label: 'Jeans', value: 'jeans' },
    { id: 'cat3', label: 'Dresses', value: 'dresses' },
    { id: 'cat4', label: 'Jackets', value: 'jackets' },
    { id: 'cat5', label: 'Sweaters', value: 'sweaters' },
  ],
  colors: [
    { id: 'col1', label: 'Black', value: 'black' },
    { id: 'col2', label: 'White', value: 'white' },
    { id: 'col3', label: 'Navy', value: 'navy' },
    { id: 'col4', label: 'Red', value: 'red' },
    { id: 'col5', label: 'Green', value: 'green' },
  ],
  sizes: [
    { id: 'size1', label: 'XS', value: 'xs' },
    { id: 'size2', label: 'S', value: 's' },
    { id: 'size3', label: 'M', value: 'm' },
    { id: 'size4', label: 'L', value: 'l' },
    { id: 'size5', label: 'XL', value: 'xl' },
  ],
  brands: [
    { id: 'brand1', label: 'Nike', value: 'nike' },
    { id: 'brand2', label: 'Adidas', value: 'adidas' },
    { id: 'brand3', label: 'Zara', value: 'zara' },
    { id: 'brand4', label: 'H&M', value: 'h&m' },
    { id: 'brand5', label: 'Uniqlo', value: 'uniqlo' },
  ],
}; 