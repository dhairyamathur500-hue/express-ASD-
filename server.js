const express = require('experss');
const app = express();
const path = require('path');
const filepath = path.join(__dirname, "./data.json");

app.get('/products', (req, res)=>){
    const data = fstat.readFileSync(filepath, 'utf-8')
}