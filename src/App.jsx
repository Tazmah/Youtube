import { Box } from "@mui/material"
import { Routes, Route } from "react-router-dom"


import { Feed, SearchFeed, ChannelDetail, VideoDetail } from "./components"
import Layout from "./Layout"

function App() {
  return (
    <Box sx={{ backgroundColor: "#000" }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Feed />
          } />
          <Route path="/video/:id" element={
            <VideoDetail />
          } />
          <Route path="/channel/:id" element={
            <ChannelDetail />
          } />
          <Route path="/search/:searchTerm" element={
            <SearchFeed />
          } />
        </Route>
      </Routes>
    </Box>
  )
}

export default App
