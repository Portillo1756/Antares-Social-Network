const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
//needdd these two lines of code for anything with a post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`server started on ${PORT}`);
    })
});