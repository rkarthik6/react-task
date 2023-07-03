import { useState, useEffect } from 'react';
import TableData from './TableData'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner  from './Spinner';
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [dogDetails, setDogDetails] = useState('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const searchDog = setTimeout(() => {
      
      // Send Axios request here
      
      if (searchTerm) {
        setLoading(true)
        axios.get('https://api.thedogapi.com/v1/breeds/search?api_key=live_7PpG5aQ83K5I0WvtVnirTYTyxyCdPUghyHsyDd7GuC8kLpeD4jBO32X2Husai7Fd', {
            params: {
                q: searchTerm,
            },
        }).then((res) => {
          setLoading(false)
          const sortedResponse = res.data.sort((a, b) => { 
            const convertPartA = a.life_span.replace("years", "")?.split("-")
            const convertPartB = b.life_span.replace("years", "")?.split("-")
            const formatPartAHeight = a?.height?.metric?.split("-")
            const formatPartBHeight = b?.height?.metric?.split("-")
            const partALifeSpan = Number(convertPartA[1] ? convertPartA[1] : convertPartA[0]);
            const partBLifeSpan = Number(convertPartB[1] ? convertPartB[1] : convertPartB[0]);
            const partAHeight = Number(formatPartAHeight[1] ? formatPartAHeight[1] : formatPartAHeight[0]);
            const partBHeight = Number(formatPartBHeight[1] ? formatPartBHeight[1] : formatPartBHeight[0]);
            return a.name.localeCompare(b.name) || (partBHeight - partAHeight) || (partBLifeSpan - partALifeSpan)
          })
          setDogDetails(sortedResponse)
        })
        
        // Catch errors 
        .catch((err) => {  
          setLoading(false); 
          setErrorMsg(err?.message)
        });
        
      } else {
        setDogDetails([])
      }
    }, 1000)

    return () => clearTimeout(searchDog)
  }, [searchTerm])


  // function handleChange(event) {
  //   let searchValue = event.target.value
  //   console.log(event.target.value);
  //   if (searchValue) {

  //   }
  // }

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <div className="App">
            <header>
              <h1>Dog breed search</h1>
            </header>
            Search: <input type="text" onChange={(e) => setSearchTerm(e.target.value)}/>
            {isLoading && <Spinner />}
            {errorMsg ? errorMsg : (<TableData dogDetails={dogDetails}/>)}
          </div>
        </Col>
      </Row>
    </Container>
    
  );
}

export default App;
