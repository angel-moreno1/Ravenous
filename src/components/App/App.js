import SearchBar from "../SearchBar/SearchBar";
import BusinessList from "../BusinessList/BusinessList";
import "./App.css";
import { useEffect, useState } from 'react';
const apiKey = "tEPwEgZ3zk2feFeNjTFc0k9opRiHHUDk70UKmXc3NmZf0XNGe3-GK_tTYqo-vWXzuAARlodAhdLRczy2EG829IkKU1xY99IifRboM4PPA2Kkb2pY0npbw4jJavVSYHYx"
// const proxy = "https://damp-peak-01929.herokuapp.com/";
const url = "https://api.yelp.com/v3/businesses/search?";

const initialBusinesses = {
  term: "pizza",
  location: "new york",
  sortBy: "best_match"
};

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [params, setParams] = useState(initialBusinesses);
  const [err, setErr] = useState(false);
  const [alert, setAlert] = useState(false);

  const searchYelp = (term, location, sortBy) => void setParams({ term, location, sortBy});

  useEffect(() => {
      async function fetchBusinesses() {
        if(!params.term || !params.location){
          setAlert(true);
          return
        }else{ 
          setAlert(false);
        }
        const response = await fetch(`${url}term=${params.term}&location=${params.location}&sort_by=${params.sortBy}`, {
          headers: { Authorization: `Bearer ${apiKey}` }
        });
        const data = await response.json();
        if(data.error) {
          setErr(true);
        }else {  
          setErr(false);
        }
        console.log(data)
        setBusinesses(data.businesses);
      }
      fetchBusinesses()
  }, [params])

  return (
    <div className="App">
      <h1>Ravenous</h1>
      <SearchBar searchYelp={searchYelp} />  
      {
          alert && <h4 style={{ marginLeft: "45%" }}>not empty please</h4>
      }   
      <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}> 
        {
          err ? <h4>nothing with that params, try again</h4>

          : Array.isArray(businesses) || businesses.length > 1
            ? <BusinessList businesses={businesses} />
            : <h4>nothing with that params</h4>
        }
      </div>
    </div>
  );
}

export default App;
