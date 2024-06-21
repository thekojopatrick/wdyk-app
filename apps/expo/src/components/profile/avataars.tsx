import {
  Aban,
  Adinkrahene,
  Akoma,
  AnanseNtontan,
  GyeNyame,
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
    label: "Adinkrahene",
    value: "adinkrahene",
    icon: <Adinkrahene />,
    meaning: "A symbol of authority, leadership, and charisma",
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
    meaning: "Except for God",
  },
  {
    id: 4,
    label: "Akoma",
    value: "akoma ",
    icon: <Akoma />,
    meaning: "Love",
  },
  {
    id: 5,
    label: "Aban",
    value: "aban",
    icon: <Aban />,
    meaning: "Freedom",
  },
  {
    id: 6,
    label: "AnanseNtontan ",
    value: "ananseNtontan ",
    icon: <AnanseNtontan />,
    meaning: "God’s tree",
  },
];
