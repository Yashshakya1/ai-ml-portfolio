import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            { 
              title: "XAI Loan Approval", 
              category: "Machine Learning", 
              tools: "SHAP, LIME, DiCE, Random Forest", 
              image: "/images/xai-loan.png",
              liveLink: "https://xai-loan-approval-system.onrender.com",
              githubLink: "https://github.com/Yashshakya1/XAI-Loan-Approval-System"
            },
            { 
              title: "AttritionIQ", 
              category: "Causal ML", 
              tools: "DoWhy, EconML, scikit-fuzzy, Streamlit", 
              image: "/images/attritioniq.png",
              liveLink: "https://attritioniq-causal-ml-fuzzy-logic.onrender.com",
              githubLink: "https://github.com/Yashshakya1/AttritionIQ-Causal-ML-Fuzzy-Logic-Dashboard-for-Employee-Retention.git"
            },
            { 
              title: "LangChain RAG", 
              category: "AI Chatbot", 
              tools: "LangChain, LLaMA 3.1 8B, ChromaDB", 
              image: "/images/placeholder.webp",
              liveLink: "#",
              githubLink: "#"
            },
            { 
              title: "House Price Prediction App", 
              category: "Machine Learning", 
              tools: " Scikit-learn, XGBoost,Streamlit, ReportLab,Numpy,PDF Export ", 
              image: "/images/house-price.png",
              liveLink: "#",
              githubLink: "#"
            },
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "25px", width: "100%" }}>
                <WorkImage image={project.image} alt={project.title} />

                {(project.liveLink || project.githubLink) && (
                  <div className="btn-links-container">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="project-btn btn-live">
                        Live Demo ↗
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="project-btn btn-github">
                        &lt;/&gt; GitHub Repo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
