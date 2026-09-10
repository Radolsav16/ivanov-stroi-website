import { ArrowLeft, Home, HardHat } from "lucide-react";
import Layout from "./Layout";
import Seo from "./components/seo/Seo";
import ActionLink from "./shared/ui/ActionLink";
import Container from "./shared/ui/Container";

export default function NotFound() {
  return (
    <Layout>
    <Seo title="Страницата не е намерена" path="/404" noIndex />
    <main className="relative isolate flex min-h-screen items-center overflow-hidden bg-gray-950 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[140px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/95 to-gray-950" />
      </div>

      <Container className="py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur">
            <HardHat className="size-7 text-amber-500" />
          </div>

          <div className="relative">
            <span className="select-none text-[9rem] font-black leading-none tracking-[-0.08em] text-white/[0.04] sm:text-[13rem]">
              404
            </span>
          </div>

          {/* Content */}
          <div className="mt-2">
            <h1 className="sr-only">Страницата не е намерена</h1>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">
              Страницата не е намерена
            </p>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
              Страницата, която търсите, не съществува или вече е преместена.
              Върнете се към началната страница и продължете разглеждането.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ActionLink
              to="/"
              className="w-full sm:w-auto"
              icon={<Home className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />}
              iconPosition="start"
            >
              Към началото
            </ActionLink>

            <ActionLink
              to="/contact-us"
              variant="secondary"
              className="w-full sm:w-auto"
              icon={<ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />}
              iconPosition="start"
            >
              Към контактите
            </ActionLink>
          </div>

          <div className="mx-auto mt-16 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-white/10" />
            <span className="size-1.5 rounded-full bg-amber-500" />
            <span className="h-px w-12 bg-white/10" />
          </div>
        </div>
      </Container>
    </main>
    </Layout>
  );
}
