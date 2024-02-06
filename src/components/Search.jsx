import React,{ useState, useCallback, useEffect } from 'react'

const Search = props => {
    const {
        onSelect
    } = props

const [searchInput, setSearchInput] = useState('')
const [apigeo, setApiGeo] = useState([])

const handleChange = item => {
    onSelect(item)
    setApiGeo([])
    setSearchInput('')
}

const FetchAPIGeo = useCallback(() => {
  fetch(`https://geo.api.gouv.fr/communes?nom=${searchInput}`)
      .then(res => res.json())
      .then(data => setApiGeo(data))
}, [searchInput])

useEffect(() => {
  if(searchInput.length >= 3){
    FetchAPIGeo()
  }
}, [FetchAPIGeo, searchInput.length])


    return <div className="searchbar-container">

        <div className="searchbar-input-group">
            <input type="text"
                className="searchbar-input"
                placeholder="Rechercher..."
                value={searchInput}
                onChange= {e => setSearchInput(e.target.value)}
            />
            <button className="searchbar-button" onClick={FetchAPIGeo}>
                <svg className="searchbar-button-logo" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path
                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
            </button>
        </div>
        {!!apigeo.length && <div className="searchbar-options">
      <ul>
        {apigeo.map(searchItem => 
        <li key={searchItem.code}>
          <button onClick={() => handleChange(searchItem)}>
            {searchItem.nom} ({searchItem.code})
          </button>
        </li>)}
      </ul>
    </div>}
    </div>
}

export default Search