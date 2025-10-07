import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Camera, Upload, Loader2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DiagnosisCard } from '@/components/DiagnosisCard';
import { DiagnosisResult } from '@/lib/types';
import { saveToHistory } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import earlyBlightImg from '@/assets/early-blight.jpg';
import yellowLeafSpotImg from '@/assets/yellow-leaf-spot.jpg';

const POPULAR_CROPS = [
  'Tomato', 'Paddy', 'Maize', 'Banana', 'Coconut', 'Cotton', 
  'Wheat', 'Potato', 'Chilli', 'Onion', 'Sugarcane', 'Mango'
];

// Sample diagnosis data for demo
const SAMPLE_DIAGNOSES: Record<string, DiagnosisResult> = {
  'Tomato': {
    disease: 'Early Blight',
    scientific: 'Alternaria solani',
    confidence: 0.89,
    status: 'high',
    advice: [
      'Remove and destroy infected leaves immediately',
      'Apply copper-based fungicide every 7-10 days',
      'Ensure proper spacing between plants for air circulation',
      'Avoid overhead watering to reduce leaf wetness'
    ],
    timestamp: new Date().toISOString(),
    image: earlyBlightImg
  },
  'Banana': {
    disease: 'Yellow Leaf Spot',
    scientific: 'Mycosphaerella musicola',
    confidence: 0.76,
    status: 'medium',
    advice: [
      'Remove affected leaves to prevent spread',
      'Improve drainage and reduce overhead watering',
      'Apply potassium-rich fertilizer to strengthen plants',
      'Use fungicide if infection is severe'
    ],
    timestamp: new Date().toISOString(),
    image: yellowLeafSpotImg
  }
};

export default function Diagnosis() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DiagnosisResult[]>([]);

  useEffect(() => {
    // Handle image passed from chat
    const file = location.state?.file;
    if (file) {
      handleFile(file);
    }
  }, [location.state]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setSelectedImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    try {
      // Simulate API call with sample data based on selected crop
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const sampleData = selectedCrop && SAMPLE_DIAGNOSES[selectedCrop] 
        ? SAMPLE_DIAGNOSES[selectedCrop]
        : SAMPLE_DIAGNOSES['Tomato'];
      
      const data: DiagnosisResult = {
        ...sampleData,
        image: selectedImage,
        timestamp: new Date().toISOString()
      };
      
      setResults(prev => [data, ...prev]);

      // Save to history
      saveToHistory({
        id: Date.now().toString(),
        query: `${selectedCrop || 'Crop'} diagnosis`,
        type: 'diagnosis',
        timestamp: new Date().toISOString(),
        preview: data.disease,
        data
      });

      toast({ 
        title: "Diagnosis complete",
        description: `${data.disease} detected in ${selectedCrop || 'crop'}`
      });
      
      setSelectedImage(null);
    } catch (error) {
      toast({ 
        title: "Analysis failed", 
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background w-full">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-primary mb-6">Crop Diagnosis</h1>
        
        {/* Crop Selection */}
        <Card className="p-4 mb-6 bg-gradient-to-br from-card to-primary/5">
          <label className="text-sm font-medium mb-2 block">Select Crop</label>
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a crop..." />
            </SelectTrigger>
            <SelectContent className="bg-card z-[100]">
              {POPULAR_CROPS.map((crop) => (
                <SelectItem key={crop} value={crop}>
                  {crop}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Upload Section */}
        {selectedImage ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-4 mb-6">
              <img 
                src={selectedImage} 
                alt="Selected crop" 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !selectedCrop}
                  className="flex-1"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Image'
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedImage(null)}
                >
                  Cancel
                </Button>
              </div>
              {!selectedCrop && (
                <p className="text-xs text-warning mt-2 text-center">
                  Please select a crop first
                </p>
              )}
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Card 
              className="p-8 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Take Photo</h3>
                  <p className="text-sm text-muted-foreground">
                    Capture image of affected crop
                  </p>
                </div>
              </div>
            </Card>

            <Card 
              className="p-8 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Upload Photo</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from gallery
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Analysis animation */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-background/95 flex items-center justify-center z-50"
          >
            <Card className="p-8 text-center space-y-4 max-w-sm mx-4">
              <div className="relative h-32 w-32 mx-auto">
                <div className="absolute inset-0 animate-scan border-t-2 border-primary rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 text-primary">
                    🌿
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Analyzing Image</h3>
                <p className="text-sm text-muted-foreground">
                  AI is examining your {selectedCrop || 'crop'}...
                </p>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3 }}
                />
              </div>
            </Card>
          </motion.div>
        )}

        {/* Results Section */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Diagnosis Results</h2>
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <DiagnosisCard 
                  data={result}
                  onSave={() => toast({ title: "Saved to history!" })}
                  onExpert={() => toast({ title: "Expert consultation coming soon" })}
                />
              </motion.div>
            ))}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />
      </main>
    </div>
  );
}
