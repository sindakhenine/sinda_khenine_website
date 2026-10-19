"use client";
import {useCopy} from "@/i18n/use-copy";


import {useState} from "react";

const layers = [
  ["Ground", "What you were built on"],
  ["Frame", "Beliefs that hold the weight"],
  ["Wiring", "Emotional circuitry"],
  ["Rooms", "Patterns lived every day"],
  ["Facade", "The self shown outside"],
] as const;

export function Layers() {
  const copy = useCopy();

  const [active, setActive] = useState(0);

  return (
    <div className="blueprint-visual">
      <div className="blueprint-house" role="group" aria-label={copy("Living Blueprint layers")}>
        {layers.map(([name, description], index) => (
          <button className={`blueprint-layer blueprint-layer-${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)} key={name}>
            <span>{copy(String(index + 1).padStart(2, "0"))}</span>
            <strong>{copy(name)}</strong>
            <small>{copy(description)}</small>
          </button>
        ))}
      </div>
      <div className="blueprint-caption" aria-live="polite">
        <span>{copy(String(active + 1).padStart(2, "0"))}</span>
        <p><strong>{copy(layers[active][0])}</strong>{copy(layers[active][1])}</p>
      </div>
    </div>
  );
}
