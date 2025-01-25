import React, { useEffect, useRef } from "react";

const AnimatedMusicNotes = () => {
  const notes = ["♪", "♫", "♬", "♩", "♭", "♯"];
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const createNote = () => {
      const note = document.createElement("div");
      note.innerText = notes[Math.floor(Math.random() * notes.length)];
      note.style.position = "absolute";
      note.style.left = `${Math.random() * 100}%`;
      note.style.top = `${Math.random() * 20 + 80}%`; // Start near the bottom
      note.style.fontSize = `${Math.random() * 24 + 16}px`;
      note.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
      note.style.opacity = 0;
      note.style.animation = `moveNote ${Math.random() * 5 + 3}s linear infinite`;

      container.appendChild(note);

      note.addEventListener("animationend", () => {
        note.remove();
      });
    };

    const interval = setInterval(createNote, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        overflow: "hidden",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <style>{`
        @keyframes moveNote {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedMusicNotes;
