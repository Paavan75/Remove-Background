import { useLocation, useNavigate } from 'react-router-dom';
import { SignedIn } from '@clerk/clerk-react';

const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = 400;

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalImage, processedImage } = location.state || {};

  console.log('Result page location.state:', location.state);

  if (!originalImage || !processedImage) {
    console.log('Missing images, redirecting to home.');
    // If no images, redirect to home
    navigate('/');
    return null;
  }

  const handleDownload = () => {
    // Create a temporary link to download the processed image
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'processed-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTryAnother = () => {
    navigate('/');
  };

  const imageStyle = {
    width: `${IMAGE_WIDTH}px`,
    height: `${IMAGE_HEIGHT}px`,
    objectFit: 'fill',
    borderRadius: '1rem',
    borderWidth: '4px',
    borderStyle: 'solid',
    background: '#f8fafc',
    boxShadow: '0 10px 40px 0 rgba(0,0,0,0.10)'
  };

  return (
    <SignedIn>
      <div className="min-h-screen flex items-center justify-center bg-slate-100 py-20">
        <div className="bg-white rounded-3xl shadow-2xl p-16 flex flex-col items-center w-full max-w-[2200px]">
          <div className="flex flex-col md:flex-row gap-24 items-center justify-center mb-16 w-full">
            <div className="flex flex-col items-center w-full">
              <h2 className="text-4xl font-extrabold mb-8">Original Image</h2>
              <img src={originalImage} alt="Original" style={{...imageStyle, borderColor: '#cbd5e1'}} />
            </div>
            <div className="flex flex-col items-center w-full">
              <h2 className="text-4xl font-extrabold mb-8">Processed Image</h2>
              <img src={processedImage} alt="Processed" style={{...imageStyle, borderColor: '#3b82f6'}} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-10 w-full justify-center">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-16 py-6 rounded-xl text-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Download Processed Image
            </button>
            <button
              onClick={handleTryAnother}
              className="bg-slate-200 text-slate-800 px-16 py-6 rounded-xl text-2xl font-bold hover:bg-slate-300 transition-colors shadow-lg border border-slate-300"
            >
              Try Another Image
            </button>
          </div>
        </div>
      </div>
    </SignedIn>
  );
};

export default Result; 