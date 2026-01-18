import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";
import { ScrollToPlugin } from "https://cdn.skypack.dev/gsap/ScrollToPlugin";
import Mission from "./components/Mission.jsx";
import Navbar from "./components/Navbar.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
// import Feature from "./components/Features.jsx";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- 3D Globe Component ---
const GlobeModel = React.forwardRef((props, ref) => {
  const { scene } = useGLTF("/Earth.glb");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (scene && ref) {
      ref.current = scene;

      scene.position.set(0, 4, 0);
      scene.scale.set(0.2, 0.2, 0.2);
      scene.rotation.set(0, 0, 0);

      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
        }
      });

      setIsLoaded(true);

      if (props.onLoaded) {
        props.onLoaded();
      }
    }
  }, [scene, ref, props]);

  useFrame(() => {
    if (ref.current && isLoaded) {
      ref.current.rotation.y += 0.005;
    }
  });

  return scene ? <primitive object={scene} dispose={null} /> : null;
});

// --- Main App Component ---
export default function App() {
  const mainContainerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const globeRef = useRef(null);
  const contentSectionRef = useRef(null);
  const navRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  const handleModelLoaded = () => {
    setModelLoaded(true);
  };

  useLayoutEffect(() => {
    if (!modelLoaded || !globeRef.current) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.set(titleRef.current, { opacity: 0, y: 50 });
        gsap.set(subtitleRef.current, { opacity: 0, y: 50 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "+=4000",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            refreshPriority: -1,
          },
        });

        tl.to(globeRef.current.scale, {
          x: 2.8,
          y: 2.8,
          z: 2.8,
          ease: "power2.out",
          duration: 3,
        })
          .to(
            globeRef.current.position,
            {
              x: 0,
              y: -2.5,
              z: 0,
              ease: "power2.out",
              duration: 3,
            },
            "<"
          )
          .to(
            titleRef.current,
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 1.5,
            },
            "-=1.5"
          )
          .to(
            subtitleRef.current,
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 1.5,
            },
            "-=1.3"
          );

        tl.to({}, { duration: 1 });

        const fadeOutObject = { opacity: 1 };

        tl.to(globeRef.current.scale, {
          x: 0.1,
          y: 0.1,
          z: 0.1,
          ease: "power3.in",
          duration: 2,
        })
          .to(
            globeRef.current.position,
            {
              z: -10,
              ease: "power3.in",
              duration: 2,
            },
            "<"
          )
          .to(
            fadeOutObject,
            {
              opacity: 0,
              ease: "power2.in",
              duration: 2,
              onUpdate: () => {
                if (globeRef.current) {
                  globeRef.current.traverse((child) => {
                    if (child.isMesh) {
                      child.material.opacity = fadeOutObject.opacity;
                    }
                  });
                }
              },
            },
            "<"
          )
          .to(
            [titleRef.current, subtitleRef.current],
            {
              opacity: 0,
              y: -60,
              stagger: 0.15,
              ease: "power2.in",
              duration: 1.5,
            },
            "<0.5"
          );

        ScrollTrigger.create({
          trigger: contentSectionRef.current,
          start: "top 90%",
          end: "bottom bottom",
          onEnter: () =>
            gsap.to(navRef.current, {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.5,
              delay: 1.3,
            }),
          onLeaveBack: () =>
            gsap.to(navRef.current, {
              opacity: 0,
              y: "-100%",
              ease: "power2.in",
              duration: 0.5,
            }),
        });

        gsap.to(window, {
          scrollTo: 3000,
          duration: 10,
          ease: "power2.inOut",
          delay: 1,
        });
      }, mainContainerRef);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [modelLoaded]);

  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <style jsx="true" global="true">{`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap");
        body {
          font-family: "Plus Jakarta Sans", sans-serif;
          background-color: #0a0a0a;
          color: #f0f0f0;
          overflow-x: hidden;
          margin: 0;
          padding: 0;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      <CustomCursor>
        <main ref={mainContainerRef} className="w-full">
          <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 p-4 opacity-0 -translate-y-full"
            style={{
              background: "rgba(10, 10, 10, 0.5)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Navbar />
          </nav>

          <section
            ref={heroSectionRef}
            className="h-screen w-full relative overflow-hidden bg-[#0a0a0a]"
          >
            {!modelLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-50">
                <div className="text-white text-xl">Loading Earth...</div>
              </div>
            )}

            <div
              ref={textContainerRef}
              className="absolute inset-0 flex flex-col items-center justify-start pt-48 text-center z-10 pointer-events-none"
            >
              <h1
                ref={titleRef}
                className="text-7xl md:text-9xl font-extrabold tracking-tighter opacity-0 text-white relative z-10"
              >
                Career Synapse
              </h1>
              <p
                ref={subtitleRef}
                className="text-lg md:text-2xl mt-6 max-w-2xl text-gray-300 opacity-0 relative z-10"
              >
                An intelligent platform where skills evolve into real-world.
                <br/>
                Bridging talent with transformative career paths.
              </p>
            </div>

            <div
              ref={canvasContainerRef}
              className="absolute w-full h-full top-0 left-0 z-20"
            >
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 7.5]} intensity={1.5} />
                <pointLight
                  position={[-10, -10, -10]}
                  intensity={1}
                  color="#ffffff"
                />
                <GlobeModel ref={globeRef} onLoaded={handleModelLoaded} />
              </Canvas>
            </div>
          </section>

          <section
            ref={contentSectionRef}
            className="relative z-30 min-h-screen"
          >
            <Mission />
            {/* <Feature /> */}
          </section>
        </main>
      </CustomCursor>
    </>
  );
}
