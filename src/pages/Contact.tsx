import ContactHero from "../components/Contact/ContactHero";
import ContactInfo from "../components/Contact/ContactInfo";
import ContactForm from "../components/Contact/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Contact() {
  return (

    <>
      <Navbar />
    <main className="bg-[#FCFCFA] pb-24">
      <ContactHero />

      <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </main>
<Footer />
    </>
  );
}