require("dotenv").config()
const app=require("./src/app")
const conectToDB = require("./src/config/database")



conectToDB()



app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})