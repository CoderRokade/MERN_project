import { connect,disconnect } from "mongoose";


async function connecttodatabase() {
    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
        throw new Error("Could not connect from mongoDB")
    }
}

async function disconnectdatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error)
        throw new Error("Could not disconnect from mongoDB")
    }
}

export {connecttodatabase,disconnectdatabase};