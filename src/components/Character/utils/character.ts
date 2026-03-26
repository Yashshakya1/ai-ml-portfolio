import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                // Colorize the character based on mesh names to match the reference
                const mName = mesh.name.toLowerCase();
                const matName = Array.isArray(mesh.material)
                  ? (mesh.material[0] as any)?.name?.toLowerCase() || ""
                  : (mesh.material as any)?.name?.toLowerCase() || "";

                const applyColor = (hex: number) => {
                  if (Array.isArray(mesh.material)) {
                    mesh.material = mesh.material.map((m: any) => {
                      const newM = m.clone();
                      if (newM.color) newM.color.setHex(hex);
                      return newM;
                    });
                  } else if (mesh.material) {
                    mesh.material = (mesh.material as any).clone();
                    if ((mesh.material as any).color) (mesh.material as any).color.setHex(hex);
                  }
                };

                const isMatch = (keywords: string[]) =>
                  keywords.some((k) => mName.includes(k) || matName.includes(k));

                // Enable smile if morph targets exist
                if (mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
                  const smileLeft = mesh.morphTargetDictionary["mouthSmileLeft"];
                  const smileRight = mesh.morphTargetDictionary["mouthSmileRight"];
                  const smile = mesh.morphTargetDictionary["mouthSmile"];
                  const happy = mesh.morphTargetDictionary["Happy"];
                  
                  if (smileLeft !== undefined) mesh.morphTargetInfluences[smileLeft] = 1;
                  if (smileRight !== undefined) mesh.morphTargetInfluences[smileRight] = 1;
                  if (smile !== undefined) mesh.morphTargetInfluences[smile] = 1;
                  if (happy !== undefined) mesh.morphTargetInfluences[happy] = 1;
                }

                // Cap / Hat / Hair -> White Cap
                if (isMatch(["hair", "cap", "hat", "helmet", "brim", "visor"])) {
                  applyColor(0xffffff); // White
                }
                // Shirt / Torso -> Dark
                else if (isMatch(["shirt", "cloth", "top", "torso", "jacket", "sweater"])) {
                  applyColor(0x2a2a2a); // Dark shirt
                }
                // Pants / Legs
                else if (isMatch(["pant", "leg", "trouser", "bottom"])) {
                  applyColor(0x1a1a1a); // Dark pants
                }
                // Shoes / Feet
                else if (isMatch(["shoe", "foot", "feet", "sneaker", "sole"])) {
                  applyColor(0xdddddd); // White shoes
                }
                // Eyes / Teeth / Mouth (Leave original)
                else if (isMatch(["eye", "pupil", "cornea", "iris", "tooth", "teeth", "mouth", "lash"])) {
                  // keep original colors
                }
                // Skin / Face / Body (Catch-all for face)
                else {
                  applyColor(0xffdbbc); // Brighter/Lighter Human skin color
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
