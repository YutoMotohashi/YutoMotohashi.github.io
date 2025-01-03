"use client"; // Add this line at the top

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      30,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(-15, 8, -18);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x202020);
    container.appendChild(renderer.domElement);


    const ionHeight = 0.9;

    // ---------------------------------------------------
    // 1) Substrate (chip base)
    // ---------------------------------------------------
    const substrateGeo = new THREE.BoxGeometry(9.7, 0.5, 18.5);
    const substrateMat = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    const substrate = new THREE.Mesh(substrateGeo, substrateMat);
    substrate.position.set(0, -0.25, 0);
    scene.add(substrate);

    // ---------------------------------------------------
    // 2) Electrodes on top (grouped for clarity)
    // ---------------------------------------------------
    const createSurfaceElectrodes = () => {
      const group = new THREE.Group();

      // 2 lines for RF electrodes
      const rfColor = 0xffc100;
      const rfThickness = 0.8;
      const rfLength = 18;
      const rfGeo = new THREE.BoxGeometry(rfThickness, 0.02, rfLength);
      for (let xPos of [-1.5, 1.5]) {
        const rfElec = new THREE.Mesh(rfGeo, new THREE.MeshBasicMaterial({ color: rfColor }));
        rfElec.position.set(xPos, 0.02, 0);
        group.add(rfElec);
      }

      // 2 lines for DC center electrodes
      const dcColor = 0xffc100;
      const dcThickness = 0.8;
      const dcGeo = new THREE.BoxGeometry(dcThickness, 0.02, rfLength);
      for (let xPos of [-0.5, 0.5]) {
        const dcElec = new THREE.Mesh(dcGeo, new THREE.MeshBasicMaterial({ color: dcColor }));
        dcElec.position.set(xPos, 0.02, 0);
        group.add(dcElec);
      }

      // 12 segmented electrodes (6 per zone × 2 zones)
      const segWidth = 2.5;
      const segHeight = 0.02;
      const segLength = 9 / 3; // 3 segments per 9-length zone
      const segMat = new THREE.MeshBasicMaterial({ color: 0xffc100 });

      function createSegment(xCenter, zCenter) {
        const segmentGeo = new THREE.BoxGeometry(segWidth, segHeight, segLength - 0.35);
        const segment = new THREE.Mesh(segmentGeo, segMat);
        segment.position.set(xCenter, 0.025, zCenter);
        group.add(segment);
      }

      const leftX = -3.4;
      const rightX = 3.4;

      // zone1: z ~ -9 to 0
      for (let i = 0; i < 3; i++) {
        const zPos = -9 + segLength / 2 + i * segLength;
        createSegment(leftX, zPos);
        createSegment(rightX, zPos);
      }
      // zone2: z ~ 0 to +9
      for (let i = 0; i < 3; i++) {
        const zPos = 0 + segLength / 2 + i * segLength;
        createSegment(leftX, zPos);
        createSegment(rightX, zPos);
      }

      return group;
    };
    scene.add(createSurfaceElectrodes());

    // 3) Five fibers at the -z edge
    // ---------------------------------------------------
    const createFibersAtEdge = () => {
      const fiberMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const xPositions = [-6, -3, 0, 3, 6];
      xPositions.forEach((xPos) => {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(xPos, 0, -18),
          new THREE.Vector3(xPos / 2, -0.3, -13),
          new THREE.Vector3(xPos / 2, -0.1, -11),
          new THREE.Vector3(xPos / 2, -0.2, -9),
        ]);
        const fiberGeo = new THREE.TubeGeometry(curve, 30, 0.05, 8, false);
        const fiber = new THREE.Mesh(fiberGeo, fiberMat);
        scene.add(fiber);
      });
    };
    createFibersAtEdge();


    // ------------------------------------------------------------------
    // 3) Example Ion (focus target)
    // ------------------------------------------------------------------


    function createHarmonicPotentialOnIon({
      a = 0.1,
      b = 0,
      c = 0,
      verRange = [-1, 1],
      holRange = [-1, 1],
      segments = 100,
      center = new THREE.Vector3(0, 0, 0),
    }) {
      // Prepare empty geometry and material
      const geometry = new THREE.BufferGeometry();
      const material = new THREE.LineBasicMaterial({ color: 0x888888 });
      const line = new THREE.Line(geometry, material);

      // Add the line to the scene
      scene.add(line);

      function update(newCenter = center) {
        // Recalculate points whenever 'center' changes
        const points = [];
        const holStep = (holRange[1] - holRange[0]) / segments;

        // Direction from camera to center
        const direction = new THREE.Vector3();
        direction.subVectors(newCenter, camera.position).normalize();

        // Horizontal vector (in x-z plane)
        const horizontal = new THREE.Vector3(direction.z, 0, -direction.x).normalize();

        // Re-generate the points
        for (let u = holRange[0]; u <= holRange[1]; u += holStep) {
          const v = a * u ** 2 + b * u + c;

          // Check vertical range
          if (v < verRange[0] || v > verRange[1]) continue;

          const point = newCenter.clone()
            .add(horizontal.clone().multiplyScalar(u))
            .add(new THREE.Vector3(0, v, 0));
          points.push(point);
        }

        // If enough points, build updated geometry
        if (points.length > 1) {
          const curve = new THREE.CatmullRomCurve3(points);
          geometry.setFromPoints(curve.getPoints(segments));
        } else {
          console.warn("No points within specified range to create the curve.");
        }
      }

      // Initial creation
      update(center);

      // Return the line object and the update function for external use
      return { line, update };
    }

    function createIon(x, z) {
      const ionGeo = new THREE.SphereGeometry(0.15, 16, 16);
      const ionMat = new THREE.MeshBasicMaterial({ color: 0x800080 });
      const ion = new THREE.Mesh(ionGeo, ionMat);
      // Place the ion at y ~ ionHeight
      ion.position.set(x, ionHeight, z);
      scene.add(ion);
      
      return ion;
    }
    
    const ion1 = createIon(0, -4.5);
    
    const ion1_pot = createHarmonicPotentialOnIon({
      a: 2,                      // Adjust curvature as needed
      b: 0,                      // No tilt
      c: 0,                      // Centered at origin
      verRange: [-10, 10],         // Range along v-axis (vertical direction)
      holRange: [-1, 1],         // Range along u-axis (horizontal displacement)
      segments: 100,             // Smooth curve
      center: ion1.position.clone().add(new THREE.Vector3(0, -0.3, 0)),
    });

    // const ion2 = createIon(0, 2.5);

    // createHarmonicPotentialOnIon({
    //   a: 2,                      // Adjust curvature as needed
    //   b: 0,                      // No tilt
    //   c: 0,                      // Centered at origin
    //   verRange: [-10, 10],         // Range along v-axis (vertical direction)
    //   holRange: [-1, 1],         // Range along u-axis (horizontal displacement)
    //   segments: 100,             // Smooth curve
    //   center: ion2.position.clone().add(new THREE.Vector3(0, -0.3, 0)),
    // });

    // ------------------------------------------------------------------
    // 1) Square outcoupler (a small box on top of the surface)
    // ------------------------------------------------------------------
    function createSquareOutcoupler(x, z, size) {
      const geometry = new THREE.BoxGeometry(size, 0.1, size);
      const material = new THREE.MeshBasicMaterial({ color: 0x888888 });
      const box = new THREE.Mesh(geometry, material);

      // Place it so that its top surface is slightly above y=0
      box.position.set(x, 0.01, z);
      scene.add(box);

      return box; // so we can use its position for beams
    }

    // Example: two outcouplers at z=-4.5 and z=4.5
    const out1 = createSquareOutcoupler(-1, -4.5, 0.4);
    const out2 = createSquareOutcoupler(1, -4.5, 0.4);
    const out3 = createSquareOutcoupler(0, -5.5, 0.4);
    const out4 = createSquareOutcoupler(0, -3.5, 0.4);
    const out5 = createSquareOutcoupler(-1, 4.5, 0.4);
    const out6 = createSquareOutcoupler(1, 4.5, 0.4);
    const out7 = createSquareOutcoupler(0, 3.5, 0.4);
    const out8 = createSquareOutcoupler(0, 5.5, 0.4);

    // ------------------------------------------------------------------
    // 2) Two-stage laser beam: outcoupler -> focus -> end
    //    Each segment is a tapered cylinder.
    // ------------------------------------------------------------------
    function createTaperedCylinder(startPos, endPos, startRadius, endRadius, color) {
      // Direction & length
      const direction = new THREE.Vector3().subVectors(endPos, startPos);
      const length = direction.length();
      direction.normalize();

      // Cylinder geometry oriented along Y in local coords, then translate
      const geometry = new THREE.CylinderGeometry(endRadius, startRadius, length, 16, 1, true);
      geometry.translate(0, length / 2, 0);

      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Rotate Y-axis to match direction
      const up = new THREE.Vector3(0, 1, 0);
      const quat = new THREE.Quaternion().setFromUnitVectors(up, direction);
      mesh.setRotationFromQuaternion(quat);

      // Position so bottom is at startPos
      mesh.position.copy(startPos);

      return mesh;
    }

    /**
     * Creates a beam that:
     *  - Starts at outcoupler top (some offset in y).
     *  - Narrows to a focus near 'focusPos'.
     *  - Then diverges to 'endPos'.
     */
     function createFocusedBeam(
      outPos,
      focusPos,
      startRadius,
      focusRadius,
      endRadius,
      color
    ) {
      outPos.y += 0.02;

      // Extend beam beyond focus
      const endPos = outPos.clone().add(
        focusPos.clone().sub(outPos).multiplyScalar(2)
      );

      // 2) Create segment from outcoupler -> focus
      const segment1 = createTaperedCylinder(outPos, focusPos, startRadius, focusRadius, color);
      scene.add(segment1);

      // 3) Create segment from focus -> end
      const segment2 = createTaperedCylinder(focusPos, endPos, focusRadius, endRadius, color);
      scene.add(segment2);

      // Provide method to adjust beam transparency
      function setTransparency(alpha) {
        // For example: ensuring MeshBasicMaterial is transparent
        [segment1, segment2].forEach((seg) => {
          seg.material.transparent = true;
          seg.material.opacity = alpha;
        });
      }

      return {
        segment1,
        segment2,
        setTransparency,
      };
    }

    // Example final beam end point (where it might diverge to some large radius)
    // And the focus at the ion's center
    const focusPos_z1 = ion1.position.clone();
    const focusPos_z2 = new THREE.Vector3(0, ionHeight, 4.5);

    // End position is calculated as: out1 + 2 * (focusPos - out1)
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

    // Create the two-stage beam
    // For instance, start radius = 0.15 (outcoupler exit),
    // focus radius = 0.02 at the ion,
    // end radius = 0.1 after diverging,
    // color = 0xff0000
    const axialBeamStartPos = new THREE.Vector3(0, ionHeight, -70.);
    const coolBeamStartPos = new THREE.Vector3(+13, ionHeight, -13.);
    const axialBeamFocusPos = new THREE.Vector3(0, ionHeight, 2);

    const beam_z1_1 = createFocusedBeam(out1Pos, focusPos_z1, 0.3, 0.1, 0.3, 0xff0000);
    const beam_z1_2 = createFocusedBeam(out2Pos, focusPos_z1, 0.3, 0.1, 0.3, 0xff0000);
    const beam_z1_3 = createFocusedBeam(out3Pos, focusPos_z1, 0.3, 0.1, 0.3, 0xff0000);
    const beam_z1_4 = createFocusedBeam(out4Pos, focusPos_z1, 0.3, 0.1, 0.3, 0xff0000);
    const beam_z2_1 = createFocusedBeam(out5Pos, focusPos_z2, 0.3, 0.1, 0.3, 0xff0000);
    const beam_z2_2 = createFocusedBeam(out6Pos, focusPos_z2, 0.3, 0.1, 0.3, 0xff0000);
    const beam_z2_3 = createFocusedBeam(out7Pos, focusPos_z2, 0.3, 0.1, 0.3, 0xff0000);
    const beam_z2_4 = createFocusedBeam(out8Pos, focusPos_z2, 0.3, 0.1, 0.3, 0xff0000);
    const beamAxial = createFocusedBeam(axialBeamStartPos, axialBeamFocusPos, 0.5, 0.1, 1, 0xff0000);
    const beamCool = createFocusedBeam(coolBeamStartPos, focusPos_z1, 0.5, 0.1, 0.5, "blue");

    beam_z1_1.setTransparency(0);
    beam_z1_2.setTransparency(0);
    beam_z1_3.setTransparency(0);
    beam_z1_4.setTransparency(0);
    beam_z2_1.setTransparency(0);
    beam_z2_2.setTransparency(0);
    beam_z2_3.setTransparency(0);
    beam_z2_4.setTransparency(0);
    beamAxial.setTransparency(0);
    beamCool.setTransparency(0);

    // ---------------------------------------------------
    // Lights
    // ---------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    // ---------------------------------------------------
    // Render loop
    // ---------------------------------------------------
    // Global declarations
    let stage = 1;
    let timeStart = 0;
    const waitTime = 0.5; // seconds
    let ionSpeed = 1;

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

      const ionZ = ion1.position.z;

      if (stage === 1) {
        // Move forward until z >= 4.5
        if (ionZ >= 4.5) {
          stage = 2;
          ionSpeed = 0;
          timeStart = Date.now();

          beamAxial.setTransparency(0);
        } else if (ionZ >= +2.0 && ionZ <= 2.2) {
          ionSpeed = +1;

          beamAxial.setTransparency(0.3);
        } else {
          ionSpeed = +1;

          beamAxial.setTransparency(0);
        }
      } else if (stage === 2) {
        // Wait in place for waitTime seconds
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
        // Move backward until z <= -4.5
        if (ionZ <= -4.5) {
          stage = 4;
          ionSpeed = 0;
          timeStart = Date.now();
        } else {
          ionSpeed = -1;
        }
      } else if (stage === 4) {
        // Wait in place for waitTime seconds
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
      } else {
        // Default fallback
        stage = 1;
        ionSpeed = 1;
      }

      // Update ion position
      ion1.position.z += 0.1 * ionSpeed;
      ion1_pot.update(ion1.position.clone().add(new THREE.Vector3(0, -0.3, 0)));
    }
    
    // // ---------------------------------------------------
    // // Render loop
    // // ---------------------------------------------------
    // let ionDirection = 1; // 1 for forward, -1 for backward

    // const animate = () => {
    //   requestAnimationFrame(animate);
    //   renderer.render(scene, camera);

    //   // Move ion position back and forth along z-axis
    //   const ionZ = ion1.position.z;

    //   if (ionZ >= 4.5) {
    //     ionDirection = -1; // Change direction to backward
    //   } else if (ionZ <= -4.5) {
    //     ionDirection = 1; // Change direction to forward
    //   }

    //   ion1.position.z += 0.1 * ionDirection; // Update position based on direction
    // };


    animate();

    // Resize handling
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "300px" }} />;
};

export default ThreeComponent;
