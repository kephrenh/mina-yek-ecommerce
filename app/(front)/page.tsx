/* eslint-disable @next/next/no-img-element */
import ProductCard from "@components/products/ProductCard";
import data from "@lib/data";
import productService from "@lib/services/product.service";
import { convertDocToObj } from "@lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Mina Yek Fashion",
  description: process.env.NEXT_PUBLIC_APP_DESC || "Vos tenues africaines préférées",
};

export default async function Home() {
  const featuredProducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();
  return (
    <>
      <div className="w-full carousel rounded-box mt-4">
        {featuredProducts.map((product, index) => (
          <>
            <div
              key={product._id}
              id={`slide-${index}`}
              className="carousel-item relative w-full">
              <Link href={`/product/${product.slug}`}>
                <img
                  src={product.banner}
                  alt={product.name}
                  className="w-full"
                />
              </Link>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a
                  className="btn btn-circle"
                  href={`#slide-${index === 0 ? featuredProducts.length - 1 : index - 1}`}>
                  ❮
                </a>
                <a
                  className="btn btn-circle"
                  href={`#slide-${index === featuredProducts.length - 1 ? 0 : index + 1}`}>
                  ❯
                </a>
              </div>
            </div>
          </>
        ))}
      </div>
      <h2 className="text-2xl py-2">Produits Récents</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {latestProducts.map((product) => (
          <ProductCard
            key={product.slug}
            product={convertDocToObj(product)}
          />
        ))}
      </div>
    </>
  );
}
