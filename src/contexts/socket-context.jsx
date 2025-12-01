import { createContext, useContext, useEffect, useState, useRef } from "react"
import { io } from "socket.io-client"

const SocketContext = createContext(null)

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef(null)

  useEffect(() => {
    // Solo crear UNA conexión de socket
    if (socketRef.current) return

    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001'

    const newSocket = io(socketUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
      transports: ["polling", "websocket"],
      path: "/socket.io/",
      withCredentials: true,
      autoConnect: true,
      upgrade: true,
      rememberUpgrade: true,
      forceNew: false,
      timeout: 20000,
    })

    newSocket.on("connect", () => {
      console.log("✅ Socket conectado - ID:", newSocket.id)
      newSocket.emit('join_dashboard')
      setIsConnected(true)
    })

    newSocket.on("disconnect", (reason) => {
      console.log("❌ Socket desconectado - Razón:", reason)
      setIsConnected(false)
    })

    newSocket.on("connect_error", (error) => {
      console.error("⚠️ Error de conexión Socket:", error.message)
    })

    newSocket.on("joined", (data) => {
      console.log("✅ Unido al room:", data)
    })

    socketRef.current = newSocket
    setSocket(newSocket)

    return () => {
      console.log("🔌 Limpiando conexión socket...")
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket debe ser usado dentro de SocketProvider')
  }
  return context
}
