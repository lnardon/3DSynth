import { useState, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as Tone from "tone";

import Scene from "./components/Scene";
import Menu from "./components/Menu";
import "./App.css";

function App() {
  const filter = new Tone.Filter(1000, "lowpass", -48);
  const synths = useMemo(() => [
    new Tone.Synth({
      oscillator: {
        type: "sine",
      },
      envelope: {
        attack: 0.05,
        decay: 0.3,
        sustain: 0.2,
        release: 0.1,
      },
      volume: -3,
    })
      .connect(new Tone.Volume(-3).toDestination())
      .connect(filter)
      .toDestination(),
    new Tone.Synth({
      oscillator: {
        type: "fatsine",
      },
      detune: 800,
      envelope: {
        attack: 0.03,
        decay: 0.05,
        sustain: 0.01,
        release: 0.01,
      },
      volume: -1,
    })
      .connect(filter)
      .toDestination(),
    new Tone.Synth({
      oscillator: {
        type: "fatsquare",
      },
      detune: 1200,
      envelope: {
        attack: 0,
        decay: 0.1,
        sustain: 0.05,
        release: 0.1,
      },
      volume: -21,
    })
      .connect(filter)
      .toDestination(),
  ]);
  // const [oscillatorConfig, setOscillatorConfig] = useState({});
  // const [volume, setVolume] = useState(new Tone.Volume(-3).toDestination());
  const [midiAccess, setMidiAccess] = useState(null);

  useEffect(() => {
    handleMidi();
    // eslint-disable-next-line
  }, []);

  function onMIDIMessage(message) {
    console.log("MIDI", midiAccess, message);
    var command = message.data[0];
    var note = message.data[1];

    switch (command) {
      case 144: // noteOn
        handleTone(note);
        break;
      case 128: // noteOff
        // handleTone(note);
        break;
      // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
    }
  }

  function handleMidi() {
    function onMIDISuccess(midiAccess) {
      console.log("MIDI ready!", midiAccess);
      setMidiAccess(midiAccess);
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
      synths.forEach((synth) => {
        synth.triggerAttackRelease(targetNote, "8n");
      });
    }
    if (typeof note === "number") {
      const targetNote =
        midiToNote[Math.floor(note % 12)] + Math.floor(note / 12);
      console.log(synths, targetNote);
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
