import {
  Aban,
  Adinkrahene,
  Akoma,
  AnanseNtontan,
  Dwennimmen,
  GyeNyame,
  Nkyinkyim,
  Sankofa,
} from "@/ui/icons/adinkra-symbols";

export interface AvatarProps {
  id: number;
  label: string;
  value: string;
  meaning?: string;
  icon: React.ReactNode;
}

export const avataars: AvatarProps[] = [
  {
    id: 1,
    label: "Adinkrahene (Greatness)",
    value: "adinkrahene",
    icon: <Adinkrahene />,
    meaning: "A symbol of authority, leadership, and charisma.",
  },
  {
    id: 2,
    label: "Sankofa",
    value: "sankofa",
    icon: <Sankofa />,
    meaning: "Go back and get it",
  },
  {
    id: 3,
    label: "GyeNyame",
    value: "gyeNyame",
    icon: <GyeNyame />,
    meaning: "Expresses the omnipotence and supremacy of God.",
  },
  {
    id: 4,
    label: "Akoma (Love)",
    value: "akoma ",
    icon: <Akoma />,
    meaning:
      "A symbol of love, goodwill, patience, faithfulness, fondness, endurance, and consistency.",
  },
  {
    id: 5,
    label: "Aban",
    value: "aban",
    icon: <Aban />,
    meaning: "A symbol of strength, seat of power, authority and magnificence.",
  },
  {
    id: 6,
    label: "AnanseNtontan (Spider's web)",
    value: "ananseNtontan ",
    icon: <AnanseNtontan />,
    meaning: "A symbol of wisdom, creativity, and the complexities of life.",
  },
  {
    id: 7,
    label: "Dwennimmen",
    value: "Dwennimmen",
    icon: <Dwennimmen />,
    meaning: "A symbol of strength and humility.",
  },
  {
    id: 8,
    label: "Nkyinkyim (twisted)",
    value: "Nkyinkyim",
    icon: <Nkyinkyim />,
    meaning: "Represents life's journey, initiative, dynamism and versatility.",
  },
];
