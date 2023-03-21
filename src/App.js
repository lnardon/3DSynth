import * as Tone from "tone";

import "./App.css";

function App() {
  function handleTone(note) {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, "8n");
  }

  return (
    <div className="App">
      <h1>3D Synth</h1>
      <h2>Coming Soon</h2>
      <button onClick={() => handleTone("C3")}>Play Tone C3</button>
      <button onClick={() => handleTone("D3")}>Play Tone D3</button>
      <button onClick={() => handleTone("E3")}>Play Tone E3</button>
      <button onClick={() => handleTone("F3")}>Play Tone F3</button>
      <button onClick={() => handleTone("G3")}>Play Tone G3</button>
    </div>
  );
}

export default App;
