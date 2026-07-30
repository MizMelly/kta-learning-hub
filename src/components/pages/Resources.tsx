import { useState } from "react";

import ResourcesHero from "../Resources/ResourcesHero";
import ResourceFilters from "../Resources/ResourceFilters";
import FeaturedResource from "../Resources/FeaturedResource";
import ResourcesGrid from "../Resources/ResourcesGrid";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar />
    <main className="min-h-screen bg-[#FAFAF7] pt-3 pb-16 sm:pt-4 sm:pb-20 lg:pt-8 lg:pb-24">

      {/* Hero */}

      <ResourcesHero />

      {/* Search + Filters */}

      <ResourceFilters
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        search={search}
        setSearch={setSearch}
      />

      {/* Featured Resource */}

      <FeaturedResource />

      {/* Resources */}

      <ResourcesGrid
        activeCategory={activeCategory}
        search={search}
      />

    </main>
 
 < Footer/>

    </>
  );
}