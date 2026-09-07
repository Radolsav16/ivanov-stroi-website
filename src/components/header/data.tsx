import {
  Bath,
  House,
  PaintRoller,
  Fence,
  Pipette,
  Paintbrush,
  Gem,
  Zap,
  Blocks,
  Grid3X3,
  PanelTop,
} from "lucide-react";
import { services as serviceCards } from "../services/data";

const serviceIcons = {
  "remont-na-banya": Bath,
  "remont-na-apartamenti": House,
  mazilki: PaintRoller,
  "stalbishta-dvorno-stroitelstvo": Fence,
  "vik-instalatsii": Pipette,
  "boyadjijski-uslugi": Paintbrush,
  "polirane-na-estestven-kamak": Gem,
  "el-instalatsii": Zap,
  "lepene-na-estestven-kamak": Blocks,
  "lepene-na-plochki": Grid3X3,
  shpaklovane: PanelTop,
  gipsokarton: PanelTop,
} as const;

export const services = serviceCards.map((service) => {
  const Icon = serviceIcons[service.id as keyof typeof serviceIcons];

  return {
    id: service.id,
    title: service.title,
    icon: <Icon className="size-6" />,
  };
});

export const navLinks = [
  { title: "Галерия", href: "/gallery" },
  { title: "За нас", href: "/about-us" },
  { title: "Контакти", href: "/contact-us" },
];
