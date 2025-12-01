import { ThemeProvider } from '@/components/theme-provider'
import { SentimentDashboard } from '@/components/sentiment-dashboard'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="sentiment-dashboard-theme">
      <main className="min-h-screen bg-background">
        <SentimentDashboard />
      </main>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
