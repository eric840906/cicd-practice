import dotenv from 'dotenv'
import app from './app'

dotenv.config()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}, beep!`)
  console.log(`📝 API available at http://localhost:${PORT}/api`)
  console.log(`❤️  Health check at http://localhost:${PORT}/health`)
})
