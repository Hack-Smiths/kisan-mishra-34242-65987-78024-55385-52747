import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import { getProfile } from "@/lib/storage";
import { useState } from "react";
import { ChatPopup } from "./components/ChatPopup";
import { BottomNav } from "./components/BottomNav";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Diagnosis from "./pages/Diagnosis";
import Market from "./pages/MarketNew";
import Schemes from "./pages/Schemes";
import History from "./pages/History";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { Navbar } from "./components/Navbar";
import { TopNavbar } from "./components/TopNavbar";
import SupportHistory from "./pages/SupportHistory";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const profile = getProfile();
  if (!profile) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const ProtectedLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (file: File) => {
    navigate('/diagnosis', { state: { file } });
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <TopNavbar />
      <div className="flex flex-1 overflow-hidden">
        <Navbar />
        <div className="flex-1 relative pb-20 lg:pb-0 overflow-auto">
          <Outlet />
        
        {/* Bottom Navigation - Mobile/Tablet */}
        <BottomNav 
          onVoiceClick={() => setIsChatOpen(true)}
          hasMessages={false}
        />
        
        <ChatPopup
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onImageUpload={handleImageUpload}
        />
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route element={<ProtectedRoute><ProtectedLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/diagnosis" element={<Diagnosis />} />
            <Route path="/market" element={<Market />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/history" element={<History />} />
            <Route path="/help" element={<Help />} />
            <Route path="/support-history" element={<SupportHistory />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
