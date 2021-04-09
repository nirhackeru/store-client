import axios from "axios";
import {API} from '../config'

export const getCategories = async () =>
  await axios.get(`${API}/categories`);

export const getCategory = async (slug) =>
  await axios.get(`${API}/category/${slug}`);

export const removeCategory = async (slug, token) =>
  await axios.delete(`${API}/category/${slug}`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
  });

export const updateCategory = async (slug, category, token) =>
  await axios.put(`${API}/category/${slug}`, category, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
  });
 

export const createCategory = async (category, token) =>
  await axios.post(`${API}/category`, category, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
  });

export const getCategorySubs = async (_id) =>
  await axios.get(`${API}/category/subs/${_id}`);
