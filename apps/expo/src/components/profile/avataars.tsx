import {
  Aban,
  Adinkrahene,
  Akoma,
  AnanseNtontan,
  GyeNyame,
  Sankofa,
} from "@/ui/icons/adinkra-symbols";

interface AvatarProps {
  id: number;
  label: string;
  value: string;
  icon: React.ReactNode;
}

export const avataars: AvatarProps[] = [
  {
    id: 1,
    label: "Adinkrahene",
    value: "adinkrahene",
    icon: <Adinkrahene />,
  },
  {
    id: 2,
    label: "Sankofa",
    value: "sankofa",
    icon: <Sankofa />,
  },
  {
    id: 3,
    label: "GyeNyame",
    value: "gyeNyame",
    icon: <GyeNyame />,
  },
  {
    id: 4,
    label: "Akoma",
    value: "akoma ",
    icon: <Akoma />,
  },
  {
    id: 5,
    label: "Aban",
    value: "aban",
    icon: <Aban />,
  },
  {
    id: 6,
    label: "AnanseNtontan ",
    value: "ananseNtontan ",
    icon: <AnanseNtontan />,
  },
];
