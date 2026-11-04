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
      {/* Footer-height bottom padding lives on the last section so it keeps its dark background */}
      <main className="flex-1">
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
