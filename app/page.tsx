import Hero from "@/components/Hero/Hero";
import MapContainer from "@/components/Map/MapContainer";
import QuickLinks from "@/components/QuickLinks/QuickLinks";
import "@/globals/globals.css";
import { pageMetadata } from "@/globals/utils";
import s from "./page.module.css";

export async function generateMetadata(){
  return pageMetadata("Home")
}

export default function Home() {
  return (
    <main className={s.home}>
     <Hero />
     <QuickLinks />
     <MapContainer />
    </main>
  );
}
