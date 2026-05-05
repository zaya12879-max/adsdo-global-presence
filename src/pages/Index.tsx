import { LanguageProvider } from "@/i18n/LanguageContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <LanguageProvider>
      <div id="top" className="min-h-screen font-sans antialiased">
        <Header />
        <main>
          <Hero />
          <Services />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
