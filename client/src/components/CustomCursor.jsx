import React, { useEffect, useRef } from "react";

/* Custom cursor ring: slightly larger #27D3E2 follower that grows on hoverables. */
export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let visible = false;

    const show = () => {
      if (!visible) {
        visible = true;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
    };
    const hide = () => {
      visible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      show();
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      const t = e.target;
      const hoverable = t && t.closest
        ? t.closest("a, button, .topic-card, .question-item, .ctrl, .dryrun-tab")
        : null;
      ring.classList.toggle("cursor-hover", !!hoverable);
    };

    const loop = () => {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onLeave = () => hide();

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
