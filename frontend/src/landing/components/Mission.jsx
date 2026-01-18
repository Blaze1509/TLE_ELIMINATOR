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
                At <span className="font-semibold text-black">Holistic Skill Intelligence Platform</span>, 
                our mission is to empower students and early-career professionals with a 
                living, intelligent system that continuously maps their academic journey, 
                practical skills, and career aspirations into structured, personalized 
                learning roadmaps.
              </p>

              <p>
                We focus on critical future domains — 
                <span className="font-semibold"> Healthcare Informatics</span>, 
                <span className="font-semibold"> Agricultural Technology</span>, and 
                <span className="font-semibold"> Urban & Smart City Systems</span> — 
                enabling users to identify skill gaps, track progress, and receive 
                AI-driven recommendations for courses, projects, and career pathways.
              </p>

              <p>
                Inspired by platforms like roadmap.sh, our system transforms career planning 
                into an interactive experience where every skill, milestone, and learning 
                resource becomes part of a dynamic, evolving professional roadmap.
              </p>

              {/* Larger login option at the end */}
      
            </div>

            <h3 className="text-3xl md:text-4xl font-bold mt-10 mb-4 text-black">
              Our Vision
            </h3>

            <div className="space-y-4 text-gray-500 text-lg md:text-xl leading-relaxed">
              <p>
                To become the world’s most trusted AI-powered academic and professional 
                intelligence platform, bridging education and industry by providing 
                transparent skill assessment, gap analysis, and personalized learning 
                pathways for emerging sectors.
              </p>

              <p>
                We envision a future where every learner can clearly see:
                what to learn, why to learn it, and how it connects to real-world careers 
                in healthcare, agriculture, and smart urban development.
              </p>
            </div>

            <div className="mt-10">
              <button
                onClick={() => navigate("/login")}
                className="px-10 py-5 border border-black rounded-full bg-white text-black font-semibold shadow-md transition-all duration-300 hover:bg-black hover:text-white active:scale-95"
              >
                Login to Explore →
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
