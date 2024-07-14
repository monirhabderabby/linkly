"use client";

import { useEffect, useState } from "react";

const useDeviceDetect = () => {
  const [mounted, setMounted] = useState<true | false>(false);
  const [isMobile, setMobile] = useState<true | false>(false);

  const checkWIndowSize = () => {
    let windowWidth;

    if (typeof window !== "undefined") {
      windowWidth = window.innerWidth;
    }
    if (windowWidth !== undefined) {
      console.log(windowWidth);
      if (windowWidth < 1024) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }
  };

  useEffect(() => {
    checkWIndowSize();
    window.addEventListener("resize", checkWIndowSize);

    return () => {
      window.removeEventListener("resize", checkWIndowSize);
    };
  }, [checkWIndowSize, isMobile]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isMobile) {
    return "mobile";
  } else {
    return "desktop";
  }
};

export default useDeviceDetect;
