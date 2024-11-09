// import React from "react";
import RegisterPage from "./RegisterPage";
import ModelTux from "./ModelTux";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Page2() {
  return (
    <div className="page h-full md:h-[140vh] bg-[#000628] z-50 flex items-center md:justify-center flex-col gap-[9vh]">
      <div className="text flex items-center justify-center flex-col md:gap-6">
        <div className="heading  text-white font-bold text-2xl md:text-[6vh] font-[verdana]">
          Member Board Drive 1
        </div>
        {/* <div className="heading text-white font-bold text-xl md:text-[4vh]"></div> */}
        <div className="heading text-white text-[1.9vh] text-xl md:text-[2.5vh] text-center font-[verdana]">
          <p>
          Prepare to join a vibrant community of Linux enthusiasts and immerse yourself in the dynamic world of Open Source.
          </p>
        </div>
      </div>

      <div className="box flex flex-col md:flex-row gap-4 w-full md:w-[80vw] rounded-xl">
        {/* Left Box with Canvas and Model */}
        <div className="tux flex-1 flex justify-center items-center w-full md:w-[50%] bg-opacity-[20%] bg-zinc-400 rounded-xl">
          <Canvas className="w-[90vw] h-[110vh] md:w-full md:h-full">
            <ambientLight  />
            <ModelTux />
            <OrbitControls enableZoom={false} enablePan={true} />
          </Canvas>
        </div>

        {/* Right Box with Register Page */}
        <div className="tux flex-1 flex justify-center items-center w-full md:w-[50%] bg-opacity-[20%] bg-zinc-400 rounded-xl mb-5 sm:mb-0">
          <RegisterPage />
        </div>
      </div>
    </div>
  );
}

export default Page2;
