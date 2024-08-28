import { Flex, Textarea, Input, Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Radio, RadioGroup, ModalFooter, useToast} from "@chakra-ui/react"
import { BiAddToQueue } from "react-icons/bi"
import { useState } from "react"
import { BASE_URL } from "../App"

const CreateUserModal = ({ setUsers }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({
        name: "",
        role: "",
        description: "",
        gender: ""
    })

    const toast = useToast()

    const handleCreateUser = async(e) => {

        e.preventDefault() // prevent page refresh
        setIsLoading(true)

        try {
        
            const resp = await fetch(BASE_URL + "/friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs)
            })

            const data = await resp.json()

            if(!resp.ok){
                throw new Error(data.error)
            }
            toast({

                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: "top"
            })
            onClose()
            setUsers((prevUsers) => [...prevUsers, data]) // With this function you don t need to reload the page to see the new users

            setInputs({
                name: "",
                role: "",
                description: "",
                gender: ""
            })

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
        } 
        finally {
            setIsLoading(false)
           
        } //clear inputs
    }

    return (
        
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20}/>
            </Button>

            <Modal
            isOpen={isOpen}
            onClose={onClose}>
                <ModalOverlay />
                {/* <form onSubmit={() => alert("User created")}> */}
                <form onSubmit={handleCreateUser}>
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
                                        onChange={(e) => setInputs({...inputs, name: e.target.value})}/>
                                    </FormControl>

                                    {/* "Right side" */}
                                    <FormControl>
                                        <FormLabel>Role</FormLabel>
                                        <Input placeholder="QA"
                                        value={inputs.role}
                                        onChange={(e) => setInputs({...inputs, role: e.target.value})}/>
                                    </FormControl>
                                    </Flex>

                                    <FormControl mt={4}>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        placeholder="He's a software engineer who loves to code and build things."
                                        value={inputs.description}
                                        onChange={(e) => setInputs({...inputs, description: e.target.value})}/>
                                    </FormControl>

                                    <RadioGroup mt={4}>
                                    <Flex gap={5}>
                                        <Radio
                                            value='male'
                                            onChange={(e) => setInputs({...inputs, gender: e.target.value})}
                                        >
                                            Male
                                        </Radio>
                                        <Radio
                                            value='female'
                                            onChange={(e) => setInputs({...inputs, gender: e.target.value})}
                                        >
                                            Female
                                        </Radio>
                                    </Flex>
                                </RadioGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>
                                    Add
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default CreateUserModal