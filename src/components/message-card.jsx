// Función para formatear la fecha y hora de El Salvador
const formatTimestamp = (timestamp) => {
  if (!timestamp) return ""

  try {
    // MongoDB devuelve fechas en UTC, las convertimos a hora de El Salvador
    const date = new Date(timestamp)

    // Verificar si es una fecha válida
    if (isNaN(date.getTime())) return timestamp

    // Convertir manualmente a UTC-6 (El Salvador)
    const formatter = new Intl.DateTimeFormat('es-SV', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/El_Salvador'
    })

    return formatter.format(date)
  } catch {
    return timestamp
  }
}

export function MessageCard({ message }) {
  const sentimentColors = {
    positive: "bg-green-500/10 text-green-700 dark:text-green-400",
    positivo: "bg-green-500/10 text-green-700 dark:text-green-400",
    negative: "bg-red-500/10 text-red-700 dark:text-red-400",
    negativo: "bg-red-500/10 text-red-700 dark:text-red-400",
    neutral: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  }

  const topicColors = {
    Trabajo: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
    Familia: "bg-pink-500/10 text-pink-700 dark:text-pink-400",
    Viajes: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
    Deporte: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
    Tecnología: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
    "Servicio al Cliente": "bg-teal-500/10 text-teal-700 dark:text-teal-400",
    Otros: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
  }

  const sentiment = message?.sentiment || "neutral"
  const topic = message?.topic || "Otros"
  const text = message?.text || "Sin texto"
  const timestamp = message?.timestamp || ""

  const sentimentLabel = sentiment.charAt(0).toUpperCase() + sentiment.slice(1)

  return (
    <div className="border border-border rounded-lg p-4">
      <p className="text-foreground mb-3">{text}</p>
      <div className="flex gap-2 flex-wrap">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${sentimentColors[sentiment] || sentimentColors.neutral}`}>
          {sentimentLabel}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${topicColors[topic] || topicColors.Otros}`}
        >
          {topic}
        </span>
      </div>
      {timestamp && <p className="text-xs text-muted-foreground mt-2">{formatTimestamp(timestamp)}</p>}
    </div>
  )
}
