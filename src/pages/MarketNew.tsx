import { useState } from 'react';
import { Volume2, Filter, RefreshCw, TrendingUp, TrendingDown, Cloud, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PRICE_ALERTS = [
  { crop: 'Rice', message: 'Price increased by ₹100/quintal in last 3 days', change: 3.2, badge: 'success' },
  { crop: 'Wheat', message: 'Expected price rise next week due to procurement', change: 2.3, badge: 'success' },
  { crop: 'Cotton', message: 'High demand from textile industry', change: 5.6, badge: 'success' },
];

const MARKET_DATA = [
  { crop: 'Rice', variety: 'Basmati', market: 'Delhi Mandi', currentPrice: 3200, previousPrice: 3100, change: 3.2 },
  { crop: 'Wheat', variety: 'HD-2967', market: 'Haryana Mandi', currentPrice: 2150, previousPrice: 2200, change: -2.3 },
  { crop: 'Cotton', variety: 'Shankar-6', market: 'Gujarat Mandi', currentPrice: 5800, previousPrice: 5600, change: 3.6 },
  { crop: 'Sugarcane', variety: 'Co-238', market: 'UP Mandi', currentPrice: 350, previousPrice: 340, change: 2.9 },
  { crop: 'Soybean', variety: 'JS-335', market: 'Madhya Pradesh Mandi', currentPrice: 4200, previousPrice: 4150, change: 1.2 },
  { crop: 'Maize', variety: 'Hybrid', market: 'Karnataka Mandi', currentPrice: 1800, previousPrice: 1750, change: 2.9 },
];

const POPULAR_CROPS = ['All Crops', 'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Soybean', 'Maize'];

export default function MarketNew() {
  const [selectedCrop, setSelectedCrop] = useState<string>('All Crops');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated] = useState(new Date().toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  }));

  const filteredData = MARKET_DATA.filter(item => {
    const matchesCrop = selectedCrop === 'All Crops' || item.crop === selectedCrop;
    const matchesSearch = searchQuery === '' || 
      item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.market.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  const handleListen = () => {
    const speech = new SpeechSynthesisUtterance(
      `Market prices updated. ${filteredData.length} crops listed.`
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
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter Markets</span>
            </Button>
            <Button variant="outline" onClick={handleRefresh} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>

        {/* Price Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-warning" />
              <h2 className="text-xl font-bold">Price Alerts</h2>
            </div>
            <div className="space-y-3">
              {PRICE_ALERTS.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge className="bg-success text-success-foreground">
                      {alert.crop}
                    </Badge>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                  <div className="flex items-center gap-1 text-success font-semibold">
                    <TrendingUp className="h-4 w-4" />
                    +{alert.change}%
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Select Crop" />
                </SelectTrigger>
                <SelectContent className="bg-card z-[100]">
                  {POPULAR_CROPS.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by crop, variety, or market..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Today's Mandi Prices Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Today's Mandi Prices</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Crop</TableHead>
                    <TableHead className="font-bold">Variety</TableHead>
                    <TableHead className="font-bold">Market</TableHead>
                    <TableHead className="font-bold">Current Price</TableHead>
                    <TableHead className="font-bold">Previous Price</TableHead>
                    <TableHead className="font-bold text-right">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No results found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((item, index) => (
                      <TableRow key={index} className="hover:bg-muted/50">
                        <TableCell className="font-semibold">{item.crop}</TableCell>
                        <TableCell className="text-muted-foreground">{item.variety}</TableCell>
                        <TableCell className="text-primary">{item.market}</TableCell>
                        <TableCell>
                          <div className="font-bold text-lg">₹{item.currentPrice.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">/quintal</div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          ₹{item.previousPrice.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge 
                            className={`${
                              item.change > 0 
                                ? 'bg-success/10 text-success border-success/20' 
                                : 'bg-destructive/10 text-destructive border-destructive/20'
                            }`}
                            variant="outline"
                          >
                            <div className="flex items-center gap-1">
                              {item.change > 0 ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              {item.change > 0 ? '+' : ''}{item.change}%
                            </div>
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
