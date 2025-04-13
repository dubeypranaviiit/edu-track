// app/contact/page.tsx

import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";
import ContactBanner from "@/components/contact/ContactBanner";
import ContactForm from "@/components/contact/ContactForm";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ContactBanner />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default page;
