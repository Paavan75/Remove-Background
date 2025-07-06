const ImagePreview = ({ originalImage, processedImage }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-900 text-center">
        Preview
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Original Image */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-700">Original</h3>
          <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
            <img
              src={originalImage}
              alt="Original"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Processed Image */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-700">Processed</h3>
          <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
            {processedImage ? (
              <img
                src={processedImage}
                alt="Processed"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                Processing...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Download Button */}
      {processedImage && (
        <div className="text-center">
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            onClick={() => {
              const link = document.createElement('a');
              link.href = processedImage;
              link.download = 'processed-image.png';
              link.click();
            }}
          >
            Download Processed Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImagePreview; 