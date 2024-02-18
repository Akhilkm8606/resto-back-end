const app = require('./app');
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/confiq.env" });

connectDB()

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
