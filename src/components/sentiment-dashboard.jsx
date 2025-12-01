import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SentimentChart } from "./sentiment-chart"
import { TopicsChart } from "./topics-chart"
import { MessagesList } from "./messages-list"
import { StatsCards } from "./stats-cards"
import { ThemeToggle } from "./theme-toggle"
import { useSocket } from "@/contexts/socket-context"
import { useEffect, useState } from "react"

export function SentimentDashboard() {
  const { socket, isConnected } = useSocket()
  const [connectionStatus, setConnectionStatus] = useState("Desconectado")

  useEffect(() => {
    if (isConnected) {
      setConnectionStatus("Conectado en tiempo real")
    } else {
      setConnectionStatus("Desconectado")
    }
  }, [isConnected])

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header with theme toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">WhatsApp Sentiment Analysis</h1>
          <p className="text-muted-foreground">Análisis de sentimientos en tiempo real de tus mensajes</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-sm font-medium text-muted-foreground">{connectionStatus}</span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pie Chart - Sentiments */}
        <div className="lg:col-span-1">
          <Card className="h-full border-border/40">
            <CardHeader>
              <CardTitle className="text-lg">Distribución de Sentimientos</CardTitle>
              <CardDescription>Última semana</CardDescription>
            </CardHeader>
            <CardContent>
              <SentimentChart />
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart - Topics */}
        <div className="lg:col-span-2">
          <Card className="h-full border-border/40">
            <CardHeader>
              <CardTitle className="text-lg">Temas Más Mencionados</CardTitle>
              <CardDescription>Frecuencia de temas en conversaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <TopicsChart />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Messages List */}
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="text-lg">Mensajes Recientes</CardTitle>
          <CardDescription>Los últimos 10 mensajes analizados</CardDescription>
        </CardHeader>
        <CardContent>
          <MessagesList />
        </CardContent>
      </Card>
    </div>
  )
}
