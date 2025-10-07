import { useState } from 'react';
import { Volume2, Filter, RefreshCw, TrendingUp, TrendingDown, Cloud, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const POPULAR_CROPS = [
  'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Soybean', 'Maize', 
  'Tomato', 'Potato', 'Onion', 'Banana', 'Coconut', 'Mango'
];

const MARKET_DATA: Record<string, any> = {
  'Rice': {
    prices: [
      { market: 'Delhi Mandi', currentPrice: 3200, previousPrice: 3100, change: 3.2 },
      { market: 'Haryana Mandi', currentPrice: 3150, previousPrice: 3000, change: 5.0 },
      { market: 'Punjab Mandi', currentPrice: 3250, previousPrice: 3200, change: 1.6 }
    ],
    suggestion: { type: 'good', message: '💡 Prices are high, good time to sell!' }
  },
  'Wheat': {
    prices: [
      { market: 'Haryana Mandi', currentPrice: 2150, previousPrice: 2200, change: -2.3 },
      { market: 'Punjab Mandi', currentPrice: 2100, previousPrice: 2180, change: -3.7 },
      { market: 'UP Mandi', currentPrice: 2050, previousPrice: 2100, change: -2.4 }
    ],
    suggestion: { type: 'wait', message: '⚠️ Prices are low, consider waiting for better rates.' }
  },
  'Cotton': {
    prices: [
      { market: 'Gujarat Mandi', currentPrice: 5800, previousPrice: 5600, change: 3.6 },
      { market: 'Maharashtra Mandi', currentPrice: 5750, previousPrice: 5500, change: 4.5 },
      { market: 'Telangana Mandi', currentPrice: 5900, previousPrice: 5700, change: 3.5 }
    ],
    suggestion: { type: 'good', message: '💡 High demand from textile industry, excellent time to sell!' }
  }
};

export default function Market() {
  const [selectedCrop, setSelectedCrop] = useState<string>('Rice');
  const [lastUpdated] = useState(new Date().toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  }));

  const currentData = MARKET_DATA[selectedCrop] || MARKET_DATA['Rice'];

  const handleListen = () => {
    const speech = new SpeechSynthesisUtterance(
      `${selectedCrop} prices: ${currentData.prices[0].market} is ${currentData.prices[0].currentPrice} rupees per quintal`
    );
    window.speechSynthesis.speak(speech);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background w-full">
      <main className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
        {/* Weather Alert */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <Cloud className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <p className="text-sm text-blue-900 dark:text-blue-100">
                Heavy rain expected tomorrow. Prepare for harvesting.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Header with Actions */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-primary">Market Prices</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleListen} className="gap-2">
              <Volume2 className="h-4 w-4" />
              <span className="hidden sm:inline">Listen</span>
            </Button>
            <Button variant="outline" onClick={handleRefresh} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>

        {/* Crop Selection */}
        <Card className="p-4 bg-gradient-to-br from-card to-primary/5">
          <label className="text-sm font-medium mb-2 block">Select Crop</label>
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-full max-w-md">
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

        {/* Sell Suggestion Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={`p-6 ${
            currentData.suggestion.type === 'good' 
              ? 'bg-gradient-to-br from-success/10 to-success/5 border-success/30' 
              : 'bg-gradient-to-br from-warning/10 to-warning/5 border-warning/30'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${
                currentData.suggestion.type === 'good' ? 'bg-success/20' : 'bg-warning/20'
              }`}>
                <Lightbulb className={`h-6 w-6 ${
                  currentData.suggestion.type === 'good' ? 'text-success' : 'text-warning'
                }`} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Sell Suggestion</h3>
                <p className={`text-sm font-medium ${
                  currentData.suggestion.type === 'good' ? 'text-success' : 'text-warning'
                }`}>
                  {currentData.suggestion.message}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Market Prices Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Nearby Market Prices</h2>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentData.prices.map((price: any, index: number) => (
              <motion.div
                key={price.market}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-primary/5">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg">{price.market}</h3>
                      <Badge variant="outline" className="mt-2">{selectedCrop}</Badge>
                    </div>

                    <div>
                      <p className="text-3xl font-bold text-primary">
                        ₹{price.currentPrice.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">/quintal</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground">Previous</p>
                        <p className="font-medium">₹{price.previousPrice.toLocaleString()}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                        price.change > 0 
                          ? 'bg-success/10 text-success' 
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {price.change > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-bold text-sm">
                          {price.change > 0 ? '+' : ''}{price.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
