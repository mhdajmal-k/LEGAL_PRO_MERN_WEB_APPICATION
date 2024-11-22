import React, { useEffect, useState } from 'react';
import { BlogListing } from '../BlogListing';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { IoMdClose } from 'react-icons/io';
import { crateBlog, fetchLawyerBlogs } from '../../services/store/features/lawyerServices';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store/store';
import CustomToast from '../userComponents/CustomToast';
import { toast } from 'sonner';
import { BlogType } from '../../utils/type/lawyerType';
import CommonPagination from '../Pagination'

const LawyerBlogListing = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    let [currentPage, setCurrentPage] = useState<number>(1);
    // const [totalPages, setTotalPages] = useState<number>(1);
    const [lawyerPerPage] = useState<number>(6);
    const dispatch: AppDispatch = useDispatch();
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const [formValues, setFormValues] = useState({
        mainTitle: "",
        category: "",
        mainText: "",

    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const handlePageChange = (page: number) => {

        setCurrentPage(page);
    };
    useEffect(() => {

        fetchBlogs();
    }, [dispatch, currentPage, lawyerPerPage]);
    const fetchBlogs = async () => {
        try {
            const response = await dispatch(fetchLawyerBlogs({
                currentPage,
                limit: lawyerPerPage,
            })).unwrap();

            setBlogs(response.result);
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };
    const handleRemoveImageIndia = () => {
        if (previewImage) {
            if (previewImage) URL.revokeObjectURL(previewImage);
        }
        setSelectedImage(null);
        setPreviewImage(null);
    };
    const handileCreate = async (onClose: () => void) => {
        try {
            const data = new FormData();
            data.append('title', formValues.mainTitle);
            data.append('category', formValues.category);
            data.append('content', formValues.mainText);
            if (selectedImage) {
                data.append('image', selectedImage);
            }

            const response = await dispatch(crateBlog(data)).unwrap();
            toast(<CustomToast message={response.message} type="success" />);
            setSelectedImage(null);
            setPreviewImage(null);
            fetchBlogs()
            onClose()

        } catch (error: any) {
            toast(<CustomToast message={error || error.message} type="error" />);
        }
    }

    return (
        <div className='p-4 min-h-screen bg-gray-100'>
            <h1 className='text-center font-semibold text-3xl m-6'>Your Blogs</h1>
            <div className='flex justify-end mr-6'>
                <Button onPress={onOpen} color='primary'>Create Blog</Button>
            </div>

            <BlogListing blogs={blogs} who='lawyer' />
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                className='max-w-4xl bg-white'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Create Your Own Blog</ModalHeader>
                            <ModalBody>
                                <div className='w-full m-4 flex gap-8 my-4'>
                                    <div className='w-1/2'>
                                        <label>Main Title</label>
                                        <Input
                                            className='my-2'
                                            placeholder="Enter your Blog Title"
                                            variant="bordered"
                                            name="mainTitle"
                                            value={formValues.mainTitle}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='w-2/3'>
                                        <label>Blog Category</label>
                                        <Input
                                            className='my-2'
                                            placeholder="Enter your Blog Category (e.g., Real Estate, Family Law)"
                                            variant="bordered"
                                            name="category"
                                            value={formValues.category}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className='m-4'>
                                    <input
                                        type='file'
                                        onChange={handleImageChange}
                                        accept='image/*'

                                    />
                                </div>
                                {previewImage && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={previewImage} alt='Selected' className='w-24 h-24 object-contain border' />
                                        <button onClick={handleRemoveImageIndia} className="mt-2 text-red-500 text-sm flex items-center space-x-1">
                                            <IoMdClose /> <span>Remove</span>
                                        </button>
                                    </div>
                                )}
                                <textarea
                                    placeholder="Write Down here About the Topic"
                                    minLength={100}
                                    className="w-[80%] border rounded bg-gray-300 p-5"
                                    name="mainText"
                                    value={formValues.mainText}
                                    onChange={handleInputChange}
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="warning" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="success"
                                    onPress={() => {
                                        handileCreate(onClose)
                                        console.log("Form Values:", formValues);

                                    }}
                                >
                                    Create
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {blogs.length > 0 && (
                <div className='mt-10 flex justify-center'>
                    <CommonPagination
                        totalPage={0}
                        initialPage={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
}

export default LawyerBlogListing;
