import {
  Smartphone, Laptop, Headphones, Tablet, Watch,
  Camera, Volume2, Gamepad2, Monitor
} from "lucide-react";
import type{ Category } from "../types";

export const CATEGORIES: Category[] = [
  { name: "Smartphones", icon: Smartphone },
  { name: "Laptops", icon: Laptop },
  { name: "Headphones", icon: Headphones },
  { name: "Tablets", icon: Tablet },
  { name: "Smartwatches", icon: Watch },
  { name: "Cameras", icon: Camera },
  { name: "Speakers", icon: Volume2 },
  { name: "Gaming Accessories", icon: Gamepad2 },
  { name: "Monitors", icon: Monitor },
];