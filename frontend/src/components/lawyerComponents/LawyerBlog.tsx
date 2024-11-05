import React from 'react'
import { BlogListing } from '../BlogListing'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";

const LawyerBlogListing = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (

        <div className='p-4 min-h-screen bg-gray-100'>
            <h1 className='text-center font-semibold text-3xl m-6'>Your Blogs</h1>
            <div className='flex justify-end  mr-6'>
                <Button onPress={onOpen} color='primary'>Crate Blog</Button>
            </div>

            <BlogListing />
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                className='max-w-4xl bg-white'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Create Your On Blog</ModalHeader>
                            <ModalBody>
                                <div className='w-full m-4 flex gap-8 my-4'>
                                    <div className='w-1/2 '>
                                        <label>
                                            Main Title
                                        </label>
                                        <Input
                                            className='my-2'
                                            placeholder="Enter your Blog Title"
                                            variant="bordered"
                                        />
                                    </div>
                                    <div className='w-2/3 '>
                                        <label>
                                            Blog Category
                                        </label>
                                        <Input
                                            className='my-2'
                                            placeholder="Enter your  Blog Category(Real Estate,Family Law)"
                                            variant="bordered"

                                        />
                                    </div>


                                </div>
                                <div className='m-4'>
                                    <input type='file'></input>

                                </div>
                                <div className='flex flex-col  m-4 h-full'>
                                    <label className='mb-5'>Main Text</label>
                                    <textarea placeholder='Write Down here About the Topic  ' minLength={100}
                                        maxLength={1000} className=' w-[80%] border rounded bg-gray-300 p-5    ' />
                                </div>



                            </ModalBody>
                            <ModalFooter>
                                <Button color="warning" variant="flat" onPress={onClose}>
                                    close
                                </Button>
                                <Button color="success" onPress={onClose}>
                                    Create                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default LawyerBlogListing