import { useEffect, useRef } from "react";

const AnimatedMusicNotes = () => {
  const notes = ["♪", "♫", "♬", "♩", "♭", "♯"];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createNote = () => {
      const note = document.createElement("div");
      note.className = "music-note";
      note.innerText = notes[Math.floor(Math.random() * notes.length)];
      note.style.left = `${Math.random() * 100}%`;
      note.style.fontSize = `${Math.random() * 24 + 16}px`;
      note.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
      note.style.animationDuration = `${Math.random() * 5 + 3}s`;
      note.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(note);

      note.addEventListener("animationend", () => {
        note.remove();
      });
    };

    const interval = setInterval(createNote, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div ref={containerRef} className="notes-container" />
      <style>{`
       .notes-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 1000;
        opacity: 0.2;
      }

      .music-note {
        position: absolute;
        bottom: 0;
        animation: floatUp linear forwards;
        opacity: 0;
      }

      @keyframes floatUp {
        0% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        50% {
          opacity: 0.8;
        }
        100% {
          transform: translateY(-100vh) scale(1.5);
          opacity: 0;
        }
      }
      `}</style>
    </>
  );
};

export default AnimatedMusicNotes;
