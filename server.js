// Dependencies
const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  path = require('path'),
  methodOverride = require('method-override');

// Configuration
const config = {
  projectName: "Angular Starter",
  distPath: "/public/"
};

// App config
app.set('port', process.env.PORT || 8000);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(methodOverride());

// Startup
app.listen(app.get('port'), '127.0.0.1', () => {
  console.log(`[${config.projectName}] static serve listening on port ${app.get('port')}`);
});

app.use(express.static(path.join(__dirname, config.distPath)));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, config.distPath, 'index.html'));
});

// Shutdown => CONTROL-C
process.on('SIGINT', () => {
  console.log(`[${config.projectName}] static serve shutdown due to SIGINT`);
  process.exit();
});
