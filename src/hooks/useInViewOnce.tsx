import { useState, useEffect, useRef, MutableRefObject } from 'react';

const useInViewOnce = (options: IntersectionObserverInit): [MutableRefObject<HTMLDivElement | null>, boolean] => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [inView, options]);

  return [ref, inView];
};

export default useInViewOnce;
