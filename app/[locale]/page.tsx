import { getTranslations, setRequestLocale } from "next-intl/server";
import { auth } from "@/lib/auth/auth";

import NavBar from "@/components/navbar";
import Hero from "@/components/hero/hero";
import Stats from "@/components/stats";
import Footer from "@/components/footer";
import dynamic from "next/dynamic";

const Features = dynamic(() => import("@/components/features"));

const Workflow = dynamic(() => import("@/components/workflow"));

const Pricing = dynamic(() => import("@/components/pricing"));

const FinalCta = dynamic(() => import("@/components/final-cta"));

interface LandingPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { locale } = await params;

  // Set request locale for static rendering/caching optimization
  setRequestLocale(locale);

  // Fetch translations for the Landing Page namespace
  const t = await getTranslations("Landing");
  const session = await auth();

  return (
    <>
      <NavBar />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <Features />
        <Workflow />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
