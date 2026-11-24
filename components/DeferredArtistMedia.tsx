"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import type { Artist } from "./types";

export default function DeferredArtistMedia({ artists }: { artists: Artist[] }) {
  const marker = useRef<HTMLDivElement>(null);
  const [Media, setMedia] = useState<ComponentType<{ artists: Artist[] }> | null>(null);

  useEffect(() => {
    const element = marker.current;
    if (!element) return;
    let active = true;
    const load = () => {
      import("./ArtistMedia").then((module) => {
        if (active) setMedia(() => module.default);
      });
    };
    if (!("IntersectionObserver" in window)) {
      load();
      return () => { active = false; };
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        load();
      }
    }, { rootMargin: "700px 0px" });
    observer.observe(element);
    return () => { active = false; observer.disconnect(); };
  }, []);

  return <div ref={marker}>{Media ? <Media artists={artists} /> : <div className="artist-media-loading" aria-hidden="true" />}</div>;
}
