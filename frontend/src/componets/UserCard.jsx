import { CardHeader, Card, Flex, Avatar, Text, Box, Heading, IconButton, CardBody, useToast } from "@chakra-ui/react"
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

const UserCard = ({ user, setUsers }) => {

    // const mockUser = {
        
    //     description: "Test",
    //     id: 7,
    //     name: "Johnm",
    //     role: "QA"
    // };

    const toast = useToast()
    const handleDeleteUser = async () => {

        try {

            const resp = await fetch(BASE_URL + "/friends/" + user.id, {
                method: "DELETE",
            })


            if(!resp.ok){
                throw new Error(data.error)
            }
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id)) // filter the user that we are deleting

            toast({

                title: 'User deleted.',
                description: `We've deleted the user id ${user.id} for you.`,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: "top-center"
            })

        } catch (error) {
            console.error(error)
            toast({

                title: 'An error occurred.',
                description: error.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: "top-center"
            })
        }
    }

    return (
        <Card>
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                        <Avatar src={user.imgUrl} />

                        <Box>
                            <Heading size='sm'>{user.name}</Heading>
                            <Text>{user.role}</Text>    
                        </Box>
                    </Flex>

                    <Flex>
                        <EditModal user={user} setUsers={setUsers}/>
                        
                        <IconButton
							variant='ghost'
							colorScheme='red'
							size={"sm"}
							aria-label='See menu'
							icon={<BiTrash size={20} />}
							onClick={handleDeleteUser}
						/>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                    {user.description}
                </Text>
            </CardBody>
        </Card>
    )
}
export default UserCard