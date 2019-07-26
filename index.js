var PORT = process.env.REACT_APP_PORT || 5000;
let DOMAIN = process.env.REACT_APP_DOMAIN || "http://localhost";

var app = require("./lib/app.js")();

console.log(`Running @ ${DOMAIN}:${PORT}. Press ^C to Terminate.`);
app.listen(PORT);
