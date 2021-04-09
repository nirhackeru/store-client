import axios from "axios";
import {API} from '../config'

export const getSubs = async () =>
  await axios.get(`${API}/subs`);

export const getSub = async (slug) =>
  await axios.get(`${API}/sub/${slug}`);

export const removeSub = async (slug, token) =>
  await axios.delete(`${API}/sub/${slug}`, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
  });

export const updateSub = async (slug, sub, token) =>
  await axios.put(`${API}/sub/${slug}`, sub, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
  });
 

export const createSub = async (sub, token) =>
  await axios.post(`${API}/sub`, sub, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
  });

