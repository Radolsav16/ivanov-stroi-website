import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackToTopButton from "./BackToTopButton";
import FloatingCallButtons from "./FloatingCallButtons";
import ScrollToTop from "./ScrollToTop";
import ErrorBoundary from "./ErrorBoundary";

import Home from "./pages/home/Home";
import Gallery from "./pages/gallery/Gallery";
import Contacts from "./pages/contacts/Contacts";
import AboutUs from "./components/about-us/AboutUs";
import Services from "./pages/service/Services";
import NotFound from "./NotFound";

export function AppContent() {
  return (
    <ErrorBoundary>
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
      <BackToTopButton />
      <FloatingCallButtons />
    </ErrorBoundary>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
