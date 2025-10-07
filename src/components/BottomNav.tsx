import { NavLink, useLocation } from 'react-router-dom';
import { Camera, TrendingUp, FileText, History, HelpCircle, Mic, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/diagnosis', label: 'Crop', icon: Camera },
  { path: '/market', label: 'Market', icon: TrendingUp },
  { path: '/schemes', label: 'Schemes', icon: FileText },
  { path: '/support-history', label: 'Help', icon: HelpCircle },
];

interface BottomNavProps {
  onVoiceClick: () => void;
  isListening?: boolean;
  hasMessages?: boolean;
}

export function BottomNav({ onVoiceClick, isListening = false, hasMessages = false }: BottomNavProps) {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-2xl">
      <div className="grid grid-cols-5 gap-1 px-3 py-2">
        {/* First two items */}
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-full transition-all duration-300",
                isActive ? "bg-primary/10" : ""
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}

        {/* Center Voice Button */}
        <div className="flex items-center justify-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onVoiceClick}
            className={cn(
              "relative flex flex-col items-center gap-1 px-6 py-3 rounded-2xl transition-all duration-300 -mt-4 shadow-xl",
              isListening 
                ? "bg-destructive hover:bg-destructive/90 text-white" 
                : "bg-gradient-to-br from-primary to-secondary text-white hover:scale-105"
            )}
          >
            {isListening && (
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl bg-destructive"
              />
            )}
            <div className="relative p-2">
              {hasMessages ? (
                <MessageSquare className="h-7 w-7" />
              ) : (
                <Mic className="h-7 w-7" />
              )}
            </div>
            <span className="text-xs font-bold">Voice</span>
            {hasMessages && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-success text-[8px] font-bold">
                !
              </span>
            )}
          </motion.button>
        </div>

        {/* Last two items */}
        {navItems.slice(2).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-full transition-all duration-300",
                isActive ? "bg-primary/10" : ""
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
