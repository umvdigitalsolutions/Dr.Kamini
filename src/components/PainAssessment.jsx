"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function normalizeAnatomyName(name = "") {
  let normalized = name
    .trim()
    .replace(/[_\s]+/g, " ")
    .replace(/(?:[._\s-](?:left|right|l|r))(?:\.\d+)?$/i, "")
    .replace(/(?:[._\s-]\d+)$/i, "")
    .trim();

  // Correct occasional duplicated labels exported by Blender ("NameName").
  if (normalized.length % 2 === 0) {
    const midpoint = normalized.length / 2;
    if (normalized.slice(0, midpoint) === normalized.slice(midpoint)) {
      normalized = normalized.slice(0, midpoint);
    }
  }

  return normalized;
}

function cleanAnatomyId(name = "") {
  return normalizeAnatomyName(name)
    .replace(/\s+/g, "_")
    .toLowerCase();
}

const MUSCLE_LABELS = {
  bicep_long: "Biceps Brachii — Long Head",
  bicep_short: "Biceps Brachii — Short Head",
  delt_front: "Anterior Deltoid",
  delt_rear: "Posterior Deltoid",
  delt_side: "Lateral Deltoid",
  erectors: "Erector Spinae",
  gastroc_lateral: "Gastrocnemius — Lateral Head",
  gastroc_medial: "Gastrocnemius — Medial Head",
  glute_max: "Gluteus Maximus",
  glute_med: "Gluteus Medius",
  glute_min: "Gluteus Minimus",
  lats: "Latissimus Dorsi",
  obliques: "Abdominal Obliques",
  pec_major_lower: "Pectoralis Major — Lower Fibres",
  pec_major_mid: "Pectoralis Major — Middle Fibres",
  pec_major_upper: "Pectoralis Major — Upper Fibres",
  pec_minor: "Pectoralis Minor",
  rectus_lower: "Rectus Abdominis — Lower Section",
  rectus_upper: "Rectus Abdominis — Upper Section",
  serratus: "Serratus Anterior",
  transverse: "Transversus Abdominis",
  trap_lower: "Lower Trapezius",
  trap_mid: "Middle Trapezius",
  trap_upper: "Upper Trapezius",
  tricep_lateral: "Triceps Brachii — Lateral Head",
  tricep_long: "Triceps Brachii — Long Head",
  tricep_medial: "Triceps Brachii — Medial Head",
};

const ANATOMY_REGIONS = {
  full: {
    label: "Full body",
    description: "Explore every available structure",
    camera: [0.8, 2.65],
  },
  head_neck: {
    label: "Head & neck",
    description: "Skull, jaw and cervical spine",
    camera: [1.48, 0.72],
    muscle: ["trap_upper"],
    bone: ["skull", "frontal", "parietal", "temporal", "occipital", "sphenoid", "ethmoid", "zygomatic", "lacrimal", "palatine", "tooth", "incisor", "canine", "molar", "premolar", "mandible", "maxilla", "hyoid", "atlas", "axis", "cervical", "nasal", "concha", "vomer"],
  },
  shoulder: {
    label: "Shoulder",
    description: "Rotator cuff, deltoid and shoulder girdle",
    camera: [1.32, 0.76],
    muscle: ["delt_front", "delt_rear", "delt_side", "infraspinatus", "teres_major", "teres_minor", "trap_upper", "pec_minor"],
    bone: ["scapula", "clavicle", "humerus"],
  },
  arm_hand: {
    label: "Arm & hand",
    description: "Upper arm, forearm, wrist and hand",
    camera: [1.02, 1.05],
    muscle: ["bicep_long", "bicep_short", "brachialis", "brachioradialis", "forearm_extensors", "forearm_flexors", "tricep_lateral", "tricep_long", "tricep_medial"],
    bone: ["humerus", "radius", "ulna", "carpal", "metacarpal", "finger", "hand"],
  },
  torso_spine: {
    label: "Torso & spine",
    description: "Chest, abdomen, back, ribs and vertebrae",
    camera: [0.98, 1.25],
    muscle: ["erectors", "lats", "obliques", "pec_major_lower", "pec_major_mid", "pec_major_upper", "pec_minor", "rectus_lower", "rectus_upper", "rhomboids", "serratus", "transverse", "trap_lower", "trap_mid", "trap_upper"],
    bone: ["rib", "sternum", "thoracic", "lumbar", "vertebra", "sacrum", "coccyx"],
  },
  hip: {
    label: "Hip & pelvis",
    description: "Gluteal, groin and pelvic structures",
    camera: [0.65, 0.82],
    muscle: ["adductors", "glute_max", "glute_med", "glute_min", "hip_flexors"],
    bone: ["hip bone", "pelvis", "sacrum", "coccyx", "femur"],
  },
  leg: {
    label: "Leg & foot",
    description: "Thigh, knee, lower leg, ankle and foot",
    camera: [0.3, 1.12],
    muscle: ["adductors", "biceps_femoris_long", "biceps_femoris_short", "gastroc_lateral", "gastroc_medial", "rectus_femoris", "semimembranosus", "semitendinosus", "soleus", "tibialis_anterior", "vastus_intermedius", "vastus_lateralis", "vastus_medialis"],
    bone: ["femur", "patella", "tibia", "fibula", "tarsal", "metatarsal", "toe", "calcaneus", "talus", "navicular", "cuboid", "cuneiform"],
  },
};

function structureBelongsToRegion(region, type, name) {
  if (region === "full") return true;
  const anatomyId = cleanAnatomyId(name);
  const terms = ANATOMY_REGIONS[region]?.[type] || [];
  return type === "muscle"
    ? terms.includes(anatomyId)
    : terms.some((term) => anatomyId.includes(cleanAnatomyId(term)));
}

function anatomyLabel(name = "", type) {
  const id = cleanAnatomyId(name);
  if (type === "muscle" && MUSCLE_LABELS[id]) return MUSCLE_LABELS[id];

  return normalizeAnatomyName(name)
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function configureLoader(loader) {
  loader.setMeshoptDecoder(MeshoptDecoder);
}

function modelPartName(object, type) {
  const candidates = [object.name, object.parent?.name, object.material?.name]
    .map(normalizeAnatomyName)
    .filter(Boolean);
  const genericName = /^(?:bone|bones|mesh|object|scene)(?:[ ._-]*\d+)?$/i;
  return candidates.find((name) => !genericName.test(name))
    || candidates[0]
    || (type === "bone" ? "Skeletal region" : "Muscle region");
}

function AnatomyModel({ type, visible, combined, focusRegion, selections, view, onSelect, onHover, onStructures }) {
  const url = type === "muscle" ? "/models/anatomy/muscular.glb" : "/models/anatomy/skeleton.glb";
  const gltf = useLoader(GLTFLoader, url, configureLoader);
  const model = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((object) => {
      if (!object.isMesh) return;
      object.castShadow = type === "muscle";
      object.receiveShadow = true;
      object.material = object.material.clone();
      object.userData.anatomyName = modelPartName(object, type);

      if (type === "muscle") {
        const variation = Math.abs(cleanAnatomyId(object.userData.anatomyName).split("").reduce((sum, letter) => sum + letter.charCodeAt(0), 0)) % 4;
        object.material = new THREE.MeshPhysicalMaterial({
          color: ["#a92f38", "#bd3a3f", "#96303b", "#c3483e"][variation],
          roughness: 0.62,
          clearcoat: 0.12,
          clearcoatRoughness: 0.75,
        });
      }
    });
    return clone;
  }, [gltf.scene, type]);
  const mirroredBones = useMemo(() => {
    if (type !== "bone") return null;
    const clone = model.clone(true);
    clone.updateMatrixWorld(true);
    clone.traverse((object) => {
      if (!object.isMesh) return;
      if (!object.geometry.boundingBox) object.geometry.computeBoundingBox();
      const bounds = object.geometry.boundingBox.clone().applyMatrix4(object.matrixWorld);
      object.userData.mirrorEligible = bounds.getCenter(new THREE.Vector3()).x < -0.055;
      object.visible = object.userData.mirrorEligible;
    });
    return clone;
  }, [model, type]);

  useEffect(() => {
    const selectedIds = new Set(selections.map((selection) => selection.anatomyId).filter(Boolean));
    model.traverse((object) => {
      if (!object.isMesh) return;
      const id = cleanAnatomyId(object.userData.anatomyName);
      const active = selectedIds.has(`${type}:${id}`);
      const material = object.material;

      if (type === "muscle") {
        if (!material.userData.baseColor) material.userData.baseColor = material.color.clone();
        material.color.copy(active ? new THREE.Color("#ff2f73") : material.userData.baseColor);
        material.emissive.set(active ? "#9f1239" : "#000000");
        material.emissiveIntensity = active ? 0.4 : 0;
        material.transparent = combined;
        material.opacity = combined ? 0.34 : 1;
        material.depthWrite = !combined;
      } else {
        if (!material.userData.baseEmissive) material.userData.baseEmissive = material.emissive?.clone?.() || new THREE.Color("#000000");
        if (material.emissive) material.emissive.copy(active ? new THREE.Color("#ff2f73") : material.userData.baseEmissive);
        material.emissiveIntensity = active ? 0.65 : 0;
      }
      material.needsUpdate = true;
    });
  }, [combined, model, selections, type]);

  useEffect(() => {
    const structures = new Map();
    model.traverse((object) => {
      if (!object.isMesh) return;
      const rawName = object.userData.anatomyName;
      const included = structureBelongsToRegion(focusRegion, type, rawName);
      object.visible = included;
      if (included) {
        const id = cleanAnatomyId(rawName);
        structures.set(id, { id, label: anatomyLabel(rawName, type) });
      }
    });
    mirroredBones?.traverse((object) => {
      if (!object.isMesh) return;
      object.visible = Boolean(object.userData.mirrorEligible)
        && structureBelongsToRegion(focusRegion, type, object.userData.anatomyName);
    });
    onStructures(type, [...structures.values()].sort((a, b) => a.label.localeCompare(b.label)));
  }, [focusRegion, mirroredBones, model, onStructures, type]);

  if (!visible) return null;

  const position = type === "bone" ? [0, -0.002, 0] : [0, 0, 0];
  const scale = type === "bone" ? 0.913 : 1;
  const handleModelClick = (event) => {
    event.stopPropagation();
    const rawName = event.object.userData.anatomyName || modelPartName(event.object, type);
    const id = cleanAnatomyId(rawName);
    const side = Math.abs(event.point.x) < 0.035 ? "" : event.point.x < 0 ? "Right " : "Left ";
    const label = anatomyLabel(rawName, type);
    onSelect({
      key: `${type}:${id}:${side.trim().toLowerCase() || "midline"}`,
      anatomyId: `${type}:${id}`,
      region: `${side}${label}`,
      muscle: type === "muscle" ? `${label} muscle` : `${label} bone`,
      view,
    });
  };
  const handleModelHover = (event) => {
    event.stopPropagation();
    const rawName = event.object.userData.anatomyName || modelPartName(event.object, type);
    const side = Math.abs(event.point.x) < 0.035 ? "" : event.point.x < 0 ? "Right " : "Left ";
    onHover(`${side}${anatomyLabel(rawName, type)}`);
  };

  return (
    <group position={position}>
      <primitive
        object={model}
        scale={scale}
        onClick={handleModelClick}
        onPointerMove={handleModelHover}
        onPointerOut={() => onHover(null)}
      />
      {type === "bone" && mirroredBones && (
        <primitive
          object={mirroredBones}
          scale={[-scale, scale, scale]}
          onClick={handleModelClick}
          onPointerMove={handleModelHover}
          onPointerOut={() => onHover(null)}
        />
      )}
    </group>
  );
}

function CameraControls({ view, focusRegion }) {
  const { camera, gl } = useThree();
  const controls = useMemo(() => {
    const instance = new OrbitControls(camera, gl.domElement);
    instance.enableDamping = true;
    instance.dampingFactor = 0.08;
    instance.enablePan = false;
    instance.minDistance = 0.45;
    instance.maxDistance = 4.2;
    instance.minPolarAngle = Math.PI * 0.2;
    instance.maxPolarAngle = Math.PI * 0.8;
    return instance;
  }, [camera, gl.domElement]);

  useEffect(() => {
    return () => controls.dispose();
  }, [controls]);

  useEffect(() => {
    const [targetY, distance] = ANATOMY_REGIONS[focusRegion].camera;
    camera.position.set(0, targetY, view === "front" ? distance : -distance);
    controls.target.set(0, targetY, 0);
    controls.update();
  }, [camera, controls, focusRegion, view]);

  useFrame(() => controls.update());
  return null;
}

function LoadingAnatomy() {
  return (
    <mesh position={[0, 0.8, 0]}>
      <sphereGeometry args={[0.16, 20, 16]} />
      <meshStandardMaterial color="#0f766e" wireframe />
    </mesh>
  );
}

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  duration: "",
  severity: "5",
  notes: "",
  consent: false,
};

export default function PainAssessment() {
  const anatomyCanvasRef = useRef(null);
  const [view, setView] = useState("front");
  const [anatomyLayer, setAnatomyLayer] = useState("muscles");
  const [focusRegion, setFocusRegion] = useState("full");
  const [bodySide, setBodySide] = useState("bilateral");
  const [availableStructures, setAvailableStructures] = useState({ muscle: [], bone: [] });
  const [hoveredAnatomy, setHoveredAnatomy] = useState(null);
  const [selections, setSelections] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function toggleAnatomySelection(nextSelection) {
    setSelections((current) => {
      const exists = current.some((item) => item.key === nextSelection.key);
      return exists
        ? current.filter((item) => item.key !== nextSelection.key)
        : [...current, nextSelection];
    });
  }

  const registerStructures = useCallback((type, structures) => {
    setAvailableStructures((current) => {
      const unchanged = current[type].length === structures.length
        && current[type].every((item, index) => item.id === structures[index].id);
      return unchanged ? current : { ...current, [type]: structures };
    });
  }, []);

  function toggleListedStructure(structure) {
    const type = anatomyLayer === "muscles" ? "muscle" : "bone";
    const sideLabel = bodySide === "bilateral"
      ? "Both sides"
      : `${bodySide[0].toUpperCase()}${bodySide.slice(1)}`;
    toggleAnatomySelection({
      key: `${type}:${structure.id}:${bodySide}`,
      anatomyId: `${type}:${structure.id}`,
      region: `${sideLabel} — ${structure.label}`,
      muscle: `${structure.label} ${type}`,
      view,
    });
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function captureAnatomyImage() {
    const source = anatomyCanvasRef.current;
    if (!source?.width || !source?.height) return null;

    const maximumWidth = 900;
    const scale = Math.min(1, maximumWidth / source.width);
    const snapshot = document.createElement("canvas");
    snapshot.width = Math.round(source.width * scale);
    snapshot.height = Math.round(source.height * scale);
    const context = snapshot.getContext("2d");
    context.fillStyle = "#07161a";
    context.fillRect(0, 0, snapshot.width, snapshot.height);
    context.drawImage(source, 0, 0, snapshot.width, snapshot.height);
    return snapshot.toDataURL("image/jpeg", 0.86);
  }

  function waitForAnatomyRender() {
    return new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
  }

  async function captureAssessmentImages() {
    const startingLayer = anatomyLayer;
    let muscle = null;
    let bone = null;

    if (startingLayer !== "muscles") {
      flushSync(() => setAnatomyLayer("muscles"));
      await waitForAnatomyRender();
    }
    muscle = captureAnatomyImage();

    if (selections.some((selection) => selection.anatomyId?.startsWith("bone:"))) {
      flushSync(() => setAnatomyLayer("bones"));
      await waitForAnatomyRender();
      bone = captureAnatomyImage();
    }

    if (startingLayer !== (bone ? "bones" : "muscles")) {
      flushSync(() => setAnatomyLayer(startingLayer));
      await waitForAnatomyRender();
    }

    return { muscle, bone };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    if (!form.name || !form.email || selections.length === 0 || !form.consent) {
      setStatus({
        type: "error",
        message: "Please enter your name and email, mark at least one pain area, and confirm consent.",
      });
      return;
    }

    const regionSummary = selections
      .map((item, index) => `${index + 1}. ${item.region} — ${item.muscle}`)
      .join("\n");

    setLoading(true);
    try {
      const anatomyImages = await captureAssessmentImages();
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: [
            "Pain map assessment",
            `Pain severity: ${form.severity}/10`,
            `Duration: ${form.duration || "Not provided"}`,
            "",
            "Selected areas:",
            regionSummary,
            "",
            `Additional notes: ${form.notes || "None"}`,
          ].join("\n"),
          painAssessment: {
            severity: Number(form.severity),
            duration: form.duration,
            notes: form.notes,
            anatomyLayer,
            focusRegion: ANATOMY_REGIONS[focusRegion].label,
            view,
            anatomyImages,
            regions: selections.map(({ region, muscle, view: selectedView }) => ({
              region,
              muscle,
              view: selectedView,
            })),
          },
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The assessment could not be sent.");
      }

      setStatus({
        type: "success",
        message: "Your pain map and PDF assessment report have been sent to Dr. Kamini's clinic.",
      });
      setSelections([]);
      setForm(emptyForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "A network error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  const activeAnatomyType = anatomyLayer === "muscles" ? "muscle" : "bone";
  const visibleStructures = availableStructures[activeAnatomyType];

  return (
    <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-xl">
        <div className="border-b border-pink-100 px-5 py-4 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Interactive anatomy map</p>
            <p className="mt-1 text-xs text-slate-500">Explore muscles and bones, then click painful areas.</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 lg:mt-0 lg:justify-end">
            <div className="inline-flex rounded-full bg-slate-100 p-1">
              {["front", "back"].map((side) => (
                <button
                  key={side}
                  type="button"
                  onClick={() => setView(side)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold capitalize transition ${
                    view === side ? "bg-teal-700 text-white shadow" : "text-slate-600 hover:text-teal-800"
                  }`}
                >
                  {side}
                </button>
              ))}
            </div>
            <div className="inline-flex rounded-full bg-slate-100 p-1">
              {["muscles", "bones"].map((layer) => (
                <button
                  key={layer}
                  type="button"
                  onClick={() => setAnatomyLayer(layer)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold capitalize transition ${
                    anatomyLayer === layer ? "bg-rose-700 text-white shadow" : "text-slate-600 hover:text-rose-800"
                  }`}
                >
                  {layer === "bones" ? "Skeleton" : "Muscles"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-b border-pink-100 bg-slate-50 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">1. Choose a body region</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {Object.entries(ANATOMY_REGIONS).map(([id, region]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setFocusRegion(id);
                  setHoveredAnatomy(null);
                }}
                aria-pressed={focusRegion === id}
                className={`min-w-fit rounded-2xl border px-4 py-3 text-left transition ${
                  focusRegion === id
                    ? "border-teal-600 bg-teal-700 text-white shadow"
                    : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"
                }`}
              >
                <span className="block text-xs font-bold">{region.label}</span>
                <span className={`mt-1 block max-w-40 text-[10px] ${focusRegion === id ? "text-teal-100" : "text-slate-500"}`}>
                  {region.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-[620px] bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950">
          <Canvas
            camera={{ position: [0, 0.82, 2.65], fov: 38 }}
            shadows
            dpr={[1, 1.75]}
            gl={{ antialias: true, preserveDrawingBuffer: true }}
            onCreated={({ gl }) => {
              anatomyCanvasRef.current = gl.domElement;
            }}
          >
            <color attach="background" args={["#07161a"]} />
            <ambientLight intensity={1.1} />
            <hemisphereLight args={["#b8fff2", "#271016", 1.4]} />
            <directionalLight position={[2.4, 3.5, 3]} intensity={3.2} castShadow />
            <directionalLight position={[-2.5, 1.4, -2]} intensity={1.5} color="#ffb2c8" />
            <CameraControls view={view} focusRegion={focusRegion} />
            <Suspense fallback={<LoadingAnatomy />}>
              <AnatomyModel
                type="muscle"
                visible={anatomyLayer === "muscles"}
                combined={false}
                focusRegion={focusRegion}
                selections={selections}
                view={view}
                onSelect={toggleAnatomySelection}
                onHover={setHoveredAnatomy}
                onStructures={registerStructures}
              />
              <AnatomyModel
                type="bone"
                visible={anatomyLayer === "bones"}
                combined={false}
                focusRegion={focusRegion}
                selections={selections}
                view={view}
                onSelect={toggleAnatomySelection}
                onHover={setHoveredAnatomy}
                onStructures={registerStructures}
              />
            </Suspense>
          </Canvas>
          <div className="pointer-events-none absolute left-4 top-4 rounded-2xl bg-slate-950/80 px-4 py-3 text-white shadow backdrop-blur">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-200">Anatomy layer</p>
            <p className="mt-1 text-sm font-semibold capitalize">
              {ANATOMY_REGIONS[focusRegion].label} · {anatomyLayer === "bones" ? "Skeleton" : "Muscles"} · {view}
            </p>
          </div>
          <div className="pointer-events-none absolute bottom-4 left-4 rounded-2xl bg-white/90 px-4 py-3 text-xs text-slate-700 shadow backdrop-blur">
            {hoveredAnatomy ? (
              <><span className="font-semibold text-rose-700">{hoveredAnatomy}</span> · Click to mark</>
            ) : (
              "Drag to rotate · Scroll to zoom · Every visible structure is selectable"
            )}
          </div>
        </div>

        <div className="border-t border-pink-100 p-5">
          <div className="gap-4 sm:flex sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">2. Mark a specific structure</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {ANATOMY_REGIONS[focusRegion].label} {anatomyLayer === "muscles" ? "muscles" : "bones"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {visibleStructures.length} named structures available. Select on the model or from this list.
              </p>
            </div>
            <div className="mt-3 inline-flex rounded-full bg-slate-100 p-1 sm:mt-0">
              {["left", "right", "bilateral"].map((side) => (
                <button
                  key={side}
                  type="button"
                  onClick={() => setBodySide(side)}
                  className={`rounded-full px-3 py-2 text-[11px] font-semibold capitalize transition ${
                    bodySide === side ? "bg-teal-700 text-white shadow" : "text-slate-600 hover:text-teal-800"
                  }`}
                >
                  {side === "bilateral" ? "Both" : side}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 grid max-h-64 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
            {visibleStructures.map((structure) => {
              const selectionKey = `${activeAnatomyType}:${structure.id}:${bodySide}`;
              const isSelected = selections.some((item) => item.key === selectionKey);
              return (
                <button
                  key={structure.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleListedStructure(structure)}
                  className={`rounded-xl border px-3 py-2 text-left text-xs transition ${
                    isSelected
                      ? "border-pink-400 bg-pink-50 font-semibold text-pink-800"
                      : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"
                  }`}
                >
                  {structure.label}
                </button>
              );
            })}
            {visibleStructures.length === 0 && (
              <p className="col-span-full rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
                This model does not contain a separate {anatomyLayer === "muscles" ? "muscle" : "bone"} mesh for this region. Switch anatomy layers to see the available structures.
              </p>
            )}
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-pink-100 bg-white p-6 shadow-xl md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Your assessment</p>
          <h2 className="mt-2 text-3xl font-bold text-pink-500 googleFontss-dancingScript">Share your pain map</h2>
        </div>

        {status && (
          <div
            role="status"
            className={`mt-5 rounded-2xl p-4 text-sm ${
              status.type === "success"
                ? "bg-emerald-50 text-emerald-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="mt-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Full name
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                placeholder="Your name"
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Email
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Phone number
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              placeholder="+91 9XXXXXXXXX"
            />
          </label>

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="severity" className="text-sm font-semibold text-slate-800">Pain intensity</label>
              <output htmlFor="severity" className="rounded-full bg-pink-100 px-3 py-1 text-sm font-bold text-pink-700">
                {form.severity}/10
              </output>
            </div>
            <input
              id="severity"
              name="severity"
              type="range"
              min="1"
              max="10"
              value={form.severity}
              onChange={handleChange}
              className="mt-4 w-full accent-pink-500"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-500">
              <span>Mild</span>
              <span>Severe</span>
            </div>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            How long have you had this pain?
            <select
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            >
              <option value="">Select duration</option>
              <option>Less than 24 hours</option>
              <option>1–7 days</option>
              <option>1–4 weeks</option>
              <option>1–3 months</option>
              <option>More than 3 months</option>
            </select>
          </label>

          <div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-slate-700">Selected pain areas</p>
              {selections.length > 0 && (
                <button type="button" onClick={() => setSelections([])} className="text-xs font-semibold text-pink-600 hover:text-pink-800">
                  Clear all
                </button>
              )}
            </div>
            <div className="mt-2 min-h-24 rounded-2xl border border-dashed border-slate-300 p-3">
              {selections.length === 0 ? (
                <p className="text-sm text-slate-500">No areas selected yet. Click the body model or use the list.</p>
              ) : (
                <div className="space-y-2">
                  {selections.map((item) => (
                    <div key={item.key} className="flex items-start justify-between gap-3 rounded-xl bg-pink-50 p-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.region}</p>
                        <p className="mt-1 text-xs text-slate-600">Possible area: {item.muscle}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelections((current) => current.filter((selection) => selection.key !== item.key))}
                        className="rounded-full px-2 text-lg leading-6 text-slate-500 hover:bg-white hover:text-pink-700"
                        aria-label={`Remove ${item.region}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Additional details
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              placeholder="What makes it better or worse? Is movement limited?"
            />
          </label>

          <label className="flex items-start gap-3 rounded-2xl bg-teal-50 p-4 text-sm text-slate-700">
            <input
              required
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 accent-teal-700"
            />
            <span>I consent to sending these health details to Dr. Kamini&apos;s clinic so the team can respond to my enquiry.</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending pain map..." : "Send Pain Map to Clinic"}
          </button>
        </div>
      </form>
    </div>
  );
}
