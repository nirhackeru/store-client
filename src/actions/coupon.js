import axios from "axios";
import {API} from '../config'


export const getCoupons = async () =>
  await axios.get(`${API}/coupons`);

export const removeCoupon = async (couponId, token) =>
  await axios.delete(`${API}/coupon/${couponId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
  },
  });

export const createCoupon = async (coupon, token) =>
  await axios.post(
    `${API}/coupon`,
    { coupon },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }
  );
