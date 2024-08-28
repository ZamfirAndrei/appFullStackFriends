import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { Button, Container, Stack, Text } from '@chakra-ui/react'
import Navbar from './componets/Navbar'
import UserGrid from './componets/UserGrid'

export const BASE_URL = "http://127.0.0.1:5000/api"

function App() {

  const [users, setUsers] = useState([])

  return (
    
    <Stack minH={"100vh"}>
      <Navbar setUsers={setUsers} />
      
      <Container maxH={"1200px"} my={4}>    
        <Text
					fontSize={{ base: "3xl", md: "50" }}
					fontWeight={"bold"}
					letterSpacing={"2px"}
					textTransform={"uppercase"}
					textAlign={"center"}
					mb={8}
				>
					<Text as={"span"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}>
						My Bestie 
					</Text>
					🚀
          <Text>
            Patratel is my bestie
          </Text>
				</Text>
        <UserGrid users={users} setUsers={setUsers}/>
      </Container>
    </Stack>
  )
}

export default App
