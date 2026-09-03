import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import { getActivities } from "@/lib/api/activities";
import { getPackages } from "@/lib/api/packages";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activities, packages] = await Promise.all([getActivities(), getPackages()]);

  return (
    <>
      <Navbar activities={activities} packages={packages} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
