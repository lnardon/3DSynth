import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as Tone from "tone";

import Scene from "./components/Scene";
import Menu from "./components/Menu";
import "./App.css";

function App() {
  const [lastNoteTime, setLastNoteTime] = useState(0);
  const [isOrientationLocked, setIsOrientationLocked] = useState(false);

  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "custom",
      detune: 800,
      volume: 1,
      partials: [1, 0.09, 0.13], // Mixing 3 waveforms: sine, triangle, and square
    },
    envelope: {
      attack: 0.019,
      decay: 0.05,
      sustain: 0.2,
      release: 0.194,
    },
    filterEnvelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.1,
      release: 0.25,
      baseFrequency: 400,
      octaves: 1,
      exponent: 1,
    },
  }).toDestination();

  useEffect(() => {
    handleMidi();
    // eslint-disable-next-line
  }, []);

  function onMIDIMessage(message) {
    const command = message.data[0];
    const note = message.data[1];

    switch (command) {
      case 144: // noteOn
        const targetNote =
          midiToNote[Math.floor(note % 12)] + Math.floor(note / 12);
        const startTime = Math.max(Tone.now(), lastNoteTime);
        setLastNoteTime(startTime);
        synth.triggerAttackRelease(targetNote, "8n", startTime);
        break;
      case 128: // noteOff
        break;
      default:
        break;
    }
  }

  function handleMidi() {
    function onMIDISuccess(midiAccess) {
      midiAccess.inputs.forEach((entry) => {
        entry.onmidimessage = onMIDIMessage;
      });
    }

    function onMIDIFailure(msg) {
      console.error(`Failed to get MIDI access - ${msg}`);
    }

    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  }

  function handleTone(note) {
    if (typeof note === "string") {
      playTone(note);
    }
    if (typeof note === "number") {
      const targetNote =
        midiToNote[Math.floor(note % 12)] + Math.floor(note / 12);
      playTone(targetNote);
    }
  }

  function playTone(note) {
    const startTime = Math.max(Tone.now(), lastNoteTime + 0.1);
    synth.triggerAttackRelease(note, "6n", startTime);
  }

  const midiToNote = {
    0: "C",
    1: "C#",
    2: "D",
    3: "D#",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "G#",
    9: "A",
    10: "A#",
    11: "B",
  };

  return (
    <div className="App">
      <div
        className="github-btn"
        onClick={() =>
          window.open("https://github.com/lnardon/3DSynth", "_blank")
        }
      >
        <img className="github-logo" src="./logo.png" alt="Github Logo" />
        View on Github
      </div>
      <div
        className="orientation"
        onClick={() => setIsOrientationLocked(!isOrientationLocked)}
      >
        <img className="github-logo" src="./success-lock.png" alt="Lock" />
      </div>
      <Canvas
        camera={{ position: [0, 0.85, 0.95], rotation: [-0.77, 0, 0] }}
        style={{
          position: "absolute",
          top: 0,
          backgroundColor: "antiquewhite",
        }}
      >
        {!isOrientationLocked ? <OrbitControls /> : null}
        <ambientLight position={[0, 33, 9]} />
        <pointLight position={[0, 20, 3]} />
        <Scene handleKeyboardKeyPress={handleTone} />
      </Canvas>
      <Menu />
    </div>
  );
}

export default App;
