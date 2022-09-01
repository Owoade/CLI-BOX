function expressWsTemlaplate() {
    return `

    import { createServer } from "http";
    import { Server } from "socket.io";
    import express from "express";


    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });

    io.on("connection", (socket)=>{
        console.log("client connected");
    })

    httpServer.listen(3000)
    .on("listening", ()=> console.log("server up and running"))

    `
}

module.exports = expressWsTemlaplate
