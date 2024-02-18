const mongoose = require("mongoose");




// mongoose.connect(URI)

const connectDB =  () =>{
    mongoose.connect(process.env.DB_URL)
    .then((res)=> console.log(`database conacted with ${res.connection.host}`))
    .catch((err) => console.log(err.massege));
    
}

module.exports = connectDB;
