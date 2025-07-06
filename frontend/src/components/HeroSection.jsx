import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axiosInstance from '../utils/axios';
import { useAuth } from '@clerk/clerk-react';
import { useState } from 'react';
import UploadBox from './UploadBox';

const sampleImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=100&q=80', alt: 'Sample 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=100&q=80', alt: 'Sample 2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=100&q=80', alt: 'Sample 3' },
  { id: 4, src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&q=80', alt: 'Sample 4' },
  { id: 5, src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=100&q=80', alt: 'Sample 5' },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const { loadUserCredits } = useUserContext();
  const { getToken } = useAuth();

  const handleSampleClick = async (img) => {
    try {
      const token = await getToken();
      if (!token) throw new Error('Authentication token not available');
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
    <section className="w-full bg-white mt-32 mb-40">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 gap-8">
        {/* Left: Video + Heading */}
        <div className="flex-1 flex flex-col justify-center items-start text-left py-12">
          <div className="w-full max-w-xl rounded-xl overflow-hidden bg-slate-100 mb-6">
            <video
              className="w-full h-auto rounded-xl object-contain"
              autoPlay
              loop
              muted
              playsInline
              style={{ background: "#f1f5f9" }}
            >
              <source src="/home-page-banner.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4" style={{lineHeight: 1.1}}>
            Remove Image Background
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 font-medium">
            100% Automatically and{' '}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-base font-semibold bg-yellow-100 text-yellow-800">
              Free
            </span>
          </p>
        </div>

        {/* Right: Upload Card */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center border border-slate-100">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 