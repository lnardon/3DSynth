import * as Tone from "tone";

import "./App.css";

function App() {
  function handleTone() {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("D3", "8n");
  }

  return (
    <div className="App">
      <h1>3D Synth</h1>
      <h2>Coming Soon</h2>
      <button onClick={handleTone}>Play Tone</button>
    </div>
  );
}

export default App;
