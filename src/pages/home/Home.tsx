import { lazy, Suspense } from "react";
import Hero from "../../components/hero/Hero";
import HowWeWork from "../../components/how-we-work/HowWeWork";
import StrongSides from "../../components/marketing/strong-sides/StrongSides";
import WorkWithUs from "../../components/marketing/work-with-us/WorkWithUs";
import Seo from "../../components/seo/Seo";
import { organizationSchema } from "../../components/seo/data";
import Services from "../../components/services/Services";
import DeferredSection from "../../shared/ui/DeferredSection";
import Layout from "../../Layout";

const Slider = lazy(() => import("../../components/slider/Slider"));
const ContactSection = lazy(() => import("../../features/contact/ContactSection"));

export default function Home() {
  return (
    <Layout>
      <main>
        <Seo structuredData={organizationSchema} />
        <Hero />
        <StrongSides />
        <Services />
        <WorkWithUs />
      <DeferredSection placeholderClassName="min-h-[650px] bg-gray-950 sm:min-h-[900px] lg:min-h-[1050px]">
          <Suspense fallback={null}>
            <Slider />
          </Suspense>
        </DeferredSection>
        <HowWeWork />
      <DeferredSection placeholderClassName="min-h-[800px] bg-gray-950 sm:min-h-[900px]">
          <Suspense fallback={null}>
            <ContactSection />
          </Suspense>
        </DeferredSection>
      </main>
    </Layout>
  );
}
