import { Variants } from "framer-motion";

export const titleVariants: Variants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: [0, 1, 1],
    transition: {
      duration: 1.2,
      ease: 'linear',
      times: [0, 0.5, 1],
    },
  },
};
