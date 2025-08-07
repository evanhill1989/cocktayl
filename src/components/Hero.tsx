import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setShowGate(true);
    }
  }, [isMobile]);

  const handleEnter = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      video.pause();
      video.currentTime = 0;
    } catch (err) {
      console.error("Video unlock failed", err);
    }

    setShowGate(false);
  };

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 400 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current?.addEventListener(
      "loadedmetadata",
      () => {
        const video = videoRef.current;
        if (video && !isNaN(video.duration)) {
          tl.to(video, {
            currentTime: video.duration,
          });
        }
      },
      { once: true }
    );
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title uppercase">Fizzz</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Exotic. Crisp. Mysterious</p>
              <p className="subtitle">
                Find out <br /> for yourself
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and ancient recipes - designed to delight your
                senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        ></video>
      </div>

      {showGate && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white text-center px-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
          <p className="mb-6 text-sm opacity-70">
            Tap below to unlock the experience.
          </p>
          <button
            onClick={handleEnter}
            className="px-6 py-3 border border-white rounded text-lg font-bold hover:bg-white hover:text-black transition"
          >
            Enter Site
          </button>
        </div>
      )}
    </>
  );
};

export default Hero;
