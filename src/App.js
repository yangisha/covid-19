import React,{useEffect,useState} from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import CardColumns from 'react-bootstrap/CardColumns';
import Columns from "react-columns";

function App() {
  const [latest,setLatest] =useState([]);
const [results,setResults]= useState([]);
 
  useEffect(()=>{
    axios
    .all ([
      axios.get("https://corona.lmao.ninja/v2/all"),
      axios.get("https://corona.lmao.ninja/v2/countries")
    ])
    .then(responseArr => {
      setLatest(responseArr[0].data);
      setResults(responseArr[1].data);
    })
    .catch(err => {
      console.log(err);
    }); 
  },[]); 

  const date =new Date (parseInt(latest.updated));
  const lastUpdated=date.toString();

  const countries = results.map((data,i) => {
    return(
      <Card
      key={i}
      bg="light" 
      text="dark"
       className="text-center"
        style ={{ margin:"10px" }}
         >
        <Card.Img variant="top" src={data.countryInfo.flag} /> 
      <Card.Body> 
        <Card.Title> {data.country}</Card.Title>
        <Card.Text>Cases :{data.cases} </Card.Text>
        <Card.Text>Deaths:{data.deaths} </Card.Text>
        <Card.Text>Recovered:{data.recovered} </Card.Text>
        <Card.Text>TodayCases:{data.todayCases} </Card.Text>
        <Card.Text>TodayDeaths:{data.todayDeaths} </Card.Text>
        <Card.Text>Active:{data.active} </Card.Text>
        <Card.Text>Critical:{data.critical} </Card.Text>

      </Card.Body>
      </Card>
    );


  });
 
  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];

  return (
   <div>
     <CardDeck>
   <Card bg="secondary" text="white" className="text-center" >
     <Card.Body>
       <Card.Title align='center' style ={{ margin:"10px" }}>Cases</Card.Title>
       <Card.Text align='center'>
 {latest.cases}
       </Card.Text>
     </Card.Body>
     <Card.Footer>
       <small >Last updated {lastUpdated}</small>
     </Card.Footer>
   </Card>
   <Card bg="danger" text="white" >
    
     <Card.Body>
       <Card.Title className='text-center'>Deaths</Card.Title>
       <Card.Text className='text-center'>
 {latest.deaths}
       </Card.Text>
     </Card.Body>
     <Card.Footer>
       <small >Last updated {lastUpdated}</small>
     </Card.Footer>
   </Card>
   <Card bg="success" text="white" className="center" >
    
     <Card.Body>
       <Card.Title  className='text-center'>Recovered</Card.Title>
       <Card.Text className='text-center'>
 {latest.recovered}
       </Card.Text>
     </Card.Body>
     <Card.Footer>
       <small >Last updated {lastUpdated}</small>
     </Card.Footer>
   </Card>
 </CardDeck>
<Columns queries={queries} >{countries }</Columns> 
 </div>
  );
}

export default App; 
