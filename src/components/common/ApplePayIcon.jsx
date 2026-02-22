import React from 'react';

const ApplePayIcon = ({ className }) => {
    return (
        <div className={`relative flex items-center justify-center p-[15%] rounded-[28%] bg-adorix-primary ${className}`}>
            <div className="w-full h-full bg-black rounded-[25%] flex items-center justify-center p-[20%]">
                <svg viewBox="0 0 170 170" fill="white" className="w-full h-full transform scale-110">
                    <path d="M150.37,130.25c-2.45,5.66-5.35,10.87-8.71,15.66c-8.58,12.23-14.67,20.88-26.76,21.06c-11.28,0.19-15.03-6.5-27.79-6.31c-12.76,0.18-17.15,6.51-27.79,6.31c-10.65-0.19-17.5-9.61-26.77-22.95C12.46,114.2,1.35,82.16,11.53,60.83c5.07-10.6,15.91-17.3,27.76-17.48c10.89-0.18,21.16,7.34,27.79,7.34c6.64,0,19.16-9.15,32.18-7.85c5.44,0.54,20.73,2.5,30.54,16.85c-0.79,0.49-18.15,10.61-18.15,31.25c0,25.2,21.85,34.02,22.1,34.12C153.51,124.93,151.7,127.1,150.37,130.25z M119.11,29.99c-5.83,7.05-15.54,12.51-24.94,11.73c-1.28-9.4,3.7-19.37,9.52-26.43c5.84-7.05,15.93-12.72,24.89-11.89C130.01,13.2,124.94,22.94,119.11,29.99z" />
                </svg>
            </div>
        </div>
    );
};

export default ApplePayIcon;
