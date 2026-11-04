import Hero from "./components/Hero";
import BuildersDemography from "./components/BuildersDemography";
import BuildingInNigeria from "./components/BuildingInNigeria";
import BuildingWithAI from "./components/BuildingWithAI";
import BuildersEcosystem from "./components/BuildersEcosystem";
import BankingOnTheBuilder from "./components/BankingOnTheBuilder";
import BuildersIndex from "./components/BuildersIndex";
import BuildingForTheFuture from "./components/BuildingForTheFuture";
import SectionNav from "./components/SectionNav";
import HeroIntro from "./components/HeroIntro";

export default function Home() {
  return (
    <>
      {/* Bottom padding = footer height, so the fixed footer never covers content */}
      <main className="flex-1 pb-14 sm:pb-16 lg:pb-18">
        <Hero />
        <BuildersDemography />
        <BuildingInNigeria />
        <BuildingWithAI />
        <BuildersEcosystem />
        <BankingOnTheBuilder />
        <BuildersIndex />
        <BuildingForTheFuture />
      </main>
      <SectionNav />
      {/* Intro overlay sits above everything, footer included */}
      <HeroIntro />
    </>
  );
}
