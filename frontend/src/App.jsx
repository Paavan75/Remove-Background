import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menubar from './components/Menubar';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Result from './pages/Result';
import Footer from './components/Footer';
import { ClerkProvider } from '@clerk/clerk-react';
import { UserProvider } from './context/UserContext';
import UserSyncHandler from './components/UserSyncHandler';

// Access environment variable using import.meta.env for Vite projects
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  if (!clerkPubKey) {
    throw new Error("Missing Publishable Key. Check your .env.local file and ensure VITE_CLERK_PUBLISHABLE_KEY is set.");
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <UserProvider>
        <UserSyncHandler />
        <Router>
          <div className="flex flex-col min-h-screen">
            <Menubar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/result" element={<Result />} />
                {/* Login and Signup routes will be handled by Clerk */}
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/signup" element={<Signup />} /> */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </ClerkProvider>
  );
}

export default App;
