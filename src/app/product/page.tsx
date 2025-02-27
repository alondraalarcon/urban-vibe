"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Product() {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/products/?offset=8&limit=8"
    );
    const data = await response.json();
    if (data) {
      setLoading(false);
    }
    setProducts(data);
  };

  return (
    <div className="flex flex-col md:p-20 p-10 gap-8 mt-12">
      <div className="flex flex-col justify-center items-center text-center md:gap-2 gap-4 mb-8">
        <span className="text-lg font-bold text-gray-600">Recent Products</span>
        <span className="text-4xl md:text-5xl font-black text-gray-900">
          Top Collections
        </span>
        <span className="text-base font-medium md:w-[35%] text-center text-gray-500">
          There are many variations of passages of Lorem Ipsum available but the
          majority have suffered alteration in some form.
        </span>
      </div>
      {loading ? (
        <div className="grid md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4 bg-white h-auto">
            <div className="bg-gray-200 animate-pulse h-72 rounded-xl"></div>
            <div className="flex flex-col gap-4">
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-white h-auto">
            <div className="bg-gray-200 animate-pulse h-72 rounded-xl"></div>
            <div className="flex flex-col gap-4">
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-white h-auto">
            <div className="bg-gray-200 animate-pulse h-72 rounded-xl"></div>
            <div className="flex flex-col gap-4">
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-white h-auto">
            <div className="bg-gray-200 animate-pulse h-72 rounded-xl"></div>
            <div className="flex flex-col gap-4">
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-white h-auto">
            <div className="bg-gray-200 animate-pulse h-72 rounded-xl"></div>
            <div className="flex flex-col gap-4">
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-white h-auto">
            <div className="bg-gray-200 animate-pulse h-72 rounded-xl"></div>
            <div className="flex flex-col gap-4">
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-white h-auto">
            <div className="bg-gray-200 animate-pulse h-72 rounded-xl"></div>
            <div className="flex flex-col gap-4">
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-white h-auto">
            <div className="bg-gray-200 animate-pulse h-72 rounded-xl"></div>
            <div className="flex flex-col gap-4">
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
              <span className="text-base bg-gray-200 h-6 animate-pulse rounded-xl" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-8">
          {products.map((value: any, key: number) => (
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
              key={key}
            >
              <div className="flex flex-col gap-4 bg-white h-auto rounded-xl cursor-pointer">
                <Link href={`/product/detail/${value.id}`}>
                  <img
                    src={value.images[0]}
                    alt={value.title}
                    className="object-fill rounded-xl md:max-h-96"
                  />
                  <div className="flex flex-col text-center md:text-left">
                    <span className="text-base">{value.title}</span>
                    <span className="italic text-[13px]">
                      {value?.category?.name}
                    </span>
                    <span className="font-bold">${value.price}</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
