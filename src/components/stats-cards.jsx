import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useSocket } from "@/contexts/socket-context"

export function StatsCards() {
  const [stats, setStats] = useState({
    total_mensajes: 0,
    sentimiento_positivo: 0,
    sentimiento_negativo: 0,
    tema_principal: "...",
  })
  const [isLoading, setIsLoading] = useState(true)
  const { socket, isConnected } = useSocket()

  // Cargar estadísticas iniciales
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
        const response = await fetch(`${apiUrl}/api/estadisticas`)
        const result = await response.json()

        if (result.code === "SUCCESS" && result.data) {
          setStats(result.data)
        }
      } catch (error) {
        // Error fetching stats
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Escuchar actualizaciones por socket
  useEffect(() => {
    if (!socket || !isConnected) return

    const handleStatsUpdate = (updatedStats) => {
      // Actualizar las estadísticas si vienen en el payload
      if (updatedStats && typeof updatedStats === 'object') {
        setStats(prevStats => ({
          total_mensajes: updatedStats.total_mensajes !== undefined ? updatedStats.total_mensajes : prevStats.total_mensajes,
          sentimiento_positivo: updatedStats.sentimiento_positivo !== undefined ? updatedStats.sentimiento_positivo : prevStats.sentimiento_positivo,
          sentimiento_negativo: updatedStats.sentimiento_negativo !== undefined ? updatedStats.sentimiento_negativo : prevStats.sentimiento_negativo,
          tema_principal: updatedStats.tema_principal !== undefined ? updatedStats.tema_principal : prevStats.tema_principal,
        }))
      }
    }

    socket.on("stats_updated", handleStatsUpdate)

    return () => {
      socket.off("stats_updated", handleStatsUpdate)
    }
  }, [socket, isConnected])

  const statCards = [
    {
      label: "Total de Mensajes",
      value: stats.total_mensajes?.toString() || "0",
      icon: "💬",
      color: "from-blue-500/10 to-blue-500/5",
    },
    {
      label: "Sentimiento Positivo",
      value: `${stats.sentimiento_positivo || 0}%`,
      icon: "😊",
      color: "from-emerald-500/10 to-emerald-500/5",
    },
    {
      label: "Sentimiento Negativo",
      value: `${stats.sentimiento_negativo || 0}%`,
      icon: "😞",
      color: "from-red-500/10 to-red-500/5",
    },
    {
      label: "Tema Principal",
      value: stats.tema_principal || "...",
      icon: "📊",
      color: "from-purple-500/10 to-purple-500/5",
    },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-border/40">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-8 bg-muted rounded animate-pulse w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="border-border/40">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
