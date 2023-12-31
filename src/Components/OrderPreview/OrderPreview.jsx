import React, { useContext } from "react";
import { cartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function OrderPreview() {
  const { addProductToCart } = useContext(cartContext);

  const location = useLocation();
  console.log(location);

  return (
    <>
      <Helmet>
        <title>order preview</title>
      </Helmet>
      <div className="container w-75 pt-5">
        {location.state.cartItems.map((product, index) => (
          <div key={index}>
            <div className="row align-items-center border-bottom border-3">
              <div className="col-sm-1">
                <figure>
                  <img
                    src={product.product.imageCover}
                    className="w-100"
                    alt=""
                  />
                </figure>
              </div>

              <div className="col-sm-9">
                <figcaption>
                  <p>{product.product.title}</p>
                </figcaption>
              </div>

              <div className="col-sm-2">
                <div>
                  <h6>{product.price} EGP</h6>
                  <h6 className="text-muted">Qty: {product.count}</h6>
                  <button
                    onClick={async () => {
                      toast.loading("Adding product to the cart", {
                        duration: 1500,
                      });
                      await addProductToCart(product.product._id);
                      toast.success("Added successfully");
                    }}
                    className="btn mainBgColor btn-dark"
                  >
                    Buy Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
