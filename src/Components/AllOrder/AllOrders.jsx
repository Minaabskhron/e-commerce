import React, { useContext } from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { profileContext } from "../../context/profileContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  const { AllOrders, getAllOrders } = useContext(profileContext);

  const { isLoading } = useQuery("allOrders", getAllOrders);

  const nav = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>all orders</title>
      </Helmet>
      <div className="container p-5">
        <h5>Order List</h5>
        <table className="table table-striped text-center mt-4">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item Quantity</th>
              <th>Amount</th>
              <th>Payment method</th>
              <th>Items</th>
            </tr>
          </thead>

          <tbody>
            {AllOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.createdAt.split("T").slice(0, 1)}</td>
                <td>{order.cartItems.length}</td>
                <td>{order.totalOrderPrice} EGP</td>
                <td>{order.paymentMethodType}</td>
                <td>
                  <button
                    onClick={() => {
                      nav("/Orderpreview", { state: order });
                    }}
                    className="btn mainBgColor text-white btn-dark"
                  >
                    view
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
