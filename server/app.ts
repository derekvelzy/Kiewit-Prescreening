const express = require('express');
const parser = require('body-parser');
const path = require('path');

const app = express();
app.use(parser.json());
app.set('port', 8020);

app.use('/', express.static(path.join(__dirname, '..', 'public')));

app.listen(app.get('port'), (err: Error) => {
  err ? console.log('error connecting to server') : console.log(`>>> Listening on port ${app.get('port')} <<<`);
})