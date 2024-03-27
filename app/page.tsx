import Hero from "@/components/Hero/Hero";
import Hero_Mobile from "@/components/Hero/Hero_Mobile";
import MapContainer from "@/components/Map/MapContainer";
import QuickLinks from "@/components/QuickLinks/QuickLinks";
import Facebook_Feed from "@/components/Social/Facebook_Feed";
import "@/globals/globals.css";
import { pageMetadata } from "@/globals/utils";

export async function generateMetadata(){
  return pageMetadata("Home")
}

export default function Home() {
  return (
    <main>
     <Hero />
     <Hero_Mobile />
     <QuickLinks />
     <MapContainer />
     <Facebook_Feed />
    </main>
  );
}
