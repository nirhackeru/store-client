import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createOrder,
} from "../actions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {PAYPAL} from '../config';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { Link } from "react-router-dom";


const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [succeeded, setSucceeded] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  let env = 'sandbox'; // set here to 'production' for production
  let currency = 'ILS'; 
  const client = {
    sandbox: PAYPAL,
    production: 'YOUR-PRODUCTION-APP-ID' //add the client_id of production
  };
  console.log('paypal: ',PAYPAL)
  // let env = 'production'; 
  // let currency = 'ILS'; 
  // const client = {
  //   sandbox: 'YOUR-SANDBOX-APP-ID',
  //   production: config.client_id, //add the client_id of production
  // };

  const onSuccess = (payment) => {
    console.log('The payment was succeeded!', payment);

    createOrder(payment,total, user.token).then((res) => {
      if (res.data.ok) {
        // empty cart from local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty cart from redux
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // reset coupon to false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty cart from database
        emptyUserCart(user.token);
        history.push('/user/history');
      }
    });
    setSucceeded(true)
  

  };

 
  const onCancel = (data) => {
    console.log('The payment was cancelled!', data);
    toast.warning('Payment cancel')
    
  };

  const onError = (err) => {
    console.log('Error!', err);
    toast.warning('Payment cancel',err)

  };

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );

  return (
    <>

    <div className="row" style={{marginRight:'0px', marginLeft:'0px'}}>
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: {total}</p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}

        <div className="row" >
          <div className="col-md-6">
            {
              !addressSaved || !products.length ? 
              <button
              className="btn btn-primary"
              disabled={!addressSaved || !products.length}
              onClick={() => history.push("/payment")}
            >
              Place Order
            </button> 
            :
            
            <PaypalExpressBtn
            env={env}
            client={client}
            currency={currency}
            total={total}
            onError={onError}
            onSuccess={onSuccess}
            onCancel={onCancel}
            
          /> 
            }
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
      
    </div>
    
    </>
  );
};

export default Checkout;
//sb-b3eoq5788290@personal.example.com
//b&lcA9]C

