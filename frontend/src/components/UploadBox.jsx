import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import axiosInstance from '../utils/axios';
import { useUserContext } from '../context/UserContext';
import { useDropzone } from 'react-dropzone';

const UploadBox = ({ onImageUpload }) => {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { loadUserCredits } = useUserContext();
  const { getToken } = useAuth();
  const fileInputRef = useRef();

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploading(true);
      try {
        const token = await getToken();
        if (!token) throw new Error('Authentication token not available');
        const formData = new FormData();
        formData.append('file', file);

        const response = await axiosInstance.post('/images/remove-background', 
          formData,
          { 
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            } 
          }
        );

        const processedBase64 = response.data;
        const originalUrl = URL.createObjectURL(file);
        const processedUrl = `data:image/png;base64,${processedBase64}`;
        navigate('/result', { state: { originalImage: originalUrl, processedImage: processedUrl } });
        loadUserCredits();
      } catch (err) {
        alert('Image upload or processing failed: ' + (err.response?.data || err.message));
      } finally {
        setUploading(false);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1
  });

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        {...getRootProps()}
        className={`w-full border-2 border-dashed rounded-xl p-8 text-center mb-4 transition-colors duration-200 cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white hover:border-blue-500 hover:bg-blue-50'}`}
        style={{ minHeight: 120 }}
      >
        <input {...getInputProps()} ref={fileInputRef} />
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-xl font-medium text-slate-900 mb-2">
            {isDragActive ? 'Drop your image here...' : 'Drag & drop your image here'}
          </div>
          <div className="text-slate-500 text-sm">Supports: PNG, JPG, JPEG, GIF</div>
        </div>
      </div>
      <button
        type="button"
        className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-full px-10 py-4 mb-4 shadow-lg transition-colors duration-200"
        onClick={handleButtonClick}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
};

export default UploadBox; 