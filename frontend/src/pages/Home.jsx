import HeroSection from '../components/HeroSection';
import QualitySliderSection from '../components/QualitySliderSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BottomUploadSection from '../components/BottomUploadSection';
import UploadBox from '../components/UploadBox';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <QualitySliderSection />
      <TestimonialsSection />
      <BottomUploadSection />

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Why Choose Our Service?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-blue-500 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-slate-500">Get your images processed in seconds</p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-500 text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">High Quality</h3>
              <p className="text-slate-500">Professional-grade background removal</p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-500 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure</h3>
              <p className="text-slate-500">Your images are automatically deleted</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 