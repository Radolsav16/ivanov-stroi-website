import { useParams, Navigate } from "react-router-dom";
import Layout from "../../Layout";
import Service from "./components/Service";
import { services } from "./data";
import Seo from "../../components/seo/Seo";
import { createServiceSchema } from "../../components/seo/data";
import { serviceGuides } from "./guides";
import type { ServiceSlug } from "../../data/serviceSlugs";

export default function Services() {
  const { serviceName } = useParams<{ serviceName: string }>();

  const serviceSlug = serviceName && serviceName in services
    ? serviceName as ServiceSlug
    : undefined;
  if (!serviceSlug) {
    return <Navigate to="/404" replace />;
  }

  const service = services[serviceSlug];
  const guide = serviceGuides[serviceSlug];

  return (
    <Layout>
      <main className="overflow-hidden bg-gray-950 text-white">
        <Seo
          title={`${service.title} в София`}
          description={service.overview}
          path={`/services/${serviceName}`}
          structuredData={createServiceSchema({
            title: service.title,
            description: service.overview,
            path: `/services/${serviceName}`,
            faq: guide.faq,
          })}
        />
        <Service service={service} serviceSlug={serviceSlug} guide={guide} />
      </main>
    </Layout>
  );
}
