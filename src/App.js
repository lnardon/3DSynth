import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as Tone from "tone";

import Scene from "./components/Scene";
import Menu from "./components/Menu";
import "./App.css";

function App() {
  const [synth, setSynth] = useState(null);
  // const [oscillatorConfig, setOscillatorConfig] = useState({});
  // const [volume, setVolume] = useState(new Tone.Volume(-3).toDestination());
  const [midiAccess, setMidiAccess] = useState(null);

  function handleTone(note) {
    const targetNote =
      note.length === 4
        ? note.charAt(0) + (parseInt(note.charAt(note.length - 1)) + 1)
        : note.charAt(0) +
          note.charAt(1) +
          (parseInt(note.charAt(note.length - 1)) + 1);
    synth.triggerAttackRelease(targetNote, "8n");
  }

  useEffect(() => {
    const filter = new Tone.Filter(150, "highpass", -24).toDestination();
    filter.frequency.rampTo(20000, 10);
    setSynth(
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
      })
        .connect(new Tone.Volume(-3).toDestination())
        .connect(filter)
        .toDestination()
    );

    handleMidi();
    // eslint-disable-next-line
  }, []);

  function onMIDIMessage(event) {
    console.log("MIDI", midiAccess, event);
    let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
    for (const character of event.data) {
      str += `0x${character.toString(16)} `;
    }
    console.log(str);
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
