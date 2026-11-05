import type { Metadata } from "next";
import Hero from "@/sections/Hero";
import HomeSections from "@/sections/HomeSections";
import { getHomePage } from "@/lib/api/pages";
import { getActivities } from "@/lib/api/activities";
import { getPackages } from "@/lib/api/packages";

export const metadata: Metadata = {
  title: "Forest Hideaway Resort — Luxury Jungle Lodge in Bardia National Park, Nepal",
  description:
    "An unhurried safari escape on the edge of Bardia National Park — guided jeep and walking safaris, Tharu cultural evenings, and warm jungle hospitality for every pace of traveler.",
};

const FEATURED_COUNT = 3;

export default async function Home() {
  const [page, activities, packages] = await Promise.all([
    getHomePage(),
    getActivities(),
    getPackages(),
  ]);

  const { hero, ...sections } = page;

  return (
    <>
      <Hero content={hero} />
      <HomeSections
        content={sections}
        activities={activities.slice(0, FEATURED_COUNT)}
        packages={packages.slice(0, FEATURED_COUNT)}
      />
    </>
  );
}
