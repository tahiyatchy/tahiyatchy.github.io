import { useEffect } from 'react';

const Header = ({ onNavigate }) => {
  useEffect(() => {
    // Set active navigation link
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll('#primary-nav a');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if ((href === '/' && path === '/') ||
          (href === 'introduction.html' && path.includes('introduction')) ||
          (href === 'contract.html' && path.includes('contract'))) {
        link.classList.add('active');
      }
    });
  }, []);

  const handleLinkClick = (e, page) => {
    e.preventDefault();
    onNavigate(page);
    
    // Update URL without full page reload
    const url = page === 'home' ? '/' : `/${page}.html`;
    window.history.pushState({}, '', url);
  };

  return (
    <header>
      <h1>ITIS 3135 | Tahiyat Chy's | Thorny Chimaera</h1>
      <nav id="primary-nav">
        <ul>
          <li><a href="/" onClick={(e) => handleLinkClick(e, 'home')} title="Home">Home</a></li>
          <li><a href="introduction.html" onClick={(e) => handleLinkClick(e, 'introduction')} title="Introduction">Introduction</a></li>
          <li><a href="contract.html" onClick={(e) => handleLinkClick(e, 'contract')} title="Contract">Contract</a></li>
        </ul>
      </nav>
      <nav id="secondary-nav">
        <ul>
          <li><a href="https://webpages.charlotte.edu/tchy/itis3135/" title="Main Site">← Back to Main Site</a></li>
          <li><a href="/" title="React3">React3</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;