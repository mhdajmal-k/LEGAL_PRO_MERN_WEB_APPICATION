import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
// import { CgProfile } from "react-icons/cg";

interface DashboardCardProps {
    title: string;
    value: number;
    description: string;
    icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, description, icon }) => {
    return (
        <Card className="bg-primary -full mb-4">
            <CardHeader className="flex items-center gap-2">
                {icon}
                <h4 className="text-lg text-white font-semibold">{title}</h4>
            </CardHeader>
            <CardBody className="text-2xl font-bold text-center text-white">{value}</CardBody>
            <CardFooter className="text-sm text-white">{description}</CardFooter>
        </Card>
    );
};
export default DashboardCard