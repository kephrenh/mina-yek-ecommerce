import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Méthode de paiement",
};

const PaymentPage = () => {
  return <Form />;
};
export default PaymentPage;
