import { useEffect, useState, useRef } from "react"
import { io } from "socket.io-client"

export function useSocket() {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef(null)

  useEffect(() => {
    const initSocket = () => {
      try {
        const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001'

        const newSocket = io(socketUrl, {
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 5,
          transports: ["polling", "websocket"], // Polling primero para Railway
          path: "/socket.io/", // Path por defecto de socket.io
          withCredentials: false,
          autoConnect: true,
        })

        newSocket.on("connect", () => {

          // Unirse al room 'dashboard' para recibir eventos
          newSocket.emit('join_dashboard')

          setIsConnected(true)
        })

        newSocket.on("disconnect", (reason) => {
          setIsConnected(false)
        })

        newSocket.on("connect_error", (error) => {
        })

        newSocket.on("error", (error) => {
        })

        // Log de TODOS los eventos para debugging (temporal)
        newSocket.onAny((eventName, ...args) => {
        })

        // Escuchar confirmación de unión al room
        newSocket.on("joined", (data) => {
        })

        socketRef.current = newSocket
        setSocket(newSocket)
      } catch (error) {
        setIsConnected(false)
      }
    }

    initSocket()

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  return { socket, isConnected }
}
