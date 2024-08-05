import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as Tone from "tone";

import Scene from "./components/Scene";
import Menu from "./components/Menu";
import "./App.css";
import GithubButton from "./components/GithubButton";
import ConfigModal from "./components/ConfigModal";

function App() {
  const [lastNoteTime, setLastNoteTime] = useState(0);
  const [isOrientationLocked, setIsOrientationLocked] = useState(true);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [synthConfig, setSynthConfig] = useState({
    oscillator: {
      type: "custom",
      detune: 800,
      volume: 10,
      partials: [1, 0.1, 0.8], // Mixing 3 waveforms: sine, triangle, and square
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
  });

  const synth = new Tone.PolySynth(Tone.Synth, synthConfig).toDestination();

  useEffect(() => {
    handleMidi();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    synth.set(synthConfig);
    // eslint-disable-next-line
  }, [synthConfig]);

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
      <GithubButton />
      <div
        className="orientation"
        onClick={() => setIsOrientationLocked(!isOrientationLocked)}
      >
        <img className="github-logo" src="./success-lock.png" alt="Lock" />
      </div>
      <button
        style={{
          zIndex: 100,
          position: "absolute",
        }}
        onClick={() => setShowConfigModal(!showConfigModal)}
      >
        Config
      </button>
      {showConfigModal ? <ConfigModal setSynthConfig={setSynthConfig} /> : null}
      <Canvas
        camera={{
          position: [0, 0.7, 0.9],
          rotation: [-0.77, 0, 0],
          fov: 20,
          zoom: 0.2,
        }}
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
