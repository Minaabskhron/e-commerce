import React, { useContext } from "react";
import { cartContext } from "../../context/cartContext";
import "./Cart.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const {
    cartProducts,
    totalCartPrice,
    deleteProduct,
    updateCount,
    removeCartData,
  } = useContext(cartContext);

  async function removeCartDataComp() {
    toast.loading("removing cart products", {
      duration: 1500,
    });
    await removeCartData();
    toast.success("Cart removed");
  }

  async function updateCountCart(productId, count) {
    toast.loading("Updating...", {
      duration: 1500,
    });
    await updateCount(productId, count);
    if (count === 0) {
      deleteProduct(productId);
    }
    toast.success("updated successfully");
  }

  async function deleteProductCart(productId) {
    toast.loading("Deleting the item...", {
      duration: 1500,
    });
    await deleteProduct(productId);
    toast.success("item deleted sucessfully");
  }

  if (cartProducts.length === 0) {
    return (
      <>
        <Helmet>
          <title>cart</title>
        </Helmet>
        <h1>The Cart is empty</h1>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>cart</title>
      </Helmet>
      <div className="container mt-5 cartBgColor p-5">
        <h2>Shop Cart :</h2>
        <h6 className="mainColor">Total Cart Price : {totalCartPrice} EGP</h6>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-danger"
            onClick={() => {
              removeCartDataComp();
            }}
          >
            Remove cart products
          </button>

          <Link to={"/payment"} className="btn btn-primary text-white">
            Confirm payment
          </Link>
        </div>

        {cartProducts.map((product, index) => (
          <div
            key={index}
            className="row  align-items-center border-bottom border-3 py-2"
          >
            <div className="col-md-3">
              <figure>
                <img
                  className="w-75"
                  src={product.product.imageCover}
                  alt={product.product.title}
                />
              </figure>
            </div>
            <div className="col-md-7">
              <figcaption>
                <p>{product.product.title}</p>
              </figcaption>
              <div>
                <p className="mainColor">price: {product.price} EGP </p>
              </div>
              <button
                className="btn bg-transparent p-0"
                onClick={() => {
                  deleteProductCart(product.product.id);
                }}
              >
                <i className="fa-solid fa-trash-can pe-2 mainColor"></i>
                Remove
              </button>
            </div>

            <div className="col-md-2 d-flex justify-content-center align-items-center">
              <button
                onClick={() => {
                  updateCountCart(product.product.id, product.count + 1);
                }}
                className="btn btn-outline-primary"
              >
                {" "}
                +{" "}
              </button>
              <span className="px-1">{product.count} </span>
              <button
                onClick={() => {
                  updateCountCart(product.product.id, product.count - 1);
                }}
                className="btn btn-outline-primary"
              >
                {" "}
                {product.count == 1 ? (
                  <i className="fa-solid fa-trash-can"></i>
                ) : (
                  "-"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
