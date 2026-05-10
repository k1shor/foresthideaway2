import Hero from "@/sections/Hero";
import HomeSections from "@/sections/HomeSections";

export default async function Home() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/api/status`, { cache: 'no-store' });
    const data = await res.json();
    console.log("Backend Connection Status:", data.message);
  } catch (error) {
    console.log("Backend Connection Status: Failed to connect to backend", error instanceof Error ? error.message : String(error));
  }

  return (
    <>
      <Hero />
      <HomeSections />
    </>
  );
}
