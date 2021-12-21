import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import ReactPaginate from "react-paginate";
import {GrFormPrevious, GrFormNext} from 'react-icons/gr'
import './Welcome.css'
import { BiHeart } from "react-icons/bi";
import axios from "axios";
import apiList from "../../lib/apiList";
import Pager from "./pager";
import "../../App.css"
const Welcome = (props) => {
    const [jobs,setJobs] = useState([]);
  const Options = {
    margin: 30,
    responsiveClass: true,
    // nav: true,
    autoplay: true,
    loop: true,
    // navText: ["Prev", "Next"],
    smartSpeed: 5000,
    responsive: {
        0: {
            items: 1,
        },
        400: {
            items: 1,
        },
        600: {
            items: 2,
        },
        700: {
            items: 3,
        },
        1000: {
            items: 3,
        }
    },
};

// Pagination code
const [offset, setOffset] = useState(1);
//   const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const indexOfLastPost = offset * perPage;
    const indexOfFirstPost = indexOfLastPost - perPage;
    const currentPosts = jobs.slice(indexOfFirstPost, indexOfLastPost);
      const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1);
      };

// useEffect(async()=>{
//    await axios.get(apiList.jobs, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         // console.log(response.data);
//         setPageCount(Math.ceil(response.data.length / perPage));
//         setJobs(response.data)
//       })
//       .catch((err) => {
//         console.log(err.response.data);
//       });
      
    
// },[offset])

useEffect(()=>{
    axios.get('http://localhost:4444/api/alljobs').then((response) => {
        setPageCount(Math.ceil(response.data.length / perPage));
        setJobs(response.data)
        })
        
},[offset])

// useEffect(()=>{
//     setPageCount(Math.ceil(jobs.length / perPage));
// },[offset])

// const [maxPostsPerAction] = useState(5)
//     const [DefaultButton,setStateDefaultButton] = useState(1)
//     const ChangeButtonNumbers=(no)=>{
//       setStateDefaultButton(no)
//     }
//     const lastPostIndex = DefaultButton*maxPostsPerAction;//5
//     const firstPostIndex = lastPostIndex-maxPostsPerAction;//0
//     const Currentpage = jobs?.slice(firstPostIndex,lastPostIndex);
//     const TotalPosts = jobs?.length;

    
  return (
    <React.Fragment>
            <section>
                <div  id="sec1" className="container-fluid">           

                <div className="container hm1">

                    <div className="home1">
                        <a  id="am1" className=" btn-primary button-sm" href="#">Find Jobs, Employment &amp; Career Opportunities</a>
                        <h2 className="am2">Search Between More Than <br/> <span className="text-primary">50,000</span> Open Jobs.</h2>
                        </div>

                        <div className="hm2">
                        <form className="form-control">
                            <div className="row">
                    
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <label>
                                            
                                        </label>
                    
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Job Title, Keywords, or Phrase"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <i className="fas fa-search" id="fa1"></i></span>
                                            </div>
                                        </div>
                                </div>
                            </div>
                                   
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label></label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Location"/>
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <i className="fas fa-map-marker-alt" id="fa2"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    
                            <div className="col-lg-2 col-md-6">
                            {/* <label for=""></label> */}
                            <div className="Find-job-btn">

                            <button id="fa3" type="submit" className="btn-primary  btn-block">Find Job</button>
                            </div>
                                
                            </div>

                        </div>
                    </form>
                    </div>

                </div>
                
              </div>
            </section>
            <section id="categories">
                <div className="container">
                    <div className="row">   
                        <div className="col-lg-6 pc">
                            <h2 >Popular Categories</h2>
                            <h6 className="fw3">20+ Catetories work wating for you</h6>
                        </div>
                        <div className="col-lg-2 text-center" >
                            <h2 className=" counter "><span>1800</span></h2>
                            <h6 >Jobs Posted</h6>
                        </div>
                        <div className="col-lg-2 text-center">
                            <h2 className=" counter"><span>4500</span></h2>
                            <h6 >Tasks Posted</h6></div>
                            <div className="col-lg-2 text-center">
                            <h2 className=" counter"><span>1500</span></h2>
                            <h6 >Freelancers</h6></div>
                        </div>
                        <div className="pt-5 pb-5">
                            <div className="container">
                            <div className="row">        
                            <div className="col-lg-3 col-sm-6">
                                <div className="item">
                                    <span className="icon feature-box-col-one"><i className="fas fa-location-arrow"></i></span>
                                    <h6>Design, Art & MultiMedia</h6>
                                    <p>198 Open Positions</p> 
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="item">
                                    <span className="icon feature-box-col-two"><i className="fas fa-archive"></i></span>
                            
                                    <h6>Creative Design</h6>
                                    <p>198 Open Positions</p>  
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="item">
                                    <span className="icon feature-box-col-three"><i className="fas fa-wallet"></i></span>  
                                    <h6>Your Photoshopping</h6>
                                    <p>198 Open Positions</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="item">
                                    <span className="icon feature-box-col-four"><i className="fas fa-cloud-upload-alt"></i></span>
                                    <h6>Business Growth</h6>
                                    <p>198 Open Positions</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="item">
                                    <span className="icon feature-box-col-five"><i className="fas fa-chart-bar"></i></span>
                                    <h6>Market Strategy</h6>
                                    <p>198 Open Positions</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="item">
                                    <span className="icon feature-box-col-six"><i className="fas fa-tablet"></i></span>
                                    <h6>Retina Ready</h6>
                                    <p>198 Open Positions</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="item">
                                    <span className="icon feature-box-col-six"><i className="fas fa-camera"></i></span>                     
                                    <h6>Retina Ready</h6>
                                    <p>198 Open Positions</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="item">
                                    <span className="icon feature-box-col-six"><i className="fas fa-solar-panel"></i></span>
                                    <h6>Retina Ready</h6>
                                    <p>198 Open Positions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </section>
            <div id="sec3">
        <div className="container text-center">
            <h2>Featured Cities</h2>
            <p>20+ Featured Cities Added Jobs</p>
            <div className="row">
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card img-fluid city">
                      <img className="card-img-top" src="img/card 1.jpg" alt=""/>
                      <div className="card-img-overlay">
                        <div className="card-body text-left text-white">
                            <h4 className="card-title">Hyderabad</h4>
                            <p>50 Jobs</p>
                        </div>
                      </div>
                    </div>       
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card img-fluid city">
                      <img className="card-img-top" src="img/card 2.jpg" alt=""/>
                      <div className="card-img-overlay">
                        <div className="card-body text-left text-white">
                            <h4 className="card-title">Mumbai</h4>
                            <p>50 Jobs</p>
                        </div>
                      </div>
                    </div>       
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card img-fluid city">
                      <img className="card-img-top" src="img/card 3.jpg" alt=""/>
                      <div className="card-img-overlay">
                        <div className="card-body text-left text-white ">
                            <h4 className="card-title">Chennai</h4>
                            <p>50 Jobs</p>
                        </div>
                      </div>
                    </div>       
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card img-fluid city">
                      <img className="card-img-top" src="img/card 4.jpg" alt=""/>
                      <div className="card-img-overlay">
                        <div className="card-body text-left text-white">
                            <h4 className="card-title">Pune</h4>
                            <p>50 Jobs</p>
                        </div>
                      </div>
                    </div>       
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card img-fluid city">
                      <img className="card-img-top" src="img/card 5.jpg" alt=""/>
                      <div className="card-img-overlay">
                        <div className="card-body text-left text-white">
                            <h4 className="card-title">Bangalore</h4>
                            <p>50 Jobs</p>
                        </div>
                      </div>
                    </div>       
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card img-fluid city">
                      <img className="card-img-top" src="img/card 6.jpg" alt=""/>
                      <div className="card-img-overlay">
                        <div className="card-body text-left text-white">
                            <h4 className="card-title">Delhi</h4>
                            <p>50 Jobs</p>
                        </div>
                      </div>
                    </div>       
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card img-fluid city">
                      <img className="card-img-top" src="img/card 7.jpg" alt=""/>
                      <div className="card-img-overlay">
                        <div className="card-body text-left text-white">
                            <h4 className="card-title">Kolkata</h4>
                            <p>50 Jobs</p>
                        </div>
                      </div>
                    </div>       
                </div>
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="card img-fluid city">
                      <img className="card-img-top" src="img/card 8.jpg" alt=""/>
                      <div className="card-img-overlay">
                        <div className="card-body text-left text-white">
                            <h4 className="card-title">Ahmedabad</h4>
                            <p>50 Jobs</p>
                        </div>
                      </div>
                    </div>       
                </div>
            </div>
        </div>
        
    </div>



    <div id="sec4">
        <div className="container">
            <div className="d-flex mb-4">
                <div className="mr-auto">
                    <h2>Recent Jobs</h2>
                    <h6>20+ Recently Added Jobs</h6>
                </div>
                <div className="align-self-end">
                    <a className="browse button" href="#">Browse All Jobs <i className="fas fa-chevron-right"></i></a>
                </div>
            </div>    
            <div className="row">
                <div className="col-lg-9">
              
                        {
                            currentPosts.map((val,index)=>{
                            return(
                                <ul className="job-post">
                                <li>
                                   <div className="job-box">
                                       <div className="d-flex mb-4">
                                           <div className="job-company">
                                               <span><img alt="" src=""/></span>
                                           </div>
                                           <div className="job-info">
                                               <h4><a href="#">{val.title}</a></h4>
                                               <ul>
                                                   <li><i className="fas fa-map-marker-alt"></i>Kolkata</li>
                                                   <li><i className="far fa-bookmark"></i>Full Time</li>
                                                   <li><i className="far fa-clock"></i>Published 20 days ago</li>
                                               </ul>
                                           </div>
                                       </div>
                                       <div className="d-flex">
                                           <div className="job-type mr-auto">
                                               <a href="#"><span>{val.jobType}</span></a>
                                           </div>
                                           <div className="salary">
                                               <span><i className="fas fa-rupee-sign"></i> 40000 - <i className="fas fa-rupee-sign"></i> 50000</span>
                                           </div>
                                           <label className="wishlist">
                                               <input type="checkbox"/><span className="added">
                                                 <BiHeart size={28} style={{width:"26px"}}/>
                                                 </span>
                                           </label>   
                                       </div>                            
                                   </div>
                               </li>
                               </ul>
                               
                            )   
                          
                            })
                        }
                            {/* <Pager MaxPostPerAction={maxPostsPerAction}
                              TotalPosts={TotalPosts}
                              ChangeButtonNumbers={(no)=>ChangeButtonNumbers(no)}
                              Currentpage={Currentpage} /> */}
                        <div className="pagination-container">
                            <ReactPaginate
                            previousLabel={<GrFormPrevious />}
                            nextLabel={<GrFormNext />}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            />
                        </div>
                  
                </div>
                <div className="col-lg-3">
                    <div className="sticky-top">
                        <div className="member mb-4">
                            <div className="member-box">
                                <div className="test-pic round">
                                    <img src="" alt=""/>
                                </div>
                                <div className="test-matter">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                                <div className="test-location">
                                    <p><b className="test-name">Richard Anderson</b></p>
                                    <p><span className="test-place">Nevada, USA</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="sentence-box">
                            <div className="sentence-matter">
                                <h4>Make a Difference with Your Online Resume!</h4>
                                <p>Your resume in minutes with JobBoard resume assistant is ready!</p>
                                <a className="acc-btn" href="#">Create an Account</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    {/* <section id="testimonials">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                        <div className="section-heading text-center">
                            <h6> Testimonials</h6>
                            <h5>Few words from candidates</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container py-5' > */}
                {/* <OwlCarousel  {...Options} > */}
                    {/* <div className="testimonial">
                        <p className="description" >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry text ever.
                        </p>
                        <img className="img pic" src={'/img/card 1.jpg'} />
                        <div className="Carousel_names">
                        <h3 className="title"> Broad Pit</h3>
                        <p className="post">Web Developer</p>
                        </div>

                    </div>
                    <div className="testimonial">
                        <p className="description" >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry text ever.
                        </p>
                        <img className="img pic" src={'/img/card 1.jpg'} />
                        <div className="Carousel_names">
                        <h3 className="title"> Broad Pit</h3>
                        <p className="post">Web Developer</p>
                        </div>

                    </div>
                    <div className="testimonial">
                        <p className="description" >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry text ever.
                        </p>
                        <img className="img pic" src={'/img/card 1.jpg'} />
                        <div className="Carousel_names">
                        <h3 className="title"> Broad Pit</h3>
                        <p className="post">Web Developer</p>
                        </div>


                    </div>
                    <div className="testimonial">
                        <p className="description" >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry text ever.
                        </p>
                        <img className="img pic" src={'/img/card 1.jpg'} />
                        <div className="Carousel_names">
                        <h3 className="title"> Broad Pit</h3>
                        <p className="post">Web Developer</p>
                        </div>


                    </div>
                    <div className="testimonial">
                        <p className="description" >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry text ever.
                        </p>
                        <img className="img pic" src={'/img/card 1.jpg'} />
                        <div className="Carousel_names">
                        <h3 className="title"> Broad Pit</h3>
                        <p className="post">Web Developer</p>
                        </div>


                    </div>
                    <div className="testimonial">
                        <p className="description" >
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry text ever.
                        </p>
                        <img className="img pic" src={'/img/card 1.jpg'} />
                        <div className="Carousel_names">
                        <h3 className="title"> Broad Pit</h3>
                        <p className="post">Web Developer</p>
                        </div>


                    </div>              */}
{/*                    
                    <div><img className="img" src={'/img/card 1.jpg'} /></div>
                    <div><img className="img" src={'/img/card 1.jpg'} /></div>
                    <div><img className="img" src={'/img/card 1.jpg'} /></div>
                    <div><img className="img" src={'/img/card 1.jpg'} /></div>
                    <div><img className="img" src={'/img/card 1.jpg'} /></div> */}
                {/* </OwlCarousel> */}
            {/* </div> */}
        {/* </section> */}


        <section className="features-section-6 section">
        <div className="container text-center">
            <h2>Membership Plans</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
            <div className="row section-separator">

                {/* <!-- Start: Section Heading --> */}
                <div className="section-header col-md-8">
                
                </div>
                {/* <!-- End: Section Heading --> */}

                <div className="pricing-table pricing-table-js col-xs-12">
                    <div className="row">
                        
                        <div className="col-md-4 each-table col-xs-12">
                            <div className="table-single right text-center">

                                <div className="rounded-lg shadow">
                                    <h4 className="text-uppercase font-weight-bold mb-4">Basic</h4>
                                    <h6 className="font-weight-bold" id="fr">Free</h6>
                                    <p className="prd">
                                        Lorem ipsum dolor sit amet consectetur adipisicing, deleniti quama voluptates amet.
                                    </p>
                                    <a href="#"><button id="bt" type="button" className="btn btn-primary navbar-btn">SIGNUP</button></a>
                                    
                                </div>

                            </div> 
                            {/* <!-- End: .table-single --> */}
                        </div> 
                        {/* <!-- End: .each-table --> */}
                        <div className="col-md-4 each-table">
                            <div className="table-single open text-center active">

                                <div className=" rounded-lg shadow">
                                    <h4 className="text-uppercase font-weight-bold mb-4" id="hd2">Professional</h4>
                                    <h6 className="font-weight-bold" id="fr">$29 /Installation</h6>
                                    <p className="prd">
                                        Lorem ipsum dolor sit amet consectetur adipisicing, deleniti quama voluptates amet.
                                    </p>
                                    <a href="#"><button id="bt" type="button" className="btn btn-primary navbar-btn">SIGNUP</button></a>
                                    
                                </div>

                            </div>
                             {/* <!-- End: .table-single --> */}
                        </div> 
                        {/* <!-- End: .each-table --> */}
                        <div className="col-md-4 each-table">
                            <div className="table-single left text-center">

                                <div className=" rounded-lg shadow">
                                    <h4 className="text-uppercase font-weight-bold mb-4">Extended</h4>
                                    <h6 className="font-weight-bold" id="fr">$29 /Installation</h6>
                                    <p className="prd">
                                        Lorem ipsum dolor sit amet consectetur adipisicing, deleniti quama voluptates amet.
                                    </p>
                                    <a href="#"><button id="bt" type="button" className="btn btn-primary navbar-btn">SIGNUP</button></a>
                                    
                                </div>

                            </div> 
                            {/* <!-- End: .table-single --> */}
                        </div> 
                        {/* <!-- End: .each-table --> */}

                    </div> 
                    {/* <!-- End: .row --> */}
                </div> 
                {/* <!-- End: .pricing-table --> */}

            </div> 
            {/* <!-- End: .row --> */}
        </div> 
        {/* <!-- End: .container --> */}
    </section>
  
            </React.Fragment>
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
