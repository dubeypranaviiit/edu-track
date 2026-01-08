import ContactBanner from "@/components/contact/ContactBanner";
import ContactForm from "@/components/contact/ContactForm";
const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
     
      <main className="grow">
        <ContactBanner />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <ContactForm />
        </div>
      </main>
   
    </div>
  );
};

export default page;
