import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SebaranRusunMap from "./pages/SebaranRusunMap";
import PenerimaBSPSMap from "./pages/PenerimaBSPSMap";
import BankDesain from "./pages/BankDesain";
import SosialisasiKlinikPKP from "./pages/SosialisasiKlinikPKP";
import PenerimaanBSPS from "./pages/PenerimaanBSPS";
import Login from "./pages/Login";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/peta/sebaran-rusun/:region" element={<SebaranRusunMap />} />
          <Route path="/peta/kawasan-kumuh/:region" element={<SebaranRusunMap />} />
          <Route path="/peta/penerima-bsps/:region" element={<PenerimaBSPSMap />} />
          <Route path="/bank-desain" element={<BankDesain />} />
          <Route path="/sosialisasi-klinik-pkp" element={<SosialisasiKlinikPKP />} />
          <Route path="/penerimaan-bsps" element={<PenerimaanBSPS />} />
          <Route path="/login" element={<Login />} />
          <Route path="/klinik" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
