import CheckoutButton from "@/components/payment/EnrollNow";

export default function page() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Buy Our Awesome Product</h1>
      <CheckoutButton />
    </main>
  );
}
