const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

// parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
