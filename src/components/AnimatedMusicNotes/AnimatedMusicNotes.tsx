import { useEffect, useRef } from "react";
import "./AnimatedMusicNotes.css";
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
    <div ref={containerRef} className="notes-container" />
  );
};

export default AnimatedMusicNotes;
