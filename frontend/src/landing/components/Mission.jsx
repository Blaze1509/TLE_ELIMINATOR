import React from "react";
import { useNavigate } from "react-router-dom";

const Mission = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-t-[3rem] md:rounded-t-[4rem] p-8 md:p-16">
      <div className="max-w-4xl mx-auto pt-16">
        <div className="flex flex-col md:flex-row md:space-x-12">
          
          {/* Text and button section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-black">
              Our Mission
            </h2>
            <div className="space-y-6 text-gray-500 text-lg md:text-xl leading-relaxed">
              <p>
                At SeaCred, we are committed to restoring India's blue carbon
                ecosystems— mangroves, seagrass, and saltmarshes—through
                innovation, blockchain transparency, and community-driven action.
              </p>
              <p>
                Our vision is to build the world's most trusted Blue Carbon
                Registry, empowering coastal communities, NGOs, and governments to
                create measurable climate impact and sustainable livelihoods.
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => navigate("/login")}
                className="px-10 py-5 border border-black rounded-full bg-white text-black font-semibold shadow-md transition-all duration-300 hover:bg-black hover:text-white active:scale-95"
              >
                Login/Register
              </button>
            </div>
          </div>

          {/* Video section */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-4">
            <div className="relative bg-gray-100 rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
              <video
                src="/Earth_s_Digital_Ecosystem_Awakening.mp4"
                className="w-full h-[30rem] object-cover rounded-[2rem]"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Mission;
