import { useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { Home, Camera, TrendingUp, FileText, HelpCircle, User, LogOut, ChevronRight, X, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/diagnosis', label: 'Crop Advisory', icon: Camera },
  { path: '/market', label: 'Market Prices', icon: TrendingUp },
  { path: '/schemes', label: 'Govt Schemes', icon: FileText },
  { path: '/history', label: 'History', icon: History },
  { path: '/help', label: 'Help', icon: HelpCircle },
  { path: '/profile', label: 'Profile', icon: User },
];

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/landing');
  };

  const NavItem = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <NavLink
        to={item.path}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
          ${isActive 
            ? 'bg-primary text-primary-foreground shadow-md font-semibold' 
            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
          }
          ${isCollapsed ? 'justify-center' : ''}
        `}
        title={isCollapsed ? item.label : undefined}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {!isCollapsed && <span className="font-medium">{item.label}</span>}
      </NavLink>
    );
  };

  return (
    <motion.aside
        initial={{ x: -300 }}
        animate={{ 
          x: 0,
          width: isCollapsed ? '80px' : '256px'
        }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex flex-col bg-card border-r min-h-screen sticky top-0 shadow-lg"
      >
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                  🌾 Kisan
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Supporting Indian Farmers
                </p>
              </motion.div>
            )}
            {isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-2xl"
              >
                🌾
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-muted"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className={`w-full gap-3 hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all duration-300 ${
              isCollapsed ? 'justify-center px-0' : 'justify-start'
            }`}
            onClick={handleLogout}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && 'Logout'}
          </Button>
          {!isCollapsed && (
            <p className="text-xs text-center text-muted-foreground mt-4">
              Supporting Indian Farmers
            </p>
          )}
        </div>
      </motion.aside>
  );
}
