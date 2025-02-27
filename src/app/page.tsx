"use client";
import { Suspense, useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRightIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Product from "./product/page";
import Categories from "./categories/page";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between gap-4 max-h-screen">
        <div className="flex flex-col gap-8 md:w-[50%] p-10 bg-gray-100 h-screen place-content-center">
          <h1 className="text-6xl font-black">
            Summer styles are <br /> finally here
          </h1>
          <span className="text-lg">
            This year, our new summer collection will shelter you from the harsh
            elements of a world that doesn't care if you live or die.
          </span>
          <div className="self-start">
            <button
              type="button"
              className="rounded-xl bg-gray-900 p-4 w-48 text-white hover:bg-gray-700"
            >
              Shop Now
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <img src="/homepage/homepage-hero.png" />
        </div>
      </div>

      <Product />
      <Categories/>
    </div>
  );
}
