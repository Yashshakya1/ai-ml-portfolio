import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science</h4>
                <h5>Surabhi College of Engineering</h5>
              </div>
              <h3>2027</h3>
            </div>
            <p>
              RGPV University, Bhopal | CGPA: 7.5. Currently pursuing my degree, focusing on core computer science subjects.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI & ML Certification</h4>
                <h5>IIT Guwahati</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Advanced Certification in AI & ML (Offline Program). Hands-on training in ML algorithms, deep learning, and AI applications.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>12th PCM</h4>
                <h5>Kendriya Vidyalaya Bairagarh</h5>
              </div>
              <h3></h3>
            </div>
            <p>
              Completed schooling with 75.8% marks in Physics, Chemistry, and Mathematics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
