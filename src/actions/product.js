import axios from "axios";
import {API} from '../config'

export const createProduct = async (product, token) =>
  await axios.post(`${API}/product`, product, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
  });


export const getProductsByCount = async (count) =>
  await axios.get(`${API}/products/${count}`);

export const removeProduct = async (slug, token) =>
  await axios.delete(`${API}/product/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
  },
  });

  export const getProduct = async (slug) =>
  await axios.get(`${API}/product/${slug}`);

export const updateProduct = async (slug, product, token) =>
  await axios.put(`${API}/product/${slug}`, product, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
  },
  });

  
export const getProducts = async (sort, order, page) =>
await axios.post(`${API}/products`, {
  sort,
  order,
  page,
});

export const getProductsCount = async () =>
await axios.get(`${API}/products/total`);

export const productStar = async (productId, star, token) =>{
  console.log('action update star',productId, star, token)
  return await axios.put(
    `${API}/product/star/${productId}`,
    { star },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }
);
  }

export const getRelated = async (productId) =>
await axios.get(`${API}/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${API}/search/filters`, arg);
