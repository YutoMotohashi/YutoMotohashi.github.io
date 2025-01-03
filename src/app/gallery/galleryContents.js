import dynamic from 'next/dynamic';

// Dynamically import reusable Three.js components
const ThreeComponent = dynamic(() => import('../components/ThreeComponent'), { ssr: false });

// Define inline components or static components
const InlineThreeComponent = () => {
  return <div>Inline Three.js Component (Example)</div>;
};

const galleryContents = [
    {
      title: "Trapped Ion Quantum Computer Operation",
      type: "threejs",
      component: ThreeComponent,
      description: "This is how a trapped ion quantum computer works.",
      slug: "trapped-ion-quantum-computer-operation",
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
