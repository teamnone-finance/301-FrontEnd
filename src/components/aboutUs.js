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
      <h1>About Us</h1>
        
    <div className='persons'>
      <section>
        <img src={Luke} alt="Luke Image" title="Luke image" className='members'/>
        <h2 className='name'>Luke Chandler</h2>
        <p className='p'>I am an aspiring software development engineer at Amazon Web Services. My background is in Biochemistry and
          Military Intelligence as well as International Cooperation and Global Marketing Strategy. I enjoy playing golf
          and climbing mountains. </p>
        <button className='aboutb'><a href="https://www.linkedin.com/in/luke-chandler4/" target="_blank">LinkedIn</a></button>
        <button className='aboutb'><a href="https://github.com/lhchandler4" target="_blank">GitHub</a></button>
      </section>
    </div>

    <div className='persons'>
      <section>
        <img src={Reina} alt="Reina Image" title="Reina image" className='members'/>
        <h2 className='name'>Reina Vencer</h2>
        <p className='p'></p>
        <button className='aboutb'><a href="https://www.linkedin.com/in/reina-vencer/" target="_blank">LinkedIn</a></button>
        <button className='aboutb'><a href="https://github.com/river-ceanne" target="_blank">GitHub</a></button>
      </section>
    </div>

    <div className='persons'>
      <section>
        <img src={Robert} alt="Robert Image" title="Robert image" className='members'/>
        <h2 className='name'>Robert Bronson</h2>
        <p className='p'></p>
        <button className='aboutb'><a href="https://www.linkedin.com/in/robert-bronson/" target="_blank">LinkedIn</a></button>
        <button className='aboutb'><a href="https://github.com/rjbrons" target="_blank">GitHub</a></button>
      </section>
    </div>

    <div className='persons'>
      <section>
        <img src={Vinh} alt="Luke Image" title="Vinh image" className="members" />
        <h2 className='name'>Vinh Nguyen</h2>
        <p className='p'></p>
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