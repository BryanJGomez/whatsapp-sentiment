import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { useEffect, useState } from "react"
import { useSocket } from "@/contexts/socket-context"

const COLORS = {
  positivo: "#10b981",
  neutro: "#94a3b8",
  negativo: "#f43f5e",
}

export function SentimentChart() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { socket, isConnected } = useSocket()

    // Cargar datos iniciales
  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
        const response = await fetch(`${apiUrl}/api/sentimientos`, {
          signal: controller.signal
        })
        const result = await response.json()

        if (result.code === "SUCCESS" && result.data) {
          // Mapear los datos del API al formato del gráfico
          const chartData = Object.entries(result.data).map(([key, value]) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value: value,
            color: COLORS[key] || COLORS.neutro,
          }))

          // Solo setear si hay datos válidos
          if (chartData.length > 0) {
            setData(chartData)
          } else {
            // Si no hay datos, setear valores por defecto en 0
            setData([
              { name: 'Positivo', value: 0, color: COLORS.positivo },
              { name: 'Negativo', value: 0, color: COLORS.negativo },
              { name: 'Neutro', value: 0, color: COLORS.neutro },
            ])
          }
        }
      } catch (error) {
        // En caso de error, setear valores por defecto
        setData([
          { name: 'Positivo', value: 0, color: COLORS.positivo },
          { name: 'Negativo', value: 0, color: COLORS.negativo },
          { name: 'Neutro', value: 0, color: COLORS.neutro },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

    // Escuchar actualizaciones por socket
  useEffect(() => {
    if (!socket || !isConnected) return

    const handleStatsUpdate = (stats) => {
      // Validar que distribucion_sentimientos sea un objeto válido
      if (stats.distribucion_sentimientos &&
        typeof stats.distribucion_sentimientos === 'object' &&
        !Array.isArray(stats.distribucion_sentimientos)) {

        const distribution = stats.distribucion_sentimientos
        const keys = Object.keys(distribution)

        // Solo actualizar si hay claves válidas (positivo, negativo, neutro)
        const validKeys = keys.filter(k => ['positivo', 'negativo', 'neutro'].includes(k))

        if (validKeys.length > 0) {
          const chartData = Object.entries(distribution)
            .filter(([key]) => ['positivo', 'negativo', 'neutro'].includes(key))
            .map(([key, value]) => ({
              name: key.charAt(0).toUpperCase() + key.slice(1),
              value: typeof value === 'number' ? value : 0,
              color: COLORS[key] || COLORS.neutro,
            }))
          setData(chartData)
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

    // Mostrar estado vacío solo si realmente no hay datos
  if (!data || data.length === 0) {
    return (
      <div className="h-80 w-full flex flex-col items-center justify-center text-muted-foreground">
        <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        <p className="text-sm">No hay datos de sentimientos aún</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Los datos aparecerán cuando se analicen mensajes</p>
      </div>
    )
  }

  // Verificar si todos los valores son 0
  const allZero = data.every(item => item.value === 0)

  return (
    <div className="h-80 w-full relative">
      {allZero && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <p className="text-sm text-muted-foreground/60">Sin datos de sentimientos</p>
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => value > 0 ? `${name}: ${value}%` : null}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} opacity={allZero ? 0.3 : 1} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background) / 0.8)",
              border: `1px solid hsl(var(--border))`,
              borderRadius: "0.5rem",
              color: "hsl(var(--foreground))",
            }}
            formatter={(value) => `${value}%`}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
              color: "hsl(var(--foreground))",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
