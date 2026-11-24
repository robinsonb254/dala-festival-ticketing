"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Artist = { name: string; role: string; image: string; alt: string };

function YouTubeClickToPlay({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="youtube-click-player">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" className="youtube-poster" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
          <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
          <span className="youtube-play-icon" aria-hidden="true">▶</span>
          <span className="youtube-play-label">PLAY VIDEO</span>
        </button>
      )}
    </div>
  );
}

export default function ArtistMedia({ artists }: { artists: Artist[] }) {
  const [selectedArtistIndex, setSelectedArtistIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedArtistIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedArtistIndex(null);
      if (event.key === "ArrowRight") setSelectedArtistIndex((current) => current === null ? null : (current + 1) % artists.length);
      if (event.key === "ArrowLeft") setSelectedArtistIndex((current) => current === null ? null : (current - 1 + artists.length) % artists.length);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedArtistIndex, artists.length]);

  return (
    <>
      <section className="artist-performances section" id="performances">
        <div className="section-kicker">03 — LIVE PERFORMANCE HIGHLIGHTS</div>
        <div className="performances-heading"><h2>Feel the<br /><em>live energy.</em></h2><p>Watch selected performances from the featured Dala Festival artists. Videos are embedded from their original YouTube channels and publishers.</p></div>
        <div className="performance-grid">
          <article className="performance-card"><div className="performance-frame"><YouTubeClickToPlay videoId="kBOYEghF9Ts" title="Ferré Gola — Accor Arena Live (Official Video)" /></div><div className="performance-info"><span>FERRÉ GOLA · OFFICIAL ARTIST CHANNEL</span><h3>Accor Arena Live</h3><a href="https://www.youtube.com/watch?v=kBOYEghF9Ts" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div></article>
          <article className="performance-card"><div className="performance-frame"><YouTubeClickToPlay videoId="4L4Kc2pFBlk" title="Prince Indah live performance from Nyali, Mombasa" /></div><div className="performance-info"><span>PRINCE INDAH · FREDY ENT. OFFICIAL</span><h3>Live Performance in Nyali, Mombasa</h3><a href="https://www.youtube.com/watch?v=4L4Kc2pFBlk" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div></article>
          <article className="performance-card"><div className="performance-frame"><YouTubeClickToPlay videoId="3_Lgf-9bhqg" title="Johnny Junior and BV Band — Full Live Performance at 2025 Luo Festival" /></div><div className="performance-info"><span>JOHNNY JUNIOR · OFFICIAL ARTIST CHANNEL</span><h3>2025 Luo Festival — Full Live Performance</h3><a href="https://www.youtube.com/watch?v=3_Lgf-9bhqg" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div></article>
        </div>
      </section>
      <section className="promo-video-section" id="video"><div className="section promo-video-inner"><div className="section-kicker">03 — WATCH THE VIBE</div><div className="promo-video-copy"><div><h2>The sound.<br /><em>The energy.</em></h2></div><div className="video-placeholder promo-video-player"><YouTubeClickToPlay videoId="CeahvaMpxME" title="Official Dala Festival 2026 promotional video" /></div></div></div></section>
      <section className="festival-gallery section" id="gallery">
        <div className="section-kicker">04 — THE ARTISTS</div><div className="gallery-heading"><h2>Faces of<br /><em>Dala.</em></h2><p>Featured artist portraits from the Dala Festival lineup.</p></div>
        <div className="gallery-grid">
          <figure className="gallery-item gallery-feature"><button type="button" className="gallery-photo-trigger" onClick={() => setSelectedArtistIndex(0)} aria-label="Enlarge Ferré Gola photo"><Image src="/artists/ferre-gola.jpg" alt="Ferré Gola featured artist photograph" fill sizes="(max-width: 800px) 100vw, 42vw" quality={72} /></button><figcaption><span>01 / HEADLINER</span><b>Ferré Gola</b></figcaption></figure>
          <figure className="gallery-item"><button type="button" className="gallery-photo-trigger" onClick={() => setSelectedArtistIndex(1)} aria-label="Enlarge Prince Indah photo"><Image src="/artists/prince-indah.jpg" alt="Prince Indah featured artist photograph" fill sizes="(max-width: 800px) 100vw, 29vw" quality={72} /></button><figcaption><span>02 / LIVE PERFORMANCE</span><b>Prince Indah</b></figcaption></figure>
          <figure className="gallery-item"><button type="button" className="gallery-photo-trigger" onClick={() => setSelectedArtistIndex(2)} aria-label="Enlarge Johnny Junior photo"><Image src="/artists/johnny-junior.jpg" alt="Johnny Junior featured artist photograph" fill sizes="(max-width: 800px) 100vw, 29vw" quality={72} /></button><figcaption><span>03 / LIVE PERFORMANCE</span><b>Johnny Junior</b></figcaption></figure>
        </div>
      </section>
      {selectedArtistIndex !== null && (
        <div className="artist-lightbox" role="dialog" aria-modal="true" aria-label={`Artist photograph: ${artists[selectedArtistIndex].name}`} onClick={() => setSelectedArtistIndex(null)}>
          <button type="button" className="artist-lightbox-close" onClick={() => setSelectedArtistIndex(null)} aria-label="Close photo">×</button>
          <button type="button" className="artist-lightbox-nav artist-lightbox-prev" onClick={(event) => { event.stopPropagation(); setSelectedArtistIndex((selectedArtistIndex - 1 + artists.length) % artists.length); }} aria-label="Previous artist">‹</button>
          <div className="artist-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <Image src={artists[selectedArtistIndex].image} alt={artists[selectedArtistIndex].alt} width={1200} height={1600} sizes="76vw" quality={85} />
            <div className="artist-lightbox-caption"><span>{artists[selectedArtistIndex].role}</span><strong>{artists[selectedArtistIndex].name}</strong><small>{String(selectedArtistIndex + 1).padStart(2, "0")} / {String(artists.length).padStart(2, "0")}</small></div>
          </div>
          <button type="button" className="artist-lightbox-nav artist-lightbox-next" onClick={(event) => { event.stopPropagation(); setSelectedArtistIndex((selectedArtistIndex + 1) % artists.length); }} aria-label="Next artist">›</button>
        </div>
      )}
    </>
  );
}
