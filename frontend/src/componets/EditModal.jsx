import { Flex, Textarea, Input, Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Radio, RadioGroup, ModalFooter, IconButton, useToast} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { BiAddToQueue, BiEditAlt } from "react-icons/bi"
import { BASE_URL } from "../App"

{/* <Button onClick={onOpen}>
            {/* <BiEditAlt size={20}/> */}
        // </Button> */}
        
const EditModal = ({ setUsers, user}) => { 

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null);
    const [inputs, setInputs] = useState({
		name: "",
		role: "",
		description: "",
	});

    useEffect(() => {
        if (user && user.name && user.role && user.description) {
            setInputs({
                name: user.name ,
                role: user.role ,
                description: user.description
            });
        }
    }, [user]);

    const mockUser = {
        
        description: "Test",
        id: 7,
        name: "Johnm",
        role: "QA"
    };

    // Use mockUser if user prop is not provided
    user = user || mockUser;
    // user = mockUser

    const toast = useToast()
    const handleEditUser = async (e) => {
        
        e.preventDefault()
        console.log("User data received in EditModal:", user);
        if (!user || !user.id) {
            toast({
                title: 'User data is not available.',
                description: 'Cannot edit user because the user data is missing.',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        setIsLoading(true)
        try {
        
            const resp = await fetch(BASE_URL + "/friends/" + user.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs)
            })

            const data = await resp.json()

            if(!resp.ok){
                throw new Error(data.error)
            }
            
            setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? data : u))); // With this function we search for the user we edited and display it
            toast({

                title: 'Account edited.',
                description: `We've edited the acount with the id ${user.id} for you.`,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: "top"
            })
            onClose()
            
        } catch(error) {
            console.error(error)
            toast({

                title: 'An error occurred.',
                description: error.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: "top-center"
            })
        } finally {
            setIsLoading(false)
        }
        if (!user) return null; // Prevent rendering if user is not defined
    }




    return (
        <>
            <Button
                onClick={onOpen}
                variant='ghost'
                colorScheme='blue'
                aria-label='See menu'
                size={"sm"}
                leftIcon={<BiEditAlt size={20} />}
                >
                Edit
            </Button>
        {/* <IconButton
				onClick={onOpen}
				variant='ghost'
				colorScheme='blue'
				aria-label='See menu'
				size={"sm"}
				icon={<BiEditAlt size={20} />}
			/> */}

            <Modal
            isOpen={isOpen}
            onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleEditUser}>
                    <ModalContent>
                        <ModalHeader> My Bff </ModalHeader>
                        <ModalCloseButton />

                            <ModalBody pb={6}>

                                <Flex alignItems={"center"} gap={4}>

                                    {/* Left side */}
                                    <FormControl>
                                        <FormLabel>Full Name</FormLabel>
                                        <Input placeholder="John Doe"
                                        value={inputs.name}
                                        onChange={(e) => setInputs((prev) => ({ ...prev, name: e.target.value }))}
                                    />
                                    </FormControl>

                                    {/* "Right side" */}
                                    <FormControl>
                                        <FormLabel>Role</FormLabel>
                                        <Input placeholder="QA"
                                        value={inputs.role}
                                        onChange={(e) => setInputs((prev) => ({ ...prev, role: e.target.value }))}
                                    />
                                    </FormControl>
                                    </Flex>

                                    <FormControl mt={4}>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        placeholder="He's a software engineer who loves to code and build things."
                                        value={inputs.description}
                                        onChange={(e) => setInputs((prev) => ({ ...prev, description: e.target.value }))}
                                    />
                                    </FormControl>

                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3}
                                type="submit"
                                isLoading={isLoading}>
                                    Update
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default EditModal