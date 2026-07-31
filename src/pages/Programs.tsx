import { useState } from "react";

import ProgramsHero from "../components/Programs/ProgramsHero";
import ProgramFilters from "../components/Programs/ProgramFilters";
import ProgramsGrid from "../components/Programs/ProgramsGrid";
import ProgramsCTA from "../components/Programs/ProgramsCTA";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Programs() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
     <>
      <Navbar />
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* Hero Section */}

      <ProgramsHero />

      {/* Category Filters */}

      <section className="mt-10">
        <ProgramFilters
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </section>

      {/* Programs */}

      <section className="mt-14">
        <ProgramsGrid activeCategory={activeCategory} />
      </section>

      {/* CTA */}

      <section className="mt-24 pb-24">
        <ProgramsCTA />
      </section>

    </main>
< Footer/>
    </>
  );
}