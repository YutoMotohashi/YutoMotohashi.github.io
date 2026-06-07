"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Import helpers
import {
  createSurfaceElectrodes,
  createFibersAtEdge,
  createIon,
  createHarmonicPotentialOnIon,
  createSquareOutcoupler,
  createFocusedBeam,
} from "./threeHelpers"; // <-- adjust path if needed

const TransportMeasurement = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      30,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(-15, 8, -18);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x202020);
    container.appendChild(renderer.domElement);

    // Substrate
    {
      const substrateGeo = new THREE.BoxGeometry(9.7, 0.5, 18.5);
      const substrateMat = new THREE.MeshBasicMaterial({ color: 0xcccccc });
      const substrate = new THREE.Mesh(substrateGeo, substrateMat);
      substrate.position.set(0, -0.25, 0);
      scene.add(substrate);
    }

    // Electrodes
    scene.add(createSurfaceElectrodes());

    // Fibers
    createFibersAtEdge(scene);

    // Ion + potential
    const ionHeight = 0.9;
    const ion1 = createIon(scene, 0, ionHeight, -4.5);

    const ion1Pot = createHarmonicPotentialOnIon(scene, camera, {
      a: 2,
      b: 0,
      c: 0,
      verRange: [-10, 10],
      holRange: [-1, 1],
      segments: 100,
      center: ion1.position.clone().add(new THREE.Vector3(0, -0.3, 0)),
    });

    // Outcouplers
    const out1 = createSquareOutcoupler(scene, -1, -4.5, 0.4);
    const out2 = createSquareOutcoupler(scene, 1, -4.5, 0.4);
    const out3 = createSquareOutcoupler(scene, 0, -5.5, 0.4);
    const out4 = createSquareOutcoupler(scene, 0, -3.5, 0.4);
    const out5 = createSquareOutcoupler(scene, -1, 4.5, 0.4);
    const out6 = createSquareOutcoupler(scene, 1, 4.5, 0.4);
    const out7 = createSquareOutcoupler(scene, 0, 3.5, 0.4);
    const out8 = createSquareOutcoupler(scene, 0, 5.5, 0.4);

    // Beams
    const focusPosZ1 = ion1.position.clone();
    const focusPosZ2 = new THREE.Vector3(0, ionHeight, 4.5);

    // Get outcoupler positions
    const out1Pos = new THREE.Vector3();
    const out2Pos = new THREE.Vector3();
    const out3Pos = new THREE.Vector3();
    const out4Pos = new THREE.Vector3();
    const out5Pos = new THREE.Vector3();
    const out6Pos = new THREE.Vector3();
    const out7Pos = new THREE.Vector3();
    const out8Pos = new THREE.Vector3();

    out1.getWorldPosition(out1Pos);
    out2.getWorldPosition(out2Pos);
    out3.getWorldPosition(out3Pos);
    out4.getWorldPosition(out4Pos);
    out5.getWorldPosition(out5Pos);
    out6.getWorldPosition(out6Pos);
    out7.getWorldPosition(out7Pos);
    out8.getWorldPosition(out8Pos);

    // Additional positions for demonstration
    const axialBeamStartPos = new THREE.Vector3(0, ionHeight, -70);
    const axialBeamFocusPos = new THREE.Vector3(0, ionHeight, 2);
    const coolBeamStartPos = new THREE.Vector3(13, ionHeight, -13);

    // Create beams
    const beam_z1_1 = createFocusedBeam(scene, out1Pos, focusPosZ1, 0.3, 0.1, 0.3, 0xff0000);
    const beam_z1_2 = createFocusedBeam(scene, out2Pos, focusPosZ1, 0.3, 0.1, 0.3, 0xff0000);
    const beam_z1_3 = createFocusedBeam(scene, out3Pos, focusPosZ1, 0.3, 0.1, 0.3, 0xff0000);
    const beam_z1_4 = createFocusedBeam(scene, out4Pos, focusPosZ1, 0.3, 0.1, 0.3, 0xff0000);
    const beam_z2_1 = createFocusedBeam(scene, out5Pos, focusPosZ2, 0.3, 0.1, 0.3, 0xff0000);
    const beam_z2_2 = createFocusedBeam(scene, out6Pos, focusPosZ2, 0.3, 0.1, 0.3, 0xff0000);
    const beam_z2_3 = createFocusedBeam(scene, out7Pos, focusPosZ2, 0.3, 0.1, 0.3, 0xff0000);
    const beam_z2_4 = createFocusedBeam(scene, out8Pos, focusPosZ2, 0.3, 0.1, 0.3, 0xff0000);
    const beamAxial = createFocusedBeam(scene, axialBeamStartPos, axialBeamFocusPos, 0.5, 0.1, 1, 0xff0000);
    const beamCool = createFocusedBeam(scene, coolBeamStartPos, focusPosZ1, 0.5, 0.1, 0.5, "blue");

    // Hide beams initially
    [
      beam_z1_1, beam_z1_2, beam_z1_3, beam_z1_4,
      beam_z2_1, beam_z2_2, beam_z2_3, beam_z2_4,
      beamAxial, beamCool,
    ].forEach((b) => b.setTransparency(0));

    // Lights
    scene.add(new THREE.AmbientLight(0x404040));
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    // Animation logic
    let stage = 1;
    let timeStart = 0;
    let ionSpeed = 1;
    const waitTime = 0.5;

    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);

      const ionZ = ion1.position.z;

      if (stage === 1) {
        if (ionZ >= 4.5) {
          stage = 2;
          ionSpeed = 0;
          timeStart = Date.now();
          beamAxial.setTransparency(0);
        } else if (ionZ >= 2 && ionZ <= 2.2) {
          ionSpeed = 1;
          beamAxial.setTransparency(0.3);
        } else {
          ionSpeed = 1;
          beamAxial.setTransparency(0);
        }
      } else if (stage === 2) {
        if (Date.now() - timeStart >= waitTime * 1000) {
          stage = 3;
          ionSpeed = -1;
          beam_z2_3.setTransparency(0);
          beam_z2_4.setTransparency(0);
        } else {
          ionSpeed = 0;
          beam_z2_3.setTransparency(0.3);
          beam_z2_4.setTransparency(0.3);
        }
      } else if (stage === 3) {
        if (ionZ <= -4.5) {
          stage = 4;
          ionSpeed = 0;
          timeStart = Date.now();
        } else {
          ionSpeed = -1;
        }
      } else if (stage === 4) {
        if (Date.now() - timeStart >= waitTime * 1000) {
          stage = 1;
          ionSpeed = 1;
          beam_z1_1.setTransparency(0);
          beam_z1_3.setTransparency(0);
          beamCool.setTransparency(0);
        } else {
          ionSpeed = 0;
          beam_z1_1.setTransparency(0.3);
          beam_z1_3.setTransparency(0.3);
          beamCool.setTransparency(0.2);
        }
      }

      ion1.position.z += 0.1 * ionSpeed;
      ion1Pot.update(ion1.position.clone().add(new THREE.Vector3(0, -0.3, 0)));
    }
    animate();

    // Resize event
    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", onResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", minHeight: "300px" }}
    />
  );
};

export default TransportMeasurement;
