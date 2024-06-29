const steps: string[] = ["Connexion", "Adresse de livraison", "Mode de paiement", "Commander"];

const CheckoutSteps = ({ current = 0 }) => {
  return (
    <ul className="steps steps-vertical lg:steps-horizontal w-full mt-4">
      {steps.map((step, index) => (
        <li
          key={step}
          className={`step ${index <= current ? "step-primary" : ""}`}>
          {" "}
          {step}{" "}
        </li>
      ))}
    </ul>
  );
};
export default CheckoutSteps;
