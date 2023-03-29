import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as Tone from "tone";

import Scene from "./components/Scene";
import Menu from "./components/Menu";
import "./App.css";

function App() {
  const [lastNoteTime, setLastNoteTime] = useState(0);
  const synths = [];
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "custom",
      // detune: 50,
      partials: [1, 0.2, 0.5], // Mixing 3 waveforms: sine, triangle, and square
    },
    envelope: {
      attack: 0,
      decay: 0.3,
      sustain: 0.2,
      release: 0.4,
    },
    filterEnvelope: {
      attack: 0.1,
      decay: 0.1,
      sustain: 0.6,
      release: 0.65,
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
      const targetNote =
        note.length === 4
          ? note.charAt(0) + (parseInt(note.charAt(note.length - 1)) + 1)
          : note.charAt(0) +
            note.charAt(1) +
            (parseInt(note.charAt(note.length - 1)) + 1);
      const startTime = Math.max(Tone.now(), lastNoteTime + 0.1);
      setLastNoteTime(startTime);
      synth.triggerAttackRelease(targetNote, "8n", startTime);
    }
    if (typeof note === "number") {
      const targetNote =
        midiToNote[Math.floor(note % 12)] + Math.floor(note / 12);
      synths.forEach((synth) => {
        synth.triggerAttackRelease(targetNote, "8n");
      });
    }
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
      </Canvas>
      <Menu />
    </div>
  );
}

export default App;
