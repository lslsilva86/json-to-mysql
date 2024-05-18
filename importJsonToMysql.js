const fs = require('fs');
const mysql = require('mysql2');

// Configure the MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Read and parse the JSON file
const jsonData = JSON.parse(fs.readFileSync('products.json', 'utf8'));

// Function to insert a batch of records
const insertBatch = (batch) => {
  const query = `INSERT INTO products (sku, name, type, price, upc, category, shipping, description, manufacturer, model, url, image)
                   VALUES ?`;
  const values = batch.map((record) => [
    record.sku,
    record.name,
    record.type,
    record.price,
    record.upc,
    JSON.stringify(record.category),
    record.shipping,
    record.description,
    record.manufacturer,
    record.model,
    record.url,
    record.image,
  ]);

  connection.query(query, [values], (err, results) => {
    if (err) throw err;
    console.log(`Batch of ${batch.length} records inserted`);
  });
};

// Process and insert records in batches
const BATCH_SIZE = 100;

for (let i = 0; i < jsonData.length; i += BATCH_SIZE) {
  const batch = jsonData.slice(i, i + BATCH_SIZE);
  insertBatch(batch);
}

// Close the MySQL connection
connection.end((err) => {
  if (err) throw err;
  console.log('Connection closed');
});
