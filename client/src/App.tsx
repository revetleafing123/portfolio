// Split Signal reminder: the application shell owns the theme and route boundary; keep content composition in page files.
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import Disclaimer from "@/pages/Disclaimer";
import { Route, Router, Switch } from "wouter";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" switchable>
      <Router base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Switch>
          <Route path="/disclaimer" component={Disclaimer} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
