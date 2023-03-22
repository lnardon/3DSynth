import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as Tone from "tone";

import "./App.css";

function App() {
  function handleTone(note) {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, "8n");

    // const synth = new Tone.MonoSynth({
    //   oscillator: {
    //     type: "sine",
    //   },
    //   envelope: {
    //     attack: 0.1,
    //   },
    // }).toDestination();
    // synth.triggerAttackRelease(note, "8n");
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
      handleTone(`${keyboardInputToNote[e.code]}2`);
    }
  });

  return (
    <div className="App">
      <h1>3D Synth</h1>
      <h2>3D Coming Soon</h2>
      <h3>Use the keys from A to J to play the synth</h3>
      <Canvas
        camera={{ position: [0, 0, 2] }}
        style={{ position: "absolute", top: 0 }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <boxGeometry args={[1, 1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
