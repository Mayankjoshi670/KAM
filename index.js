const express = require("express") ; 
const morgan = require("morgan") ; 
const errorHandler = require("./middlerware/errorHandler");
const dotenv = require('dotenv').config() ;
const app = express() ;   
const seedDemoData = require('./demoData/seed');
app.use(morgan('dev')) ; 
app.use(express.json()) ;
const port = process.env.PORT || 5000 ; 
  seedDemoData()  ; 
//Lead Management
app.use("/api/v1" ,require("./routes/lead"));
app.use("/api/v1" ,require("./routes/restaurant"));
app.use("/api/v1" , require("./routes/manage"));
app.use("/api/v1" , require("./routes/interactions"));

app.use(errorHandler) ;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});