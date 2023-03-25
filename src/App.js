import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import * as Tone from "tone";

import Scene from "./components/Scene";
import Menu from "./components/Menu";
import "./App.css";
import { connect } from "tone";

function App() {
  window.onload = () => {
    alert(
      "Click on the 3D synth keys to play. This is still under active development and will change in the future."
    );
  };
  function handleTone(note) {
    const vol = new Tone.Volume(-3).toDestination();
    const targetNote =
      note.length === 4
        ? note.charAt(0) + note.charAt(note.length - 1)
        : note.charAt(0) + note.charAt(1) + note.charAt(note.length - 1);
    const synth = new Tone.Synth({
      oscillator: {
        type: "triangle",
      },
      envelope: {
        attack: 0.03,
        decay: 0.7,
        sustain: 0.1,
        release: 0.15,
      },
    })
      .connect(vol)
      .toDestination();
    synth.triggerAttackRelease(targetNote, "4n");
  }

  // const keyboardInputToNote = {
  //   KeyA: "C",
  //   KeyW: "C#",
  //   KeyS: "D",
  //   KeyE: "D#",
  //   KeyD: "E",
  //   KeyF: "F",
  //   KeyT: "F#",
  //   KeyG: "G",
  //   KeyY: "G#",
  //   KeyH: "A",
  //   KeyU: "A#",
  //   KeyJ: "B",
  // };

  // document.addEventListener("keypress", (e) => {
  //   if (keyboardInputToNote[e.code]) {
  //     handleTone(`${keyboardInputToNote[e.code]}3`);
  //   }
  // });

  return (
    <div className="App">
      <Canvas
        camera={{ position: [0, 0.85, 0.95], rotation: [-0.77, 0, 0] }}
        style={{ position: "absolute", top: 0 }}
      >
        <ambientLight />
        <pointLight position={[0, 20, 3]} />
        <Scene handleKeyboardKeyPress={handleTone} />
        {/* <OrbitControls /> */}
      </Canvas>
      <Menu />
    </div>
  );
}

export default App;
