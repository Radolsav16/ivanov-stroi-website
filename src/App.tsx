import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackToTopButton from "./BackToTopButton";
import FloatingCallButtons from "./FloatingCallButtons";
import ScrollToTop from "./ScrollToTop";
import PageLoader from "./PageLoader";
import ErrorBoundary from "./ErrorBoundary";

const Home = lazy(() => import("./pages/home/Home"));
const Gallery = lazy(() => import("./pages/gallery/Gallery"));
const Contacts = lazy(() => import("./pages/contacts/Contacts"));
const AboutUs = lazy(() => import("./components/about-us/AboutUs"));
const Services = lazy(() => import("./pages/service/Services"));
const NotFound = lazy(() => import("./NotFound"));

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact-us" element={<Contacts />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/services/:serviceName" element={<Services />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </ScrollToTop>
        </Suspense>
        <BackToTopButton />
        <FloatingCallButtons />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
