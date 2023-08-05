import Home from "./components/home";
import Profile from "./components/profile";
import Post from "./components/post";
import Gallery from "./components/gallery";
import Todo from "./components/todo";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <div className="w-screen">
      <RoutesWrapper>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/gallery/:id" element={<Gallery />} />
        <Route path="/todo/:id" element={<Todo />} />
      </RoutesWrapper>
    </div>
  );
}

function RoutesWrapper({ children }) {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const loader = setTimeout(() => {
      setIsLoading(false);
    });

    return () => clearTimeout(loader);
  }, [pathname]);

  return isLoading ? <p>Loading...</p> : <Routes>{children}</Routes>;
}

export default App;
