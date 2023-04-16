import { useEffect, useState } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Scene({ handleKeyboardKeyPress }) {
  // const [waveform, setWaveform] = useState("sine");
  // const [attack, setAttack] = useState(0.03);
  // const [decay, setDecay] = useState(0.15);
  // const [sustain, setSustain] = useState(0.1);
  // const [release, setRelease] = useState(0.5);
  const [synthOctave, setSynthOctave] = useState(2);
  const { raycaster } = useThree();
  const gltf = useLoader(GLTFLoader, "/synth.gltf");

  const notes = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ];

  const keyboardInputToNote = {
    KeyA: "C",
    KeyW: "C#",
    KeyS: "D",
    KeyE: "D#",
    KeyD: "E",
    KeyF: "F",
    KeyT: "F#",
    KeyG: "G",
    KeyY: "G#",
    KeyH: "A",
    KeyU: "A#",
    KeyJ: "B",
  };

  useEffect(() => {
    const handleClick = () => {
      const obj = raycaster.intersectObjects(gltf.scene.children);
      if (
        notes.includes(obj[0]?.object?.name?.charAt(0)) ||
        notes.includes(obj[0]?.object?.name?.charAt(0) + obj[0]?.object?.name?.charAt(1))
      )
        handleKeyboardKeyPress(obj[0].object.name);
    };

    const handleKeyPressed = (e) => {
      if (keyboardInputToNote[e.code]) {
        handleKeyboardKeyPress(`${keyboardInputToNote[e.code]}${synthOctave}`);
      } else if (e.key === "z") {
        let newOctave = synthOctave >= 1 ? synthOctave - 1 : synthOctave;
        setSynthOctave(newOctave);
      } else if (e.key === "x") {
        let newOctave = synthOctave <= 4 ? synthOctave - 1 : synthOctave;
        setSynthOctave(newOctave);
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keypress", handleKeyPressed);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keypress", handleKeyPressed);
    };
  });

  return <primitive object={gltf.scene} />;
}

export default Scene;
