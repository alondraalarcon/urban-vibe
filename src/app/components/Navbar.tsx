"use client";
import {
  ShoppingBagIcon,
  UserIcon,
  Bars4Icon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const [categories, setCategories] = useState<any>([]);
  const { cartCount, getCartCount, cartItems, removeFromCart } =
    useAppContext();
  const [showShoppingCart, setShowShoppingCart] = useState(false);

  useEffect(() => {
    getCartCount();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/categories/?offset=5&limit=5"
    );
    const data = await response.json();
    setCategories(data);
  };

  const showCart = () => {
    getCartCount();
    setShowShoppingCart(true);
  };

  return (
    <div className="flex flex-row gap-4 h-20 justify-between items-center p-10">
      <div className="flex flex-row">
        <span className="font-bold text-2xl mr-20">UrbanVibe</span>
        <div className="md:block hidden">
          <div className="flex flex-row gap-8 cursor-pointer text-gray-900">
            <Link href="/">
              {" "}
              <span className="hover:text-gray-700">Home</span>
            </Link>
            {categories.map((value: any, key: number) => (
              <Link href={`/categories/products/${value.id}`} key={key}>
                <span className="hover:text-gray-700">{value?.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <input
          type="text"
          className="h-10 w-64 rounded-lg border px-5 text-sm text-gray-500 focus:outline-1 focus:outline-gray-900 hidden md:block"
          placeholder="Search for products..."
        />
        <div className="relative">
          <ShoppingBagIcon
            className="size-6 cursor-pointer"
            onClick={() => showCart()}
          />
          <span className="absolute text-[8px] border-1 rounded-xl bg-gray-700 text-white w-5 h-5 text-center flex items-center justify-center bottom-[-10px] right-[-10px]">
            {cartCount}
          </span>
        </div>
        <div>
          <UserIcon className="size-6 cursor-pointer" />
        </div>
        <div className="md:hidden block">
          <Bars4Icon className="size-6 cursor-pointer" />
        </div>
      </div>
      {showShoppingCart && (
        <div className="fixed right-0 top-0 h-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 h-screen overflow-y-scroll shadow-lg w-[700px] relative ">
            <button
              onClick={() => setShowShoppingCart(false)}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
            >
              <span>x</span>
            </button>

            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item: any, key: number) => (
                  <li key={key} className="flex justify-between py-2 border-b">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2">
                        <img
                          src={item?.detail?.images[0]}
                          className="w-20 rounded-lg"
                        />
                        <div className="flex flex-col gap-1">
                          <span>{item?.detail?.title}</span>
                          <span>
                            <small>Quantity: </small>
                            {item?.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span>${item?.detail?.price}</span>
                      <span onClick={() => removeFromCart(key)}>
                        <TrashIcon className="size-5 cursor-pointer" />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
            <button className="mt-4 w-full bg-gray-900 text-white py-2 rounded-md">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
function fetchAllStoredItems() {
  throw new Error("Function not implemented.");
}
