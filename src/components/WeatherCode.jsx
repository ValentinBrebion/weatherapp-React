import React from 'react'
import sunshine from '../assets/img/sunshine.png';
import partielSun from '../assets/img/partial-sun.png';
import clouds from '../assets/img/clouds.png';
import fog from '../assets/img/fog.png'
import sunrain from '../assets/img/sun-rain.png';
import heavyrain from '../assets/img/heavy-rain.png';
import slightsnow from '../assets/img/slight-snow.png';
import heavysnow from '../assets/img/heavy-snow.png';
import thunderstorm from '../assets/img/thunderstorm.png';


    const codesimage = [
    {
        codeimg:0,
        image: sunshine
    },
    {
        code: 2,
        image: partielSun
    }, 
    {
        code: 3,
        image: clouds
    },
    {
        code: 45,
        image: fog
    },
    {
        code: 51,
        image: sunrain
    },
    {
        code: 65,
        image: heavyrain
    },
    {
        code: 71,
        image: slightsnow
    },
    {
        code: 75,
        image: heavysnow
    },
    {
        code: 95,
        image: thunderstorm
    }
]



const WeatherImg = (props) => {
    const { 
        code
    } = props
    
    var findImg = code => codesimage
    .find(i => code >= i.code)
    ?.image

    return <img 
    src={findImg(code)}
    alt="sunshine" 
    className="weathercode-img" />
}
export default WeatherImg