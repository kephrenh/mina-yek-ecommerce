"use client";

import useCartService from "@lib/hooks/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CartDetails() {
  const router = useRouter();
  const { items, itemsPrice, decrease, increase } = useCartService();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <>
      <h1 className="py-4 text-2xl">Mon Panier</h1>
      {items.length === 0 ? (
        <div>
          Votre panier est vide. <Link href="/">Ajouter des articles</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Article</th>
                  <th>Quantité</th>
                  <th>Prix</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2"> {item.name} </span>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => decrease(item)}>
                        -
                      </button>
                      <span className="px-3"> {item.qty} </span>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => increase(item)}>
                        +
                      </button>
                    </td>
                    <td>€{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card bg-base-300">
            <div className="card-body">
              <ul>
                <li>
                  <div className="pb-3 text-xl">
                    Sous-total: ({items.reduce((a, c) => a + c.qty, 0)}) : €{itemsPrice}
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/shipping")}
                    className="btn btn-primary w-full">
                    Choisir ma livraison
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default CartDetails;
