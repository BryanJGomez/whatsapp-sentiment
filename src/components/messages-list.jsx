import { MessageCard } from "./message-card"
import { useEffect, useState } from "react"
import { useSocket } from "@/contexts/socket-context"

// Función para mapear los datos del API al formato del componente
const mapApiMessageToComponent = (apiMessage) => {
  return {
    id: apiMessage._id || apiMessage.message_sid,
    text: apiMessage.resumen || apiMessage.texto_mensaje || apiMessage.text || "Sin texto",
    sentiment: apiMessage.sentimiento || apiMessage.sentiment || "neutral",
    topic: apiMessage.tema || apiMessage.topic || "Otros",
    timestamp: apiMessage.timestamp || apiMessage.analizado_en || "Hace un momento",
  }
}

export function MessagesList() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { socket, isConnected } = useSocket()

  // Cargar mensajes iniciales desde el API
  useEffect(() => {
    const controller = new AbortController()

    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
        const response = await fetch(`${apiUrl}/api/mensajes-recientes`, {
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error('Error al cargar mensajes')
        }

        const data = await response.json()

        // Verificar si la data es un array o viene en una propiedad
        let messagesArray = []
        if (Array.isArray(data)) {
          messagesArray = data
        } else if (data.mensajes && Array.isArray(data.mensajes)) {
          messagesArray = data.mensajes
        } else if (data.data && Array.isArray(data.data)) {
          messagesArray = data.data
        } else {
          messagesArray = []
        }

        // Mapear los mensajes del API al formato del componente
        const mappedMessages = messagesArray.map(mapApiMessageToComponent)

        setMessages(mappedMessages)
        setError(null)
      } catch (err) {
        setError(err.message)
        setMessages([]) // Asegurar que sea array vacío en caso de error
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [])

  // Escuchar mensajes analizados por socket (solo cuando ya tienen análisis completo)
  useEffect(() => {
    if (!socket || !isConnected) return

    const handleMessageAnalyzed = (analysisData) => {

      const analyzedMessage = mapApiMessageToComponent({
        _id: analysisData.message_id,
        resumen: analysisData.resumen,
        sentimiento: analysisData.sentimiento,
        tema: analysisData.tema,
        timestamp: "Hace un momento",
      })

      setMessages((prev) => [analyzedMessage, ...prev.slice(0, 9)])
    }

    socket.on("message_analyzed", handleMessageAnalyzed)

    return () => {
      socket.off("message_analyzed", handleMessageAnalyzed)
    }
  }, [socket, isConnected])

  if (isLoading) {
    return (
      <div className="space-y-3 max-h-96 overflow-y-auto pr-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Cargando mensajes...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-3 max-h-96 overflow-y-auto pr-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-destructive">Error: {error}</div>
        </div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="space-y-3 max-h-96 overflow-y-auto pr-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">No hay mensajes disponibles</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto pr-4">
      {Array.isArray(messages) && messages.map((message, index) => (
        <MessageCard key={message.id || index} message={message} />
      ))}
    </div>
  )
}
