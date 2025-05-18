import { Content } from "@prismicio/client";
import { IconType } from "react-icons";
import {
  LuCrown,
  LuDroplet,
  LuFlame,
  LuGem,
  LuTreePine,
  LuZap,
} from "react-icons/lu";

interface AttributeData {
  label: string;
  Icon: IconType;
}

const SCENT_PROFILES: Record<
  Content.FragranceDocumentData["scent_profile"],
  AttributeData
> = {
  spicy: { label: "Spicy & Smoky", Icon: LuFlame },
  woody: { label: "Woody & Herbal", Icon: LuTreePine },
  fresh: { label: "Fresh & Aquatic", Icon: LuDroplet },
};

const MOODS: Record<Content.FragranceDocumentData["mood"], AttributeData> = {
  bold: { label: "Bold & Seductive", Icon: LuCrown },
  grounded: { label: "Grounded & Sophisticated", Icon: LuGem },
  refreshing: { label: "Refreshing & Invigorating", Icon: LuZap },
};

interface FragranceAttributesProps {
  scentProfile: Content.FragranceDocumentData["scent_profile"];
  mood: Content.FragranceDocumentData["mood"];
  className?: string;
}

export const FragranceAttributes = ({
  mood: providedMood,
  scentProfile: providedScentProfile,
  className,
}: FragranceAttributesProps) => {
  const scentProfile = SCENT_PROFILES[providedScentProfile];
  const mood = MOODS[providedMood];

  return (
    <div className={className}>
      <p className="text-base mb-2 font-semibold uppercase">Features</p>

      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <scentProfile.Icon className="size-6 text-gray-300" />
          <p className="text-sm font-light">{scentProfile.label}</p>
        </div>
        <div className="flex items-center gap-2">
          <mood.Icon className="size-6 text-gray-300" />
          <p className="text-sm font-light">{mood.label}</p>
        </div>
       
      </div>
    </div>
  );
};
