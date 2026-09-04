// Split Signal reminder: the application shell owns the theme and route boundary; keep content composition in page files.
import { AnimatePresence, motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import Disclaimer from "@/pages/Disclaimer";
import { Route, Router, Switch, useLocation } from "wouter";

function AnimatedRoutes() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <Switch location={location}>
          <Route path="/disclaimer" component={Disclaimer} />
          <Route path="/" component={Home} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" switchable>
      <Router base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <SiteNav />
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}
