import React from 'react';
import "./Footer.css"
function Footer() {
    return (
      
      <React.Fragment>    
          <footer id="sec5">
        <div className="foot">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 foot_add">
                        <h3 style={{color: "#2e55fa"}}>Job Portal</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="col-lg-3 col-md-6 foot_icon">
                        <h4>Job Seekers</h4>
                        <ul>
                          <li><i className="fas fa-chevron-right"></i><a href="#">Register Now</a></li>
                          <li><i className="fas fa-chevron-right"></i><a href="#">Search Jobs</a></li>
                          <li><i className="fas fa-chevron-right"></i><a href="#">Login</a></li>
                          <li><i className="fas fa-chevron-right"></i><a href="#">Create Job Alert</a></li>
                          <li><i className="fas fa-chevron-right"></i><a href="#">Report a Problem</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 foot_icon">
                        <h4>Employers</h4>
                        <ul>
                            <li><i className="fas fa-chevron-right"></i> <a href="#">Job Posting</a></li>
                            <li><i className="fas fa-chevron-right"></i> <a href="#">Recruiter Login</a></li>
                            <li><i className="fas fa-chevron-right"></i> <a href="#">Resume Database Access</a></li>
                            <li><i className="fas fa-chevron-right"></i> <a href="#">Report a Problem</a></li>
                            <li><i className="fas fa-chevron-right"></i> <a href="#">Others</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 foot_icon">
                        <h4>Browse Jobs</h4>
                        <ul>
                            <li><i className="fas fa-chevron-right"></i> <a href="#">Browse All Jobs</a></li>
                            <li><i className="fas fa-chevron-right"></i> <a href="#">Jobs by Company</a></li>
                            <li><i className="fas fa-chevron-right"></i> <a href="#">Jobs by Category</a></li>
                            <li><i className="fas fa-chevron-right"></i> <a href="#">Jobs by Location</a></li>
                            <li><i className="fas fa-chevron-right"></i> <a href="#">Jobs by Skill</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row crt">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        Copyright <b style={{color: "#2e55fa"}}>Job Portal</b>. All Rights Reserved
                    </div>
                    <div className="foot_web col-lg-6 col-md-6 col-sm-12">
                        <a href=""><i className="fab fa-linkedin"></i></a>
                        <a href=""><i className="fab fa-instagram"></i></a>
                        <a href=""><i className="fab fa-facebook"></i></a>
                        <a href=""><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  
      </React.Fragment>   
  );
  }
  
  export default Footer;
