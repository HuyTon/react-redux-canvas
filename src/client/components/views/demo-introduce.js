import React from 'react';
import p1 from '../../assets/images/canvas0.png';
import p2 from '../../assets/images/canvas1.png';
import p3 from '../../assets/images/canvas2.png';

const Introduce = () => {
    const input = "hello";
    return (
        <div className="home-page">
            <h1>Introduce Magic Canvas using Redux</h1>            
                <h4>Install packages and run demo</h4> 
                <ul>
                    <li>npm install</li>
                    <li>npm start</li>
                </ul>                                               
                        
                <h4>Demo pictures</h4>
                <p><img src={p1} /></p>
                <p><img src={p2} /></p>
                <p><img src={p3} /></p>                      
        </div>
    );
}

export default Introduce;