import * as Tone from "tone";

import "./App.css";

function App() {
  function handleTone(note) {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, "8n");
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
    </div>
  );
}

export default App;
