// CustomToast.tsx
import React from 'react';

interface CustomToastProps {
    message: string;
    type: 'success' | 'error';
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type }) => {

    const icon = type === 'success' ? '✅' : '❌';

    return (
        <div style={{
            padding: '5px',
            color: '#black',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
        }}>
            <span style={{ marginRight: '8px' }}>{icon}</span>
            <strong >{message}</strong>
        </div>
    );
};

export default CustomToast;
