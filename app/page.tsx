import Hero from "@/components/Hero/Hero";
import MapContainer from "@/components/Map/MapContainer";
import QuickLinks from "@/components/QuickLinks/QuickLinks";

export default function Home() {
  return (
    <main>
     <Hero />
     <QuickLinks />
     <MapContainer />
     <section></section>
    </main>
  );
}
