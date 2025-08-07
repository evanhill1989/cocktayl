import { ScrollTrigger, SplitText } from "gsap/all";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
import gsap from "gsap";
// import Cocktails from "./components/Cocktails";
import DebugVideo from "./components/DebugVideo";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return <DebugVideo />;
};

export default App;
