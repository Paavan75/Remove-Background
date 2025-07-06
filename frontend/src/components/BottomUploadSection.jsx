import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import UploadBox from './UploadBox';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axiosInstance from '../utils/axios';
import { useAuth } from '@clerk/clerk-react';

const sampleImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=100&q=80', alt: 'Sample 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=100&q=80', alt: 'Sample 2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=100&q=80', alt: 'Sample 3' },
  { id: 4, src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&q=80', alt: 'Sample 4' },
  { id: 5, src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=100&q=80', alt: 'Sample 5' },
];

const BottomUploadSection = () => {
  const navigate = useNavigate();
  const { loadUserCredits } = useUserContext();
  const { getToken } = useAuth();

  const handleSampleClick = async (img) => {
    try {
      const token = await getToken();
      if (!token) throw new Error('Authentication token not available');
      // Fetch the image as a blob
      const res = await fetch(img.src);
      const blob = await res.blob();
      const file = new File([blob], 'sample.jpg', { type: blob.type });
      const formData = new FormData();
      formData.append('file', file);
      const response = await axiosInstance.post('/images/remove-background', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const processedBase64 = response.data;
      const originalUrl = img.src;
      const processedUrl = `data:image/png;base64,${processedBase64}`;
      navigate('/result', { state: { originalImage: originalUrl, processedImage: processedUrl } });
      loadUserCredits();
    } catch (err) {
      alert('Failed to process sample image.');
    }
  };

  return (
    <section className="w-full bg-white py-20 px-4 flex flex-col items-center justify-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-4">Remove Image Background</h2>
      <p className="text-lg text-slate-600 text-center mb-8">Get a transparent background for any image.</p>
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center border border-slate-100 mb-6">
        {/* Yellow accent */}
        <svg width="32" height="32" className="absolute -top-6 -right-6" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#FDE68A"/></svg>
        {/* UploadBox replaces the old upload UI */}
        <UploadBox />
        {/* Thumbnails */}
        <div className="w-full flex flex-col items-center mt-2">
          <p className="text-slate-500 text-sm mb-2">No image? Try one of these:</p>
          <div className="flex gap-3 mb-2">
            {sampleImages.map((img) => (
              <img
                key={img.id}
                src={img.src}
                alt={img.alt}
                className="w-12 h-12 rounded-lg object-cover border border-slate-200 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => handleSampleClick(img)}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-400 text-center max-w-xl mx-auto">
        By uploading an image or URL you agree to our <a href="#" className="underline">Terms of Service</a>. To learn more about how remove.bg handles your personal data, check our <a href="#" className="underline">Privacy Policy</a>.
      </p>
    </section>
  );
};

export default BottomUploadSection; 