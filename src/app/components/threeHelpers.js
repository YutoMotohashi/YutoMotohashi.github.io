import * as THREE from "three";

// ---------------------------------------------------
// 1) Electrodes
// ---------------------------------------------------
export function createSurfaceElectrodes() {
  const group = new THREE.Group();

  // RF electrodes
  const rfColor = 0xffc100;
  const rfGeo = new THREE.BoxGeometry(0.8, 0.02, 18);
  [-1.5, 1.5].forEach((xPos) => {
    const mesh = new THREE.Mesh(
      rfGeo,
      new THREE.MeshBasicMaterial({ color: rfColor })
    );
    mesh.position.set(xPos, 0.02, 0);
    group.add(mesh);
  });

  // DC center electrodes
  const dcColor = 0xffc100;
  const dcGeo = new THREE.BoxGeometry(0.8, 0.02, 18);
  [-0.5, 0.5].forEach((xPos) => {
    const mesh = new THREE.Mesh(
      dcGeo,
      new THREE.MeshBasicMaterial({ color: dcColor })
    );
    mesh.position.set(xPos, 0.02, 0);
    group.add(mesh);
  });

  // Segmented electrodes
  const segWidth = 2.5;
  const segHeight = 0.02;
  const segLength = 9 / 3;
  const segMat = new THREE.MeshBasicMaterial({ color: 0xffc100 });

  function createSegment(xCenter, zCenter) {
    const geo = new THREE.BoxGeometry(segWidth, segHeight, segLength - 0.35);
    const seg = new THREE.Mesh(geo, segMat);
    seg.position.set(xCenter, 0.025, zCenter);
    group.add(seg);
  }

  const leftX = -3.4;
  const rightX = 3.4;

  // Zone 1
  for (let i = 0; i < 3; i++) {
    const zPos = -9 + segLength / 2 + i * segLength;
    createSegment(leftX, zPos);
    createSegment(rightX, zPos);
  }
  // Zone 2
  for (let i = 0; i < 3; i++) {
    const zPos = segLength / 2 + i * segLength;
    createSegment(leftX, zPos);
    createSegment(rightX, zPos);
  }

  return group;
}

// ---------------------------------------------------
// 2) Fibers
// ---------------------------------------------------
export function createFibersAtEdge(scene) {
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
}

// ---------------------------------------------------
// 3) Ion and Potential
// ---------------------------------------------------
export function createIon(scene, x, y, z, color = 0x800080) {
  const ionGeo = new THREE.SphereGeometry(0.15, 16, 16);
  const ionMat = new THREE.MeshBasicMaterial({ color });
  const ion = new THREE.Mesh(ionGeo, ionMat);
  ion.position.set(x, y, z);
  scene.add(ion);
  return ion;
}

export function createHarmonicPotentialOnIon(scene, camera, {
  a = 0.1,
  b = 0,
  c = 0,
  verRange = [-1, 1],
  holRange = [-1, 1],
  segments = 100,
  center = new THREE.Vector3(0, 0, 0),
}) {
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.LineBasicMaterial({ color: 0x888888 });
  const line = new THREE.Line(geometry, material);
  scene.add(line);

  function update(newCenter = center) {
    const points = [];
    const holStep = (holRange[1] - holRange[0]) / segments;

    // Direction from camera to center
    const direction = new THREE.Vector3();
    direction.subVectors(newCenter, camera.position).normalize();

    // Horizontal vector
    const horizontal = new THREE.Vector3(direction.z, 0, -direction.x).normalize();

    for (let u = holRange[0]; u <= holRange[1]; u += holStep) {
      const v = a * u ** 2 + b * u + c;
      if (v < verRange[0] || v > verRange[1]) continue;
      const point = newCenter.clone()
        .add(horizontal.clone().multiplyScalar(u))
        .add(new THREE.Vector3(0, v, 0));
      points.push(point);
    }

    if (points.length > 1) {
      const curve = new THREE.CatmullRomCurve3(points);
      geometry.setFromPoints(curve.getPoints(segments));
    }
  }

  update(center);
  return { line, update };
}

// ---------------------------------------------------
// 4) Outcoupler
// ---------------------------------------------------
export function createSquareOutcoupler(scene, x, z, size) {
  const geometry = new THREE.BoxGeometry(size, 0.1, size);
  const material = new THREE.MeshBasicMaterial({ color: 0x888888 });
  const box = new THREE.Mesh(geometry, material);
  box.position.set(x, 0.01, z);
  scene.add(box);
  return box;
}

// ---------------------------------------------------
// 5) Focused Beams
// ---------------------------------------------------
function createTaperedCylinder(startPos, endPos, startRadius, endRadius, color) {
  const direction = new THREE.Vector3().subVectors(endPos, startPos);
  const length = direction.length();
  direction.normalize();

  const geometry = new THREE.CylinderGeometry(endRadius, startRadius, length, 16, 1, true);
  geometry.translate(0, length / 2, 0);

  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);

  const up = new THREE.Vector3(0, 1, 0);
  const quat = new THREE.Quaternion().setFromUnitVectors(up, direction);
  mesh.setRotationFromQuaternion(quat);
  mesh.position.copy(startPos);

  return mesh;
}

export function createFocusedBeam(
  scene,
  outPos,
  focusPos,
  startRadius,
  focusRadius,
  endRadius,
  color
) {
  outPos.y += 0.02;
  const endPos = outPos.clone().add(focusPos.clone().sub(outPos).multiplyScalar(2));

  const segment1 = createTaperedCylinder(outPos, focusPos, startRadius, focusRadius, color);
  const segment2 = createTaperedCylinder(focusPos, endPos, focusRadius, endRadius, color);

  scene.add(segment1);
  scene.add(segment2);

  function setTransparency(alpha) {
    [segment1, segment2].forEach((seg) => {
      seg.material.transparent = true;
      seg.material.opacity = alpha;
    });
  }

  return { segment1, segment2, setTransparency };
}
