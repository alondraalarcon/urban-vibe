"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductsByCategory() {
  const params = useParams();
  const [products, setProducts] = useState<any>([]);
  const [category, setCategory] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategoryDetails();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/?categoryId=${params.id}`
    );
    const data = await response.json();
    if (data) {
      setLoading(false);
    }
    console.log(data);
    setProducts(data);
  };

  const fetchCategoryDetails = async () => {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/categories/${params.id}`
    );
    const data = await response.json();
    setCategory(data);
  };

  return (
    <div className="flex flex-col md:p-20 p-10 gap-8 border-t">
      <div className="flex flex-row">
        <span className="font-black text-5xl">{category?.name}</span>
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
                  <div className="flex flex-col text-left">
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
