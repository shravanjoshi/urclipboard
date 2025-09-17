import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [clipId, setClipId] = useState('')
  const navigate = useNavigate()
    // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault()
    navigate(`/${clipId}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-6 w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-purple-700 mb-2">Find Your Clip or Create one</h1>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="clipid" className="text-lg font-medium text-gray-700">Clip ID:</label>
          <input
            type="text"
            id="clipid"
            name="clipid"
            value={clipId}
            onChange={(e) => setClipId(e.target.value)}
            className="border-2 border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg bg-gray-50"
            placeholder="Enter your clip ID..."
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition font-semibold w-full"
        >
          Go
        </button>
      </form>
    </div>
  )
}

export default Home
