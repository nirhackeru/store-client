import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    {console.log('order payment',order)}
    <p>
      <span>Order Id: {order._id}</span>
      {" / "}
      <span>
        Amount:
        {(order.paymentIntent.total ).toLocaleString("en-US", {
          style: "currency",
          currency: "ILS",
        })}
      </span>
      {!showStatus && (
      <>
      {" / "}
      <span>
        NAME:
        {order.paymentIntent.paypalResponse.address.recipient_name }
      </span>
      </>
      )}
     
      <br /> 
      {showStatus && (
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;
