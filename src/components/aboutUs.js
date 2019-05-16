import React from 'react';
import Luke from './images/Luke.png';
import Reina from './images/Reina.png';
import Robert from './images/Robert.png';
import Vinh from './images/Vinh.png';

export default class AboutUs extends React.Component {

    render() {
    
      return (
        <>
      <div  id="main">
    <section className='About Us'>
      <h1 id="about-us-title">About Us</h1>
        
    <div className='persons'>
      <section>
        <img src={Luke} alt="Luke Image" title="Luke image" className='members'/>
        <h2 className='name'>Luke Chandler</h2>
        <p className='p'>I am an aspiring software development engineer at Amazon    Web Services. My background is in Biochemistry and
          Military Intelligence as well as International Cooperation and Global Marketing Strategy. I decided to change career paths after seeing the degree to which technology permeates everything. It is also an industry that is constantly mentally challenging. In my spare time, I enjoy playing golf and climbing mountains. </p>
        <button className='aboutb'><a href="https://www.linkedin.com/in/luke-chandler4/" target="_blank">LinkedIn</a></button>
        <button className='aboutb'><a href="https://github.com/lhchandler4" target="_blank">GitHub</a></button>
      </section>
    </div>

    <div className='persons'>
      <section>
        <img src={Reina} alt="Reina Image" title="Reina image" className='members'/>
        <h2 className='name'>Reina Vencer</h2>
        <p className='p'>I am a Software Developer working with AWS as an apprentice. I am from Long Island, New York. I discovered my passion for coding in college taking the programming 1 course as an elective when I was a Bioscience major. Some fun facts about me would be my love for animals, dogs especially. Shiba Inu!</p>
        <button className='aboutb'><a href="https://www.linkedin.com/in/reina-vencer/" target="_blank">LinkedIn</a></button>
        <button className='aboutb'><a href="https://github.com/river-ceanne" target="_blank">GitHub</a></button>
      </section>
    </div>

    <div className='persons'>
      <section>
        <img src={Robert} alt="Robert Image" title="Robert image" className='members'/>
        <h2 className='name'>Robert Bronson</h2>
        <p className='p'>I come from a background in Army aviation where I worked on helicopters. I worked in aviation as a civilian for a while, but I decided to transition into a career that would be more mentally challenging. I chose software development because I feel like technology is in a position now to improve the quality of life for people on our planet. I want to be a part of creating things that have widespread positive impact on the world.</p>
        <button className='aboutb'><a href="https://www.linkedin.com/in/robert-bronson/" target="_blank">LinkedIn</a></button>
        <button className='aboutb'><a href="https://github.com/rjbrons" target="_blank">GitHub</a></button>
      </section>
    </div>

    <div className='persons'>
      <section>
        <img src={Vinh} alt="Vinh Image" title="Vinh image" className="members" />
        <h2 className='name'>Vinh Nguyen</h2>
        <p className='p'>Vinh Nguyen has a background in Mechanical, Nuclear, and
							Electrical Engineering alongside Software Development. After completing his studies at the University of
							Washington, he decided to pursue Software Development to complement his existing skills and knowledge and
							is now a proud Amazonian.</p>
        <button className='aboutb'><a href="https://www.linkedin.com/in/vinh-h-nguyen/" target="_blank">LinkedIn</a></button>
        <button className='aboutb'><a href="https://github.com/nguyenvinh2" target="_blank">GitHub</a></button>

      </section>
    </div>
    </section>
    </div>
    </>
    )
  }
}