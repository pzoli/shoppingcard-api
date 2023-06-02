import { ConnectOptions, connect } from "mongoose";

export default async () => {
    try {
        const connectionParams: ConnectOptions = {
        };
        await connect(process.env.DB || 'mongodb://127.0.0.1:27017/shoppingcard', connectionParams);
        console.log("connected to database.");
    } catch (error) {
        console.log("could not connect to database", error);
    }
};
