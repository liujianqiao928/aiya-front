import React, { useState, useRef } from 'react';

function SliderCaptcha({ onVerify }) {
    const [positionX, setPositionX] = useState(0);
    const sliderRef = useRef(null);
    const handleRef = useRef(null);
    const [isVerified, setIsVerified] = useState(false);

    const startDrag = (e) => {
        const startX = e.clientX;
        const handleWidth = handleRef.current.offsetWidth;
        const sliderWidth = sliderRef.current.offsetWidth;

        const onDragging = (moveEvent) => {
            let moveX = moveEvent.clientX - startX + handleWidth / 2;
            moveX = Math.max(0, moveX); // Prevent dragging out of bounds
            moveX = Math.min(sliderWidth - handleWidth, moveX); // Prevent dragging too far right
            setPositionX(moveX);

            // Check if the handle has reached the end of the slider
            if (moveX >= sliderWidth - handleWidth) {
                setIsVerified(true);
                onVerify(true);
                document.removeEventListener('mousemove', onDragging);
                document.removeEventListener('mouseup', stopDrag);
            } else {
                setIsVerified(false);
                onVerify(false);
            }
        };

        const stopDrag = () => {
            document.removeEventListener('mousemove', onDragging);
            document.removeEventListener('mouseup', stopDrag);
            if (!isVerified) {
                setPositionX(0); // Reset if not fully dragged
            }
        };

        document.addEventListener('mousemove', onDragging);
        document.addEventListener('mouseup', stopDrag);
    };

    return (
        <div className="w-full max-w-xs select-none mt-4">
            <div ref={sliderRef} className="w-full h-12 bg-gray-300 relative">
                <div
                    ref={handleRef}
                    className={`w-12 h-12 cursor-pointer absolute ${isVerified ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ left: `${positionX}px` }}
                    onMouseDown={startDrag}
                />
            </div>
            {isVerified && <p className="text-green-500 text-sm mt-2">验证成功!</p>}
        </div>
    );
}

export default SliderCaptcha;
