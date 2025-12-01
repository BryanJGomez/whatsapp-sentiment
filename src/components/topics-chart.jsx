import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { useSocket } from "@/contexts/socket-context"
import axios from 'axios'
import apiClient from '@/lib/axios'

export function TopicsChart() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { socket, isConnected } = useSocket()

  // Cargar datos iniciales
  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
        const response = await fetch(`${apiUrl}/api/temas`, {
          signal: controller.signal
        })
        const result = await response.json()

        if (result.code === "SUCCESS" && result.data) {
          // Mapear los datos del API al formato del gráfico
          const chartData = result.data.map(item => ({
            name: item.tema || item.name,
            value: item.cantidad || item.count || item.value,
          }))
        setData(chartData)
      }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch temas cancelado (StrictMode cleanup)')
          return
        }
        // Error fetching topics
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [])    // Escuchar actualizaciones por socket
  useEffect(() => {
    if (!socket || !isConnected) return

    const handleStatsUpdate = (stats) => {
      // Validar que temas_frecuentes sea un array válido
      if (stats.temas_frecuentes && Array.isArray(stats.temas_frecuentes)) {
        // Solo actualizar si hay datos, no borrar si llega vacío
        if (stats.temas_frecuentes.length > 0) {
          const chartData = stats.temas_frecuentes.map(item => ({
            name: item.tema || item.name || 'Sin tema',
            value: item.cantidad || item.count || item.value || 0,
          }))
          setData(chartData)
        } else {
          // NO reseteamos, mantenemos los datos anteriores
        }
      }
    }

    socket.on("stats_updated", handleStatsUpdate)

    return () => {
      socket.off("stats_updated", handleStatsUpdate)
    }
  }, [socket, isConnected])

  if (isLoading) {
    return <div className="h-80 w-full flex items-center justify-center text-muted-foreground">Cargando...</div>
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-80 w-full flex flex-col items-center justify-center text-muted-foreground">
        <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-sm">No hay temas registrados aún</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Los temas aparecerán cuando se analicen mensajes</p>
      </div>
    )
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
          <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background) / 0.8)",
              border: `1px solid hsl(var(--border))`,
              borderRadius: "0.5rem",
              color: "hsl(var(--foreground))",
            }}
          />
          <Bar dataKey="value" fill="oklch(0.696 0.17 162.48)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
