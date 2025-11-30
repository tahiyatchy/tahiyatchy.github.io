import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Introduction from './pages/Introduction';
import Contract from './pages/Contract';
import Classmates from './pages/Classmates'; // Add this import

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Determine current page based on URL
    const path = window.location.pathname;
    if (path.includes('introduction.html') || path === '/introduction') {
      setCurrentPage('introduction');
    } else if (path.includes('contract.html') || path === '/contract') {
      setCurrentPage('contract');
    } else if (path.includes('classmates.html') || path === '/classmates') { // Add this condition
      setCurrentPage('classmates');
    } else {
      setCurrentPage('home');
    }

    // Handle browser back/forward
    const handlePopState = () => {
      const newPath = window.location.pathname;
      if (newPath.includes('introduction.html') || newPath === '/introduction') {
        setCurrentPage('introduction');
      } else if (newPath.includes('contract.html') || newPath === '/contract') {
        setCurrentPage('contract');
      } else if (newPath.includes('classmates.html') || newPath === '/classmates') { // Add this condition
        setCurrentPage('classmates');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'introduction':
        return <Introduction />;
      case 'contract':
        return <Contract />;
      case 'classmates': // Add this case
        return <Classmates />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Header onNavigate={handleNavigation} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;