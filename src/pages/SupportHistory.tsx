import { useState } from 'react';
import { RotateCcw, Trash2, Clock, Camera, TrendingUp, FileText, MessageCircle, HelpCircle, Book, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getHistory, clearHistory } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const categoryIcons = {
  diagnosis: Camera,
  market: TrendingUp,
  schemes: FileText,
  chat: MessageCircle,
};

export default function SupportHistory() {
  const { toast } = useToast();
  const [history] = useState(getHistory());

  const handleClearHistory = () => {
    clearHistory();
    toast({ title: "History cleared successfully" });
    window.location.reload();
  };

  const getCategoryIcon = (type: string) => {
    const Icon = categoryIcons[type as keyof typeof categoryIcons] || Clock;
    return Icon;
  };

  return (
    <div className="min-h-screen bg-background w-full">
      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Support & History</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Get help and view your activity
            </p>
          </div>
        </div>

        <Tabs defaultValue="help" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="help">Help & Support</TabsTrigger>
            <TabsTrigger value="history">Activity History</TabsTrigger>
          </TabsList>

          {/* Help Tab */}
          <TabsContent value="help" className="space-y-6">
            {/* Quick Start Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Book className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold">Quick Start Guide</h2>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold mb-1">🌾 Crop Advisory</h3>
                    <p className="text-sm text-muted-foreground">
                      Take a photo of your crop to diagnose diseases and get treatment recommendations.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold mb-1">💰 Market Prices</h3>
                    <p className="text-sm text-muted-foreground">
                      Check real-time crop prices across different mandis. Get sell suggestions based on current trends.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold mb-1">🎤 Voice Assistant</h3>
                    <p className="text-sm text-muted-foreground">
                      Click the voice button to ask questions in your language. Get instant audio responses.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-semibold mb-1">📋 Government Schemes</h3>
                    <p className="text-sm text-muted-foreground">
                      Browse available subsidies and schemes. Filter by category to find relevant programs.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Voice Commands */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold">Voice Commands</h2>
                </div>
                <div className="grid gap-3">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="font-medium mb-1">💬 "What's the tomato price today?"</p>
                    <p className="text-xs text-muted-foreground">Get current market prices</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="font-medium mb-1">💬 "Show me drip irrigation schemes"</p>
                    <p className="text-xs text-muted-foreground">Find government subsidies</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="font-medium mb-1">💬 "Help with crop diagnosis"</p>
                    <p className="text-xs text-muted-foreground">Get guidance on using features</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">How accurate is the crop diagnosis?</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI analyzes images with high accuracy, but for serious cases, please consult an agricultural expert.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Are market prices updated in real-time?</h3>
                    <p className="text-sm text-muted-foreground">
                      Prices are updated daily from government mandi sources. Refresh for the latest data.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Can I use the app offline?</h3>
                    <p className="text-sm text-muted-foreground">
                      Some features require internet connection. We're working on offline support.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
                <h2 className="text-xl font-bold mb-4">Need More Help?</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Phone className="h-4 w-4" />
                    Call Support: 1800-XXX-XXXX
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Mail className="h-4 w-4" />
                    Email: support@kisanplus.in
                  </Button>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="flex items-center justify-between">
              {history.length > 0 && (
                <Button
                  variant="outline"
                  onClick={handleClearHistory}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
              )}
            </div>

            {history.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-12 text-center">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No History Yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Your queries and activities will appear here
                  </p>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {history.map((item, index) => {
                  const Icon = getCategoryIcon(item.type || 'chat');
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h3 className="font-semibold text-base line-clamp-1">
                                {item.query}
                              </h3>
                              <Badge variant="outline" className="text-xs shrink-0">
                                {item.type || 'query'}
                              </Badge>
                            </div>
                            
                            {item.preview && (
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {item.preview}
                              </p>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {new Date(item.timestamp).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              
                              <Button variant="ghost" size="sm" className="gap-2">
                                <RotateCcw className="h-3 w-3" />
                                View Again
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
