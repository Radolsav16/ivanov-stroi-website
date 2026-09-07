import {
  Bath,
  Blocks,
  Fence,
  Gem,
  Grid3X3,
  House,
  Paintbrush,
  PaintRoller,
  PanelTop,
  Pipette,
  Zap,
} from "lucide-react";
import { serviceSlugs, type ServiceSlug } from "../../data/serviceSlugs";
import { services as serviceDetails } from "../../pages/service/data";

const serviceIcons: Record<ServiceSlug, typeof Bath> = {
  "remont-na-banya": Bath,
  "remont-na-apartamenti": House,
  mazilki: PaintRoller,
  gipsokarton: PanelTop,
  "stalbishta-dvorno-stroitelstvo": Fence,
  "vik-instalatsii": Pipette,
  "boyadjijski-uslugi": Paintbrush,
  "polirane-na-estestven-kamak": Gem,
  "el-instalatsii": Zap,
  "lepene-na-estestven-kamak": Blocks,
  "lepene-na-plochki": Grid3X3,
  shpaklovane: PanelTop,
};

export const services = serviceSlugs.map((id, index) => {
  const service = serviceDetails[id];
  const Icon = serviceIcons[id];

  return {
    id,
    number: String(index + 1).padStart(2, "0"),
    title: service.title,
    description: service.cardDescription,
    image: service.cardImage,
    icon: <Icon className="size-6" />,
    href: `/services/${id}`,
  };
});
