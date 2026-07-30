import { useState } from "react";

import ProgramsHero from "../Programs/ProgramsHero";
import ProgramFilters from "../Programs/ProgramFilters";
import ProgramsGrid from "../Programs/ProgramsGrid";
import ProgramsCTA from "../Programs/ProgramsCTA";
import Navbar from "../Navbar";
import Footer from "../Footer";


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