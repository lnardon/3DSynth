import { useState } from "react";
import styles from "./styles.module.css";

function ConfigModal({ setSynthConfig, setShowConfigModal }) {
  const [sine, setSine] = useState(1);
  const [triangle, setTriangle] = useState(0.1);
  const [square, setSquare] = useState(0.8);
  const [detune, setDetune] = useState(800);
  const [volume, setVolume] = useState(10);
  const [attack, setAttack] = useState(0.019);
  const [decay, setDecay] = useState(0.05);
  const [sustain, setSustain] = useState(0.2);
  const [release, setRelease] = useState(0.194);
  const [filterAttack, setFilterAttack] = useState(0.01);
  const [filterDecay, setFilterDecay] = useState(0.1);
  const [filterSustain, setFilterSustain] = useState(0.1);
  const [filterRelease, setFilterRelease] = useState(0.25);
  const [baseFrequency, setBaseFrequency] = useState(400);
  const [octaves, setOctaves] = useState(1);
  const [exponent, setExponent] = useState(1);

  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      if (!timer) {
        func.apply(this, args);
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
      }, timeout);
    };
  }

  function handleSave() {
    debounce(() => {
      setSynthConfig({
        oscillator: {
          type: "custom",
          detune: detune,
          volume: volume,
          partials: [sine, triangle, square],
        },
        envelope: {
          attack,
          decay,
          sustain,
          release,
        },
        filterEnvelope: {
          attack: filterAttack,
          decay: filterDecay,
          sustain: filterSustain,
          release: filterRelease,
          baseFrequency,
          octaves,
          exponent,
        },
      });
    }, 2000)();
  }

  return (
    <div className={styles.container}>
      <div className={styles.oscillator}>
        <h2>Ocscillator</h2>
        <div className={styles.waves}>
          <div className={styles.field}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={sine}
              onChange={(e) => {
                handleSave();
                setSine(e.target.value);
              }}
            />
            <label>Sine</label>
          </div>

          <div
            styles={{
              flexDirection: "row !important",
            }}
            className={styles.field}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={triangle}
              onChange={(e) => {
                handleSave();
                setTriangle(e.target.value);
              }}
            />
            <label>Triangle</label>
          </div>

          <div
            styles={{
              flexDirection: "row !important",
            }}
            className={styles.field}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={square}
              onChange={(e) => {
                handleSave();
                setSquare(e.target.value);
              }}
            />
            <label>Square</label>
          </div>
          <div className={styles.field}>
            <input
              type="range"
              min="0"
              max="1200"
              value={detune}
              onChange={(e) => {
                handleSave();
                setDetune(e.target.value);
              }}
            />
            <label>Detune</label>
          </div>
        </div>
        <div className={styles.field}>
          <label>Attack: </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={attack}
            onChange={(e) => {
              setAttack(parseFloat(e.target.value));
              handleSave();
            }}
          />
        </div>
        <div className={styles.field}>
          <label>Decay: </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={decay}
            onChange={(e) => {
              setDecay(parseFloat(e.target.value));
              handleSave();
            }}
          />
        </div>
        <div className={styles.field}>
          <label>Sustain: </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={sustain}
            onChange={(e) => {
              setSustain(parseFloat(e.target.value));
              handleSave();
            }}
          />
        </div>
        <div className={styles.field}>
          <label>Release: </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={release}
            onChange={(e) => {
              setRelease(parseFloat(e.target.value));
              handleSave();
            }}
          />
        </div>
        <div className={styles.field}>
          <label>Volume: </label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => {
              setVolume(e.target.value);
              handleSave();
            }}
          />
        </div>
      </div>

      <div className={styles.filter}>
        <div className={styles.field}>
          <h2>Filter Envelope</h2>
          <label>Filter Attack: </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={filterAttack}
            onChange={(e) => {
              setFilterAttack(parseFloat(e.target.value));
              handleSave();
            }}
          />
        </div>
        <div className={styles.field}>
          <label>Filter Decay: </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={filterDecay}
            onChange={(e) => {
              setFilterDecay(parseFloat(e.target.value));
              handleSave();
            }}
          />
        </div>
        <div className={styles.field}>
          <label>Filter Sustain: </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={filterSustain}
            onChange={(e) => {
              setFilterSustain(parseFloat(e.target.value));
              handleSave();
            }}
          />
        </div>
        <div className={styles.field}>
          <label>Filter Release: </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={filterRelease}
            onChange={(e) => {
              setFilterRelease(parseFloat(e.target.value));
              handleSave();
            }}
          />
        </div>
        <div className={styles.field}>
          <label>Base Frequency: </label>
          <input
            type="number"
            min="20"
            max="20000"
            value={baseFrequency}
            onChange={(e) => {
              setBaseFrequency(e.target.value);
              handleSave();
            }}
          />
        </div>
        <div className={styles.field}>
          <label>Octaves: </label>
          <input
            type="number"
            min="1"
            max="5"
            value={octaves}
            onChange={(e) => {
              setOctaves(e.target.value);
              handleSave();
            }}
          />
        </div>
        <div className={styles.field}>
          <label>Exponent: </label>
          <input
            type="number"
            min="0"
            max="3"
            step="0.1"
            value={exponent}
            onChange={(e) => {
              setExponent(e.target.value);
              handleSave();
            }}
          />
        </div>
        <button
          className={styles.button}
          onClick={() => setShowConfigModal((oldVal) => !oldVal)}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ConfigModal;
