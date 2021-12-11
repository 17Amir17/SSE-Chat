"use strict";
const myApp = require('./back/app');
const port = process.env.PORT || 8080;
myApp.listen(port, () => {
    console.log(`Listening on ${port}`);
});
