import EventEmitter from "events"
import io from "socket.io-client"

export const emitter = new EventEmitter()

const url = "http://localhost:8000/"

const socket = io(url)

socket.on("update:onlineCounter", counter => {
  emitter.emit("update:onlineCounter", counter)
})