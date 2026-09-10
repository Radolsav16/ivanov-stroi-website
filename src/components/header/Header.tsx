import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  PopoverGroup,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { navLinks, services } from "./data";
import { Link } from "react-router-dom";
import HomeLink from "./components/HomeLink";
import { MobileHamburgerButton } from "./components/MobileHamburgerButton";
import ServiceNavigationDropdown from "./components/ServiceNavigationDropdown";
import Container from "../../shared/ui/Container";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50  bg-gray-950 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <nav>
        <Container className="flex items-center justify-between py-4">
          <HomeLink />
          <MobileHamburgerButton onClick={() => setMobileMenuOpen(true)} />

          <PopoverGroup className="hidden items-center lg:flex lg:gap-x-2">
            <ServiceNavigationDropdown services={services} />
            {navLinks.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="
            group
            relative
            rounded-xl
            px-4
            py-2.5
            text-sm
            font-semibold
            text-gray-300
            transition-all
            duration-200
            hover:bg-white/5
            hover:text-white
          "
              >
                {item.title}

                <span
                  className="
              absolute
              bottom-1
              left-1/2
              h-0.5
              w-0
              -translate-x-1/2
              rounded-full
              bg-amber-500
              transition-all
              duration-300
              group-hover:w-1/2
            "
                />
              </Link>
            ))}
          </PopoverGroup>
        </Container>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <DialogPanel
          className="
        fixed
        inset-y-0
        right-0
        z-50
        w-full
        overflow-y-auto
        border-l
        border-white/10
        bg-gray-950
        p-6
        pb-8
        shadow-2xl
        sm:max-w-sm
      "
        >
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="-m-1.5 p-1.5"
              onClick={handleMobileNavClick}
            >
              <span className="text-2xl font-extrabold uppercase tracking-[0.15em] transition-transform duration-300 group-hover:scale-[1.03] sm:block">
                <span className="text-amber-500 transition-colors duration-300 group-hover:text-amber-400">
                  IVANOV
                </span>
                <span className="text-white transition-colors duration-300 group-hover:text-amber-500">
                  STROI
                </span>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Затвори менюто"
              className="
            -m-2.5
            rounded-xl
            p-2.5
            text-gray-400
            transition
            hover:bg-white/5
            hover:text-white
          "
            >
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-8 flow-root">
            <div className="divide-y divide-white/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div">
                  <DisclosureButton
                    className="
                  group
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-3
                  text-base
                  font-semibold
                  text-white
                  transition
                "
                  >
                    Услуги
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="
                    size-5
                    text-gray-500
                    transition-transform
                    group-data-open:rotate-180
                    group-data-open:text-amber-500
                    cursor-pointer
                  "
                    />
                  </DisclosureButton>

                  <DisclosurePanel className="mt-2 space-y-1">
                    {services.map((item, idx) => (
                      <Link
                        key={idx}
                        to={`/services/${item.id}`}
                        onClick={handleMobileNavClick}
                        className="
                      group
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-4
                      py-3
                      pl-6
                      text-sm
                      font-medium
                      text-gray-400
                      transition
                    "
                      >
                        {item.title}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                <Link
                  to="/gallery"
                  onClick={handleMobileNavClick}
                  className="
                block
                rounded-xl
                px-4
                py-3
                text-base
                font-semibold
                text-white
                transition
              "
                >
                  Галерия
                </Link>

                <Link
                  to="/about-us"
                  onClick={handleMobileNavClick}
                  className="
                block
                rounded-xl
                px-4
                py-3
                text-base
                font-semibold
                text-white
                transition
              "
                >
                  За нас
                </Link>

                <Link
                  to="/contact-us"
                  onClick={handleMobileNavClick}
                  className="
                block
                rounded-xl
                px-4
                py-3
                text-base
                font-semibold
                text-white
                transition
              "
                >
                  Контакти
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
