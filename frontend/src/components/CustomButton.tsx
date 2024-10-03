import { Button } from '@nextui-org/react'
import React from 'react'


interface CustomButtonProps {
    text: string;
    isLoading?: boolean;
    disabled?: boolean;

}

const CustomButton: React.FC<CustomButtonProps> = ({ text, isLoading = false, disabled = false }) => {
    return (
        <div>
            <Button
                color="primary"
                type="submit"
                className="w-full text-white font-semibold"
                isLoading={isLoading}
                disabled={disabled}

            >
                {text}
            </Button>
        </div>
    )
}

export default CustomButton;
