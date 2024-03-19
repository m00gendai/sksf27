import Hero from "@/components/Hero/Hero";
import Hero_Mobile from "@/components/Hero/Hero_Mobile";
import MapContainer from "@/components/Map/MapContainer";
import QuickLinks from "@/components/QuickLinks/QuickLinks";
import "@/globals/globals.css";

export default function Home() {
  return (
    <main>
     <Hero />
     <Hero_Mobile />
     <QuickLinks />
     <MapContainer />
     <section></section>
    </main>
  );
}
