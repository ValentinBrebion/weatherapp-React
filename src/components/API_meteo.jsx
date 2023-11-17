import React, { useState } from 'react';

function FetchDemo(){

    const [fact, setFact] = useState(null)
    const getData = () => {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41')
            .then(res => res.json())
            .then(data => setFact(data))
    }

    return <div>
        {fact && <figure>
            <blockquote>
                {fact.text}
            </blockquote>
            <cite>
                {fact.source}
            </cite>
        </figure>}
        <button onClick={getData}>
            Get a random fact
        </button>
    </div>
}