
import { useState, useRef } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export interface Prop {
    src: string;
    onChange: (newValue: { croppedImageUrl: string | null }) => void;
    onUpdate: (value: string) => void;
}

const CropPicker = ({ src, onChange, onUpdate }: Prop) => {
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 50,
        height: 50,
        x: 25,
        y: 25,
    });
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    if (completedCrop) onUpdate({ value: croppedImageUrl } as any)

    const onImageLoaded = (img: HTMLImageElement) => {
        imgRef.current = img;
    };

    const onCropComplete = (c: Crop) => {
        setCompletedCrop(c);
    };

    const onCropChange = (newCrop: Crop) => {
        setCrop(newCrop);
    };

    const getCroppedImg = () => {
        if (!imgRef.current || !completedCrop || !canvasRef.current) return;

        const image = imgRef.current;
        const canvas = canvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            canvas.width = crop.width * scaleX;
            canvas.height = crop.height * scaleY;

            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width * scaleX,
                crop.height * scaleY
            );

            try {
                const croppedImageUrl = canvas.toDataURL('image/jpeg');
                setCroppedImageUrl(croppedImageUrl);  // Store cropped image URL in state
                onChange({ croppedImageUrl: croppedImageUrl });

            } catch (error) {
                console.error("Error generating image URL:", error);
            }
        }
    };

    return (
        <>
            <ReactCrop
                crop={crop}
                onChange={onCropChange}
                onComplete={onCropComplete}
                aspect={16 / 9}
            >
                <img
                    ref={imgRef}
                    src={src}
                    onLoad={(e) => onImageLoaded(e.currentTarget as HTMLImageElement)}
                    crossOrigin="anonymous"
                    alt="Crop preview"
                />
            </ReactCrop>

            <div>
                <button onClick={getCroppedImg}>Crop Image</button>
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>

        </>
    );
};

export default CropPicker;
