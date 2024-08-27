import { useEffect, useState } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { notes, keyboardInputToNote } from "../../utils/notes";

function Scene({ handleKeyboardKeyPress, handleKeyboardKeyRelease }) {
  const [synthOctave, setSynthOctave] = useState(2);
  const { raycaster } = useThree();
  const gltf = useLoader(GLTFLoader, "/synth.gltf");

  useEffect(() => {
    const handleClick = () => {
      const obj = raycaster.intersectObjects(gltf.scene.children);
      if (
        notes.includes(obj[0]?.object?.name?.charAt(0)) ||
        notes.includes(
          obj[0]?.object?.name?.charAt(0) + obj[0]?.object?.name?.charAt(1)
        )
      )
        handleKeyboardKeyPress(obj[0].object.name);
    };

    const handleKeyPressed = (e) => {
      if (e.repeat) return;

      if (e.key === "z") {
        let newOctave = synthOctave >= 1 ? synthOctave - 1 : synthOctave;
        setSynthOctave(newOctave);
        return;
      }

      if (e.key === "x") {
        let newOctave = synthOctave <= 5 ? synthOctave + 1 : synthOctave;
        setSynthOctave(newOctave);
        return;
      }

      if (keyboardInputToNote[e.code]) {
        handleKeyboardKeyPress(`${keyboardInputToNote[e.code]}${synthOctave}`);
      }
    };

    const handleKeyRelease = (e) => {
      handleKeyboardKeyRelease(`${keyboardInputToNote[e.code]}${synthOctave}`);
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyPressed);
    document.addEventListener("keyup", handleKeyRelease);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyPressed);
      document.removeEventListener("keyup", handleKeyRelease);
    };
  });

  return <primitive object={gltf.scene} />;
}

export default Scene;
