import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in" style={{ overflowY: "visible" }}>
              <h3 style={{ fontSize: "28px", lineHeight: "32px", marginBottom: "10px" }}>AI / ML Development</h3>
              <h4 style={{ margin: "0" }}>Description</h4>
              <p style={{ fontSize: "12.5px", lineHeight: "16px", margin: "8px 0" }}>
                Building intelligent machine learning systems, predictive models, and end-to-end ML pipelines using Python, Scikit-learn, TensorFlow, and PyTorch.
                Experienced in Causal ML, Explainable AI (XAI), and deep learning based model development.
              </p>
              <h5 style={{ margin: "5px 0" }}>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">TensorFlow</div>
                <div className="what-tags">PyTorch</div>
                <div className="what-tags">My SQL</div>
                <div className="what-tags">Scikit-learn</div>
                <div className="what-tags">Pandas / NumPy</div>
                <div className="what-tags">Jupyter Notebook</div>
                <div className="what-tags">Matplotlib / Seaborn</div>
                <div className="what-tags">Git / GitHub</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in" style={{ overflowY: "visible" }}>
              <h3 style={{ fontSize: "28px", lineHeight: "32px", marginBottom: "10px" }}>LLM & Agentic AI Systems</h3>
              <h4 style={{ margin: "0" }}>Description</h4>
              <p style={{ fontSize: "12.5px", lineHeight: "16px", margin: "8px 0" }}>
                Developing LangChain-based RAG systems, custom LLM applications, and autonomous AI agents for automation, reasoning, and knowledge-based tasks.
                Skilled in integrating Gemini and multi-agent frameworks into production-ready AI workflows.
              </p>
              <h5 style={{ margin: "5px 0" }}>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Prompt Engineering</div>
                <div className="what-tags">RAG</div>
                <div className="what-tags">LangChain / LangGraph</div>
                <div className="what-tags">AI Agents</div>
                <div className="what-tags">Vector DBs</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
