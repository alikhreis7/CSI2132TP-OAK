import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    axios.put('http://localhost:3000/customer', { name: 'Michael Doe' })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('http://localhost:3000/customer')
      .then((response) => {
        setCustomerName(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Customer Name: {customerName}</h1>
    </div>
  );
}

export default App;

