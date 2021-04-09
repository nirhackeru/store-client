import  {LOGIN_SUCCESS,LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL,REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR} from '../actions/types'
import {API} from '../config'
import axios from 'axios'
import { toast } from "react-toastify";



 

export const loadUser = token => async dispatch => {
    try {
        console.log(token)
        const headers= {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        } 
      
        
      const res = await axios.get(`${API}/auth`, {headers});
  
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  export const signout = () => async dispatch => {
    console.log('signout0')
    try {
      const config= {
        "Content-Type": "application/json"
      } 
      console.log('signout1')

      const res = await axios.get(`${API}/signout`, {config});
      console.log('signout2')
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      toast.error(err.response.data.error);
      dispatch({
          type:LOGOUT_FAIL

      })
      
    }
  }
  export const signup = user => async dispatch => {
    try {
      console.log('signup action')
      const config= {
        "Content-Type": "application/json"
      } 
      const res = await axios.post(`${API}/signup`, user, {config});
      
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      return res.data
      //dispatch(loadUser());
    } catch (err) {
      toast.error(err.response.data.error);
        console.log('err: ');
        dispatch({
            type:REGISTER_FAIL

        })
        
        
    }
  };

 // Login User
export const signin = ({email, password}) => async dispatch => {
  console.log(email)
  const body = { email, password };
  const config= {
    "Content-Type": "application/json"
  } 

  try {
    
    const res = await axios.post(`${API}/signin`, body, {config});
    console.log('res action: ',res)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    return res.data.user
  } catch (err) {
    console.log(err.response.data.err)
    toast.error(err.response.data.err);

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const userCart = async (cart, token) =>
  await axios.post(
    `${API}/user/cart`,
    { cart },
    {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }
  );

export const getUserCart = async (token) =>
  await axios.get(`${API}/user/cart`, {
     headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
  } 
  });

export const emptyUserCart = async (token) =>
  await axios.delete(`${API}/user/cart`, {
    headers: {
     "Content-Type": "application/json",
     "Authorization": `Bearer ${token}`
    } 
  }
 );

export const saveUserAddress = async (token, address) =>
  await axios.post(
    `${API}/user/address`,
    { address },
    {
      headers: {
       "Content-Type": "application/json",
       "Authorization": `Bearer ${token}`
    } 
   }
  );

  export const applyCoupon = async (token, coupon) =>
  await axios.post(
    `${API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      } 
    }
  );

  export const createOrder = async (paypalResponse,total, token) =>
  await axios.post(
    `${API}/user/order`,
    { paypalResponse, total },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      } 
    }
  );

export const getUserOrders = async (token) =>
  await axios.get(`${API}/user/orders`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });


//for admin
  export const getOrders = async (token) =>
  await axios.get(`${API}/admin/orders`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

export const changeStatus = async (orderId, orderStatus, token) =>
  await axios.put(
    `${API}/admin/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }
  );


  export const getWishlist = async (token) =>
  await axios.get(`${API}/user/wishlist`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

export const removeWishlist = async (productId, token) =>
  await axios.put(
    `${API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }
  );

export const addToWishlist = async (productId, token) =>
  await axios.post(
    `${API}/user/wishlist`,
    { productId },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }
  );


