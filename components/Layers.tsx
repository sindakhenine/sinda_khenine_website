"use client";

import {useState} from "react";

const layers = [
  ["Ground", "What you were built on"],
  ["Frame", "Beliefs that hold the weight"],
  ["Wiring", "Emotional circuitry"],
  ["Rooms", "Patterns lived every day"],
  ["Facade", "The self shown outside"],
] as const;

export function Layers() {
  const [active, setActive] = useState(0);

  return (
    <div className="blueprint-visual">
      <div className="blueprint-house" role="group" aria-label="Living Blueprint layers">
        {layers.map(([name, description], index) => (
          <button className={`blueprint-layer blueprint-layer-${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)} key={name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{name}</strong>
            <small>{description}</small>
          </button>
        ))}
      </div>
      <div className="blueprint-caption" aria-live="polite">
        <span>{String(active + 1).padStart(2, "0")}</span>
        <p><strong>{layers[active][0]}</strong>{layers[active][1]}</p>
      </div>
    </div>
  );
}
