import dynamic from 'next/dynamic';

// Dynamically import reusable Three.js components
const TransportMeasurement = dynamic(() => import('../components/TransportMeasurement'), { ssr: false });
const MultiZoneRamsey = dynamic(() => import('../components/MultiZoneRamsey'), { ssr: false });

// Define inline components or static components
const InlineThreeComponent = () => {
  return <div>Inline Three.js Component (Example)</div>;
};

const galleryContents = [
    {
      title: "Trapped Ion Quantum Computer Operation",
      type: "threejs",
      component: TransportMeasurement,
      description: "This is how a trapped ion quantum computer works.",
      slug: "trapped-ion-quantum-computer-operation-transport-measurement",
    },
    {
      title: "Trapped Ion Quantum Computer Operation",
      type: "threejs",
      component: MultiZoneRamsey,
      description: "This is how a trapped ion quantum computer works.",
      slug: "trapped-ion-quantum-computer-operation-multi-zone-ramsey",
    },
//   {
//     title: "Inline Three.js Example",
//     type: "threejs",
//     component: InlineThreeComponent, // Inline-defined component
//     description: "A specific Three.js visualization example.",
//   },
//   {
//     title: "Experimental Setup Video",
//     type: "video",
//     src: "/gallery/setup.mp4",
//     description: "A walkthrough video of our experimental setup.",
//   },
];

export default galleryContents;
