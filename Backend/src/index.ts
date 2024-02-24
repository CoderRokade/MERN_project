// import { error } from "console"
import app from "./app.js"
import { connecttodatabase } from "./db/connections.js"

//connections and listners

const PORT = process.env.PORT || 5000;

connecttodatabase()
.then(()=>{
    app.listen(PORT,()=>{console.log("server open and connected to database as well")})
})
.catch((err)=>{
    console.log(err)
})



