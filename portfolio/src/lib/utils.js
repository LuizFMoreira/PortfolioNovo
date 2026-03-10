import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Esta função funde vetores de classes do Tailwind de forma otimizada O(1)
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}