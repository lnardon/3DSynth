import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as Tone from "tone";

import Scene from "./components/Scene";
import "./App.css";

function App() {
  function handleTone(note) {
    const synth = new Tone.Synth().toDestination();
    const targetNote =
      note.length === 4
        ? note.charAt(0) + note.charAt(note.length - 1)
        : note.charAt(0) + note.charAt(1) + note.charAt(note.length - 1);
    synth.triggerAttackRelease(targetNote, "8n");
  }

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

  document.addEventListener("keypress", (e) => {
    if (keyboardInputToNote[e.code]) {
      handleTone(`${keyboardInputToNote[e.code]}`);
    }
  });

  return (
    <div className="App">
      <h1>3D Synth</h1>
      <h2>
        Click on the 3D Synth keys to play ... or use your keyboard keys from A
        to J to play the synth.
      </h2>
      <Canvas
        camera={{ position: [0, 0, 2] }}
        style={{ position: "absolute", top: 0 }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Scene handleKeyboardKeyPress={handleTone} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
