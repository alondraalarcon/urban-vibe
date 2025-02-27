"use client";
import {
  ShoppingBagIcon,
  UserIcon,
  Bars4Icon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [categories, setCategories] = useState<any>([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/categories/?offset=5&limit=5"
    );
    const data = await response.json();
    setCategories(data);
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
        <div>
          <ShoppingBagIcon className="size-6 cursor-pointer" />
        </div>
        <div>
          <UserIcon className="size-6 cursor-pointer" />
        </div>
        <div className="md:hidden block">
          <Bars4Icon className="size-6 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
