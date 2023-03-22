import { useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Scene({ handleKeyboardKeyPress }) {
  const { raycaster } = useThree();
  const gltf = useLoader(GLTFLoader, "/synth.gltf");

  const notes = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ];

  document.addEventListener("click", () => {
    const obj = raycaster.intersectObjects(gltf.scene.children);
    if (notes.includes(obj[0]?.object?.name?.charAt(0)))
      handleKeyboardKeyPress(obj[0].object.name);
  });

  return <primitive object={gltf.scene} />;
}

export default Scene;
