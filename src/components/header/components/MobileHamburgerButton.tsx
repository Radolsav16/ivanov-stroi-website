import { Bars3Icon } from "@heroicons/react/24/outline";

export function MobileHamburgerButton({onClick}:{onClick:() => void}) {
    return(
             <div className="flex lg:hidden">
                  <button
                    type="button"
                    onClick={onClick}
                    aria-label="Отвори менюто"
                    className="
                  -m-2.5
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  p-2.5
                  text-gray-300
                  transition
                  hover:bg-white/5
                  hover:text-white
                "
                  >
                    <Bars3Icon aria-hidden="true" className="size-6" />
                  </button>
                </div>
    )
}
