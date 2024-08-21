import { Flex, Textarea, Input, Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Radio, RadioGroup, ModalFooter} from "@chakra-ui/react"
import { BiAddToQueue } from "react-icons/bi"

const EditModal = () => { 

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
        <Button onClick={onOpen}>
            <BiAddToQueue size={20}/>
        </Button>

        <Modal
        isOpen={isOpen}
        onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader> My Bff </ModalHeader>
                <ModalCloseButton />

                    <ModalBody pb={6}>

                        <Flex alignItems={"center"} gap={4}>

                            {/* Left side */}
                            <FormControl>
                                <FormLabel>Full Name</FormLabel>
                                <Input placeholder="John Doe"/>
                            </FormControl>

                            {/* "Right side" */}
                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input placeholder="QA"/>
                            </FormControl>
                            </Flex>

                            <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder="He's a software engineer who loves to code and build things."
                            />
                            </FormControl>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Add
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    )
}

export default EditModal