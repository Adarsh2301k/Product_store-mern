import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import CreatePage from './pages/CreatePage.jsx'
import HomePage from './pages/HomePage.jsx'
import Navbar from './commo/Navbar.jsx'
import { useColorModeValue } from '@/components/ui/color-mode'

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("yellow.500","grey.900")} >
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/create" element={<CreatePage/>}></Route>
      </Routes>
     
    </Box>
  )
}

export default App