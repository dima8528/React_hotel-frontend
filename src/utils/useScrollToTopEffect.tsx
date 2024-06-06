import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTopEffect = () => {
  const pathname = useLocation().pathname;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}
