import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/react";
import about from "../assets/images/SPECIALISE EXP.jpg";

export const BlogListing = () => {
    return (
        <div className="container p-4 min-h-screen bg-gray-100">
            <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
                {[...Array(5)].map((_, index) => (
                    <Card
                        key={index}
                        className="w-full  flex-row transition-transform hover:scale-100 shadow-lg rounded-lg overflow-hidden"
                    >
                        <CardHeader className="m-0 w-3/6 shrink-0 rounded-r-none overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                alt="card-image"
                                className="h-full w-full object-cover rounded-md"
                            />
                        </CardHeader>
                        <CardBody className="p-6">
                            <span className="text-base w-2/4 text-center   text-black-600 mb-4 mt-1 font-medium bg-gray-400 rounded-md ">
                                Real Estate
                            </span>
                            <h4 className="mb-2 text-blue-gray-700 text-lg font-bold">
                                Navigating Real Estate Transactions: A Legal Guide
                            </h4>
                            <p className="mb-8 text-gray-600 font-normal leading-relaxed">
                                Navigating real estate transactions in India involves understanding various legal rules, regulations, and procedures.
                            </p>
                            <a href="#" className="inline-block">
                                <Button className="flex items-center gap-2 transition-colors hover:bg-blue-500 bg-blue-600 text-white">
                                    Read More
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        className="h-4 w-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                        />
                                    </svg>
                                </Button>
                            </a>
                        </CardBody>
                        {/* <CardFooter className="p-4 border-t border-gray-200 flex items-center space-x-4">
                            <img src={about} alt="author-avatar" className="h-10 w-10 rounded-full" />
                            <div>
                                <h6 className="font-semibold text-gray-700">Ajmal</h6>
                                <h6 className="text-gray-400 text-sm">12/12/2024</h6>
                            </div>
                        </CardFooter> */}
                    </Card>
                ))}
            </div>
        </div>
    );
};
