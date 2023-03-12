const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
  connectionString: 'postgresql://postgres:password123@localhost:5432/Hotel',
});

client.connect();

app.put('/customer', async (req, res) => {
    const newName = 'Michael Doe';
    const customerId = 2;
    try {
        // the $1 indicates the first parameter in this case newName, the $2 indicates the second paramters customerId
        //U could also just replace $1 with Michael Doe and $2 with 2 
      await client.query('UPDATE customers SET name = $1 WHERE id = $2', [newName, customerId]);
      res.send(`Customer name updated to ${newName}.`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating customer name.');
    }
  });


app.get('/customer', async (req, res) => {
  const customerId = 2;

  const result = await client.query('SELECT name FROM customers WHERE id = 3');
  const customerName = result.rows[0].name;
  res.json({ name: customerName });
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
