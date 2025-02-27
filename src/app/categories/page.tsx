import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch(
      "https://api.escuelajs.co/api/v1/categories/?offset=5&limit=5"
    );
    const data = await response.json();
    if (data) {
      setLoading(false);
    }
    setCategories(data);
  };

  return (
    <div className="flex flex-col md:p-20 p-10 gap-8 mt-8">
      <div className="flex flex-col md:flex-row justify-between text-center md:text-left">
        <div className="flex flex-col gap-2 md:w-[30%] ">
          <span className="text-4xl md:text-5xl font-black">
            Shop by Category
          </span>
          <span className="text-base mt-4 md:mt-0">
            There are many variations of passages of Lorem Ipsum available but
            the majority have suffered alteration in some form.
          </span>
        </div>
        <div className="flex flex-row gap-2 font-bold text-gray-900 items-center justify-center mt-6 hover:text-gray-700 cursor-pointer">
          <span>Browse all categories</span>
          <span>
            <ArrowRightIcon className="size-4" />
          </span>
        </div>
      </div>
      {loading ? (
        <div className="grid md:grid-cols-5 gap-4">
          <div className="flex flex-col gap-4 cursor-pointer relative rounded-xl">
            <div className="rounded-xl h-96 bg-gray-200 animate-pulse"></div>
          </div>
          <div className="flex flex-col gap-4 cursor-pointer relative rounded-xl">
            <div className="rounded-xl h-96 bg-gray-200 animate-pulse"></div>
          </div>
          <div className="flex flex-col gap-4 cursor-pointer relative rounded-xl">
            <div className="rounded-xl h-96 bg-gray-200 animate-pulse"></div>
          </div>
          <div className="flex flex-col gap-4 cursor-pointer relative rounded-xl">
            <div className="rounded-xl h-96 bg-gray-200 animate-pulse"></div>
          </div>
          <div className="flex flex-col gap-4 cursor-pointer relative rounded-xl">
            <div className="rounded-xl h-96 bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-5 gap-4">
          {categories.map((value: any, key: number) => (
            <div
              className="flex flex-col gap-4 cursor-pointer relative rounded-xl group"
              key={key}
            >
              <Link href={`categories/products/${value.id}`}>
                <img
                  src={value.image}
                  alt={value.name}
                  className="object-cover rounded-xl h-auto md:h-96"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 rounded-xl"></div>
                <div className="absolute bottom-0 p-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-300">
                  {value.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
