"use client";
import CheckoutSteps from "@components/CheckoutSteps";
import useCartService from "@lib/hooks/useCartStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import Image from "next/image";

const Form = () => {
  const router = useRouter();
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService();

  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async (url) => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        clear();
        toast.success("Commande passée avec succès");
        return router.push(`/order/${data.order._id}`);
      } else {
        toast.error(data.message);
      }
    }
  );
  useEffect(() => {
    if (!paymentMethod) {
      return router.push("/payment");
    }
    if (items.length === 0) {
      return router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, router]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div>
      <CheckoutSteps current={4} />

      <div className="grid md:grid-cols-4 md:gap-5 my-4">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title">Adresse de livraison</h2>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}{" "}
              </p>
              <div>
                <Link
                  className="btn"
                  href="/shipping">
                  Modifier
                </Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-300 mt-4">
            <div className="card-body">
              <h2 className="card-title">Mode de paiement</h2>
              <p>{paymentMethod}</p>
              <div>
                <Link
                  className="btn"
                  href="/payment">
                  Modifier
                </Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-300 mt-4">
            <div className="card-body">
              <h2 className="card-title">Articles</h2>
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
                            height={50}></Image>
                          <span className="px-2">
                            {item.name}({item.color} {item.size})
                          </span>
                        </Link>
                      </td>
                      <td>
                        <span>{item.qty}</span>
                      </td>
                      <td>${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link
                  className="btn"
                  href="/cart">
                  Modifier
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title">Récapitulatif</h2>
              <ul className="space-y-3">
                <li>
                  <div className=" flex justify-between">
                    <div>Sous-total</div>
                    <div>€{itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className=" flex justify-between">
                    <div>TVA</div>
                    <div>€{taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className=" flex justify-between">
                    <div>Livraison</div>
                    <div>€{shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className=" flex justify-between">
                    <div>Total</div>
                    <div>€{totalPrice}</div>
                  </div>
                </li>

                <li>
                  <button
                    onClick={() => placeOrder()}
                    disabled={isPlacing}
                    className="btn btn-primary w-full">
                    {isPlacing && <span className="loading loading-spinner"></span>}
                    Commander
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
