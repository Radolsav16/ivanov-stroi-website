import { useParams, Navigate } from "react-router-dom";
import Layout from "../../Layout";
import Service from "./components/Service";
import { services } from "./data";
import Seo from "../../components/seo/Seo";
import { createServiceSchema } from "../../components/seo/data";

export default function Services() {
  const { serviceName } = useParams<{ serviceName: string }>();

  const service = serviceName && serviceName in services
    ? services[serviceName as keyof typeof services]
    : undefined;

  if (!service) {
    return <Navigate to="/404" replace />;
  }

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
          })}
        />
        <Service service={service} />
      </main>
    </Layout>
  );
}
