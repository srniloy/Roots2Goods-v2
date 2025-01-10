'use client';
import Image from "next/image";
import LoginIcon from '@mui/icons-material/Login'
import { Button } from '@mui/material'
import '../styles/home.css'
import Link from 'next/link'
import { useState } from 'react'
import { Loader } from './loading';
import MenuIcon from '@mui/icons-material/Menu';

const Home = () => {

const [isLoad, setIsLoad] = useState(false);
  return (
    <section className="home-page">
            <Loader open={isLoad}/>
            <section className="nav">
                <label htmlFor="barInput" className="menu-bar-label">
                    <MenuIcon className="menu-bar"/>
                </label>
                <b className="project-icon">
                    Roots2Goods
                </b>
                <input type="checkbox" id="barInput" />
                <div className="menu" id="menuBox">
                    <a href='#HeroSection' className="active-home">
                        <b className="home">Home</b>
                        <div className="active-home-child"></div>
                    </a>
                    {/* <a href='#HeroSection' className="home">About Us</a> */}
                    <a href='#ServiceSection' className="home">Our Services</a>
                    <a href='#OutcomeSection' className="home">Outcomes</a>
                    <a href='#TestimonialSection' className="home">Testimonials</a>
                    <a href='#ArticleSection' className="home">News & Article</a>
                    <a href='#ContactSection' className="home">Contact Us</a>
                </div>
                <div className="signin-space">
                    <Link href={'/auth/signin'}> 
                        <Button variant="contained" onClick={()=>setIsLoad(true)} className="signin-button" startIcon={<LoginIcon/>}>Sign in</Button>
                    </Link>
                </div>
            </section>

            {/* <!-- ================================================= Cover/Heading Section ====================================================================== --> */}

            <section className="hero-section" id='HeroSection'>

                <div className="text-button">
                    <div className="underline-01-parent">
                        <b className="original-natural">Original & Natural</b>

                        <Image
                            className="underline-01-icon"
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt=""
                            src='/images/underline-01.png' />

                    </div>
                    <div className="frame-parent4">
                        <div className="frame-parent5">
                            <div className="logo-description-uppper">
                                <div className="agricultural-supply-chain-parent">
                                    <b className="agricultural-supply-chain">Agricultural
                                        Supply
                                        Chain
                                    </b>
                                    <Image
                                        className="image-5-icon"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        alt=""
                                        src='/images/image-5@2x.png' />
                                </div>
                                <b className="management-system">Management System</b>
                            </div>
                            <p className="dissuade-ecstatic-and12">
                                Bringing trust across complex food chain. We
                                predict, monitor
                                and maintain fair price.
                            </p>
                        </div>
                        <div className="component-11">
                            <a href="#ServiceSection">
                                <div className="discover-more">Discover More</div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ================================================= Service Section ====================================================================== --> */}

            <section className="services" id='ServiceSection'>
                

                <div className="our-introduction-farmer">
                    <div className="service-styles">
                        <div className="style3"></div>
                        <div className="style4"></div>
                        <Image className="image-6-icon1" 
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt=""
                            src='/images/image-6@2x.png' />

                        <div className="successfully-project-completed2">
                            <Image className="icon7"  src='/images/icon5.png'
                                  width={0}
                                  height={0}
                                  sizes="100vw"
                                  alt=""
                            />

                            <div className="successfully-project-completed-item"></div>
                            <div className="group">
                                <div className="project-number" style={{lineHeight: '40px'}}>4</div>
                                <div className="successfully-project-completed1">
                                    Successfully Registered Farmers
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text4">
                        <div className="title3">
                            <div className="home">OUR SERVICES</div>
                            <b className="customer">Farmer</b>
                        </div>
                        <div className="at-the-end-the-food-reaches-o-parent">
                            <div className="at-the-end">
                                Farmers' The Piler of Agriculture Market.
                            </div>
                            <p className="dissuade-ecstatic-and8">
                                As farmer grapple with dwindling profits,
                                they’re stepping
                                away from their field, cast shadow over our
                                nation’s destiny
                                and leaving us on the brink of uncertainty.
                            </p>
                        </div>
                        <div className="title">
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                    Provide marginal revenue and cost of harvest
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                    Keeping track of agriculture optimize
                                    logistics
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Help create project to optimize
                                    harvest</div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                    Tracking and providing potential traders
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Providing full transparency</div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Keeping secure statement of
                                    transaction</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="our-introduction-farmer trader-part">
                    <div className="text4">
                        <div className="title3">
                            <div className="home">OUR SERVICES</div>
                            <b className="customer">Trader/Transporters</b>
                        </div>
                        <div className="at-the-end-the-food-reaches-o-parent">
                            <div className="at-the-end">
                                We Help in Sourcing, Scheduling And Delivering Your Goods.
                            </div>
                            <p className="dissuade-ecstatic-and8">
                            Unscrupulous businessmen exploit lax oversight, driving up prices on essential foods and household items. Thus forcing customers to food product at increased price while making substantial profits .
                            </p>
                        </div>
                        <div className="title">
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                Provide real time market logistics
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                Establish a secure connection with farmers and shop keepers
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Can observe and interact with all farmers projects</div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                Show detail personal revenues and costs
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Optimize profit and plan loadouts</div>
                            </div>
                        </div>
                    </div>

                    <div className="service-styles">
                        <div className="style3"></div>
                        <div className="style4"></div>
                        <Image className="image-6-icon1" 
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt=""
                            src='/images/image-6@2x.png'/>

                        <div className="successfully-project-completed2">
                            <Image className="icon7"  src='/images/icon5.png'
                                width={0}
                                height={0}
                                sizes="100vw"
                                alt=""/>

                            <div className="successfully-project-completed-item"></div>
                            <div className="group">
                                <div className="project-number">4</div>
                                <div className="successfully-project-completed1">
                                    Successfully Registered Traders
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="our-introduction-farmer wholesaler-part">
                    <div className="service-styles">
                        <div className="style3"></div>
                        <div className="style4"></div>
                        <Image className="image-6-icon1" 
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt=""
                            src='/images/image-6@2x.png'/>

                        <div className="successfully-project-completed2">
                            <Image className="icon7"  src='/images/icon5.png'
                                  width={0}
                                  height={0}
                                  sizes="100vw"
                                  alt=""
                            />

                            <div className="successfully-project-completed-item"></div>
                            <div className="group">
                                <div className="project-number">4</div>
                                <div className="successfully-project-completed1">
                                    Successfully Registered Wholesalers
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text4">
                        <div className="title3">
                            <div className="home">OUR SERVICES</div>
                            <b className="customer">WholeSaler/Retailer</b>
                        </div>
                        <div className="at-the-end-the-food-reaches-o-parent">
                            <div className="at-the-end">
                            We’re Distributor
                            </div>
                            <p className="dissuade-ecstatic-and8">
                            The food prices remain unstable due to constant exploitation occurring in the complex food chain.
                            </p>
                        </div>
                        <div className="title">
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                Provide consistent data of food market value
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                Predict future logistics of food price
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Provide different options for payment</div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <Image
                                    className="rifacebook-fill-icon"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    alt=""
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                Smart filtering system to optimize time and profit 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Image className='service-bg-style' src='/images/style3@2x.png' 
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt=""/>

            </section>

            {/* <!-- ================================================= Outcomes Section ====================================================================== --> */}

            <section className="modern-agriculture" id='OutcomeSection'>

                <div className="left-side">
                    <Image
                        className="pexels-tom-fisk-2468399-1-icon left-img"
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt=""
                        src='/images/pexelstomfisk2468399-1@2x.png'/>

                    <div className="component-22">
                        <Image className="image-21-icon seal-icon" 
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt=""
                        src='/images/image-21@2x.png'/>
                    </div>
                </div>

                <div className="right-side">
                    <div className="style">
                        <div className="style-child">
                            <div className="style-item"></div>
                        </div>
                        
                    </div>
                    <div className="heading">
                        <div className="modern-agriculture1">MODERN AGRICULTURE</div>
                        <b className="outcomes-of-our">Outcomes of Our Services</b>
                    </div>

                    <div className="growths">
                        <div className="row1">
                            <div className="economic-growth">
                                <Image className="icon"  src='/images/icon.png'
                                      width={0}
                                      height={0}
                                      sizes="100vw"
                                      alt=""/>
    
                                <div className="title-description1">
                                    <div className="economical-growth">Economical Growth</div>
                                    <p className="dissuade-ecstatic-and5">
                                        With our service we will be able to protect the
                                        economy from
                                        being influenced by price hikes.
                                    </p>
                                </div>
                            </div>

                            <div className="complete-transparency">
                                <Image className="icon"  src='/images/icon.png'
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        alt=""/>
    
                                <div className="title-description1">
                                    <div className="economical-growth">Complete
                                        Transparency</div>
                                    <p className="dissuade-ecstatic-and5">
                                    Complete transparency in agricultural supply chains fosters trust, ensures fair practices, reduces waste, and enhancing sustainability.
                                    </p>
                                </div>
                            </div>



                            <div className="improve-quality-control">
                                <Image className="icon"  src='/images/icon.png'
                                width={0}
                                height={0}
                                sizes="100vw"
                                alt=""/>
    
                                <div className="title-description1">
                                    <div className="economical-growth">Improve Quality
                                        Control</div>
                                    <p className="dissuade-ecstatic-and5">
                                    Improved quality control ensures premium produce, bolstering consumer satisfaction and profitability.
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div className="row2">
                            <div className="optimized-supply-chain">
                                <Image className="icon1"  src='/images/icon1.png'
                                  width={0}
                                  height={0}
                                  sizes="100vw"
                                  alt=""/>
    
                                <div className="title-description1">
                                    <div className="economical-growth">Optimized Supply
                                        Chain</div>
                                    <p className="dissuade-ecstatic-and2">
                                    Optimized supply chain enhances agricultural efficiency and boost overall productivity.
                                    </p>
                                </div>
                            </div>
                            <div className="reduce-wastage">
                                <Image className="icon1"  src='/images/icon1.png'
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        alt=""/>
    
                                <div className="title-description1">
                                    <div className="economical-growth">Reduce Wastage</div>
                                    <p className="dissuade-ecstatic-and2">
                                    Streamlining agricultural supply chains cuts waste, boosts efficiency, ensuring sustainable practices for a greener future.
                                    </p>
                                </div>
                            </div>

                            <div className="fair-price">
                                <Image className="icon1"  src='/images/icon1.png'
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        alt=""/>
    
                                <div className="title-description1">
                                    <div className="economical-growth">Fair Price</div>
                                    <p className="dissuade-ecstatic-and2">
                                    Lowering fair prices boosts farmers' income, enhances food accessibility, and ensures a sustainable agricultural supply chain
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        
                        
                        
                        
                    </div>

                    <Image className="style-icon2 background-design-img" 
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt=""
                        src='/images/style2@2x.png'/>
                </div>

            </section>

            
        {/* <!-- =========================================== Agculture metters======================================================================================================== --> */}
        <section className="agriculture-matters-video-sec" >

            <Image src='/images/image@2x.png' className='agriculture-matters-video-sec-img'
                width={0}
                height={0}
                sizes="100vw"
                alt=""/>
            <div className="text2 agri-heading">
                <b className="agro-quote">
                <p className="the-future-of">Agriculture Matters to</p>
                <p className="the-future-of">the Future of Bangladesh</p>
                </b>
            </div>

            <div className="agro-play-icon" style={{width: '400px'}}>
               </div>
        </section>

          {/* <!-- ================================================= Testimonial Section ====================================================================== --> */}

        <section className="testimonials1" id='TestimonialSection'>
            <div className="title2">
              <div className="contact-now">Our Testimonials</div>
              <b className="get-in-touch">WHAT THEY’RE TAKING ABOUT</b>
            </div>
            <div className="message">
              <div className="client-review">
                <div style={{position: 'relative', width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden'}}>
                    <Image style={{height: '100%', width: '100%', objectFit: 'cover'}} src='/images/trader.jpg'
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt=""/>
                </div>
  
                <div className="message1">

                    <Image className="stars-icon"  src='/images/stars.png'
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt=""/>

                  <p className="lorem-ipsum-dolor">
                    “The agricultural supply chain impresses with its efficiency, linking farmers to markets seamlessly. Timely distribution and fair pricing benefit both producers and consumers. This well-organized system ensures a steady flow of high-quality produce, fostering economic growth and food security. An essential backbone for sustainable agriculture.
                  </p>
                  <div className="heading-4-darun-due-parent">
                    <div className="div">Tanzim Karim</div>
                    <div className="heading-6">Customer</div>
                  </div>
                </div>
              </div>
              <div className="carousel">
                <div className="carousel-child"></div>
                <div className="carousel-item"></div>
                <div className="carousel-item"></div>
              </div>
            </div>
        </section>


          {/* <!-- ================================================= News article Section ====================================================================== --> */}

        <section className="atricles" id='ArticleSection'>
            <div className="back-style"></div>
            <div className="article-heading">
                <h6>FROM THE BLOG</h6>
                <h3>News & Articles</h3>
            </div>
            <div className="article-wrapper">

                <a target='_blank' href="https://www.thedailystar.net/business/economy/news/potatoes-eggs-onions-still-not-being-sold-govt-fixed-prices-3423981">
                <div className="blog-item">
                    <div className="img-part">
                        <Image style={{height: '100%', width: '100%', objectFit: 'cover'}} src='/images/article1.png' 
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt=""/>
                        <div className="date">Sep 21, 2023</div>
                    </div>

                    <div className="texts-part">
                        <div className="row2">
                            <h5>
                            Potatoes, eggs, onions still not being sold at govt-fixed prices
                            </h5>
                        </div>
                    </div>
                </div>
                </a>

                <a target='_blank' href="https://www.thedailystar.net/health/food/price-essentials/news/food-price-hike-ramadan-slap-down-syndicates-3002301">
                <div className="blog-item">
                    <div className="img-part">
                        <Image style={{height: '100%', width: '100%', objectFit: 'cover'}} src='/images/article2.jpg' 
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt=""/>
                        <div className="date">Apr 11, 2022</div>
                    </div>

                    <div className="texts-part">
                        <div className="row2">
                            <h5>
                            Food price hike in ramadan: Slap down on syndicates
                            </h5>
                        </div>
                    </div>
                </div>
                </a>

                <a target='_blank' href="https://www.thedailystar.net/business/news/reducing-loss-and-waste-fruit-and-vegetable-supply-chains-3286611">
                <div className="blog-item">
                    <div className="img-part">
                        <Image style={{height: '100%', width: '100%', objectFit: 'cover'}} src='/images/article3.png'
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt=""/>
                        <div className="date">Apr 2, 2023</div>
                    </div>

                    <div className="texts-part">
                        <div className="row2">
                            <h5>
                            Reducing loss and waste in fruit and vegetable supply chains
                            </h5>
                        </div>
                    </div>
                </div>
                </a>

            </div>
        </section>
        
        {/* <!-- ================================================= Contact us Section ====================================================================== --> */}

         {/* <section className="contact-us1">
            
            <div className="text1">
              <div className="title-description">
                <div className="title">
                  <div className="contact-now">Contact Now</div>
                  <b className="get-in-touch">GET IN TOUCH NOW</b>
                </div>
                <div className="dissuade-ecstatic-and1">
                  Lorem ipsum dolor sit amet, adipiscing elit. In hac habitasse
                  platea dictumst. Duis porta,quam ut finibus ultrices.
                </div>
              </div>
              <div className="contacts">
                <div className="phone-parent">
                  <div className="contact-now">Phone</div>
                  <div className="parent">
                    <div className="div">+880123456789</div>
                    <div className="div">+880987654321</div>
                  </div>
                </div>
                <div className="phone-parent">
                  <div className="contact-now">Email</div>
                  <div className="needhelpcompanycom-wrapper">
                    <a className="div">needhelp@company.com</a>
                  </div>
                </div>
                <div className="phone-parent">
                  <div className="contact-now">Address</div>
                  <div className="needhelpcompanycom-wrapper">
                    <div className="div">Road No. 8, Niketan, Dhaka, Bangladesh</div>
                  </div>
                </div>
              </div>
            </div>

            <form className="form">
                <div className="name">
                  <div className="your-name">Your Name</div>
                </div>
                <div className="name">
                  <div className="your-name">Phone Number</div>
                </div>
                <div className="name">
                  <div className="your-name">Your Email</div>
                </div>
                <div className="subject">
                  <div className="your-name">Your Message</div>
                </div>
                <div className="button2">
                  <div className="discover-more">Send Message</div>
                </div>
              </form>
        </section>  */}


        {/* <!-- ================================================= We are leader Section ====================================================================== --> */}

        <div className="we-are-leader">
            <Image className="style-icon"  src='/images/style@2x.png'
            width={0}
            height={0}
            sizes="100vw"
            alt=""/>

            <div className="we-are-leader-child"></div>
            <div className="icon-text">
                <Image className="icon"  src='/images/icon.png'
                width={0}
                height={0}
                sizes="100vw"
                alt=""/>

                <div className="copyright-smart-agro">
                    We optimise and increase the perfection of Agriculture Market
                </div>
            </div>
        </div>


        {/* <!-- ================================================= Footer ====================================================================== --> */}

        <section className="footer" id='ContactSection'>
            <div className="row1">

                <div className="logo-description-social-ico">
                    <div className="logo-description">
                    <div className="logo-description-inner">
                        <div className="logo-description-inner">
                            <b className="outcomes-of-our">Roots2Goods</b>
                        </div>
                    </div>
                    <div className="dissuade-ecstatic-and">
                    Bringing trust across complex food chain. We predict, monitor and maintain fair price.
                    </div>
                    </div>
                    <div className="dividor1"></div>
                    <div className="social-icon">
                    <Image
                        className="rifacebook-fill-icon"
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt=""
                        src='/images/rifacebookfill.png' />
      
                    <Image
                        className="rifacebook-fill-icon"
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt=""
                        src="/images/mditwitter.png"/>
      
                    <Image
                        className="rifacebook-fill-icon"
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt=""
                        src='/images/mdiyoutube.png' />
      
                    <Image
                        className="rifacebook-fill-icon"
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt=""
                        src='/images/basilinstagramsolid.png' />
                    </div>
                </div>
                <div className="useful-links">
                    <div className="economical-growth">Useful Links</div>
                    <div className="links">
                      <a href='#HeroSection' className="nav-link">Home</a>
                      <a href='#ServiceSection' className="nav-link">Our Services</a>
                      <a href='#TestimonialSection' className="nav-link">Testimonials</a>
                      <a href='#ArticleSection' className="nav-link">News & Article</a>
                      <a href='#OutcomeSection' className="nav-link">Outcomes</a>
                    </div>
                </div>
                <div className="newsletter">
                    <div className="text">
                      <div className="economical-growth">Contact Us</div>
                    </div>
                    <div className="contacts">
                <div className="phone-parent">
                  <div className="contact-now">Phone</div>
                  <div className="parent">
                    <div className="div">+880123456789</div>
                    <div className="div">+880987654321</div>
                  </div>
                </div>
                <div className="phone-parent">
                  <div className="contact-now">Email</div>
                  <div className="needhelpcompanycom-wrapper">
                    <a className="div">needhelp@company.com</a>
                  </div>
                </div>
                <div className="phone-parent">
                  <div className="contact-now">Address</div>
                  <div className="needhelpcompanycom-wrapper">
                    <div className="div">Road No. 8, Niketan, Dhaka, Bangladesh</div>
                  </div>
                </div>
              </div>
                  </div>
            </div>

            <div className="dividor"></div>

            <div className="copyright-policy-terms">
              <div className="copyright">
                Copyright ©Roots2Goods. All Right Reserved.
              </div>
            </div>
            
            
            
        </section>

        </section>
  )
}

export default Home