const express = require('express');
const cors = require('cors');
const routes = require('./routes')

const app = express();

app.use(cors()); // Em desenvolvimento não precisa botar nada 
/* app.use(cors({ 
  origin: 'http://meusite.com' Na produção, o site só vai poder ser hospedado nessa url.
})); */
app.use(express.json());
app.use(routes);

app.listen(3333);