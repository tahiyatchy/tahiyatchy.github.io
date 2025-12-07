import { useState, useEffect, useRef } from 'react';
import './Classmates.css';

function Classmates() {
  const [classmates, setClassmates] = useState([]);
  const [filteredClassmates, setFilteredClassmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassmate, setSelectedClassmate] = useState(null);
  
  // Checkbox filter states
  const [filters, setFilters] = useState({
    name: true,
    mascot: true,
    personalStatement: true,
    backgrounds: true,
    classes: false,
    extraInfo: false,
    quote: false,
    links: false,
    image: false
  });
  
  // Slideshow state
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const slideshowTimerRef = useRef(null);

  useEffect(() => {
    const fetchClassmates = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1');
        
        if (!response.ok) {
          throw new Error('Failed to fetch classmates data');
        }
        
        const data = await response.json();
        setClassmates(data);
        setFilteredClassmates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClassmates();
  }, []);

  // Filter function that searches based on selected checkboxes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredClassmates(classmates);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    
    const filtered = classmates.filter(classmate => {
      let matches = false;
      
      // Search in name if checkbox is checked
      if (filters.name) {
        matches = matches || 
          classmate.name.first.toLowerCase().includes(searchTermLower) ||
          classmate.name.last.toLowerCase().includes(searchTermLower) ||
          classmate.prefix.toLowerCase().includes(searchTermLower);
      }
      
      // Search in mascot if checkbox is checked
      if (filters.mascot && !matches) {
        matches = matches || classmate.mascot.toLowerCase().includes(searchTermLower);
      }
      
      // Search in personal statement if checkbox is checked
      if (filters.personalStatement && !matches) {
        matches = matches || classmate.personalStatement.toLowerCase().includes(searchTermLower);
      }
      
      // Search in backgrounds if checkbox is checked
      if (filters.backgrounds && !matches) {
        matches = matches || 
          classmate.backgrounds.personal.toLowerCase().includes(searchTermLower) ||
          classmate.backgrounds.professional.toLowerCase().includes(searchTermLower) ||
          classmate.backgrounds.academic.toLowerCase().includes(searchTermLower);
      }
      
      // Search in classes if checkbox is checked
      if (filters.classes && !matches) {
        matches = matches || classmate.courses.some(course => 
          course.code.toLowerCase().includes(searchTermLower) ||
          course.name.toLowerCase().includes(searchTermLower) ||
          course.reason.toLowerCase().includes(searchTermLower)
        );
      }
      
      // Search in extra info if checkbox is checked
      if (filters.extraInfo && !matches) {
        matches = matches || 
          classmate.platform.device.toLowerCase().includes(searchTermLower) ||
          classmate.platform.os.toLowerCase().includes(searchTermLower) ||
          classmate.funFact.toLowerCase().includes(searchTermLower);
      }
      
      // Search in quote if checkbox is checked
      if (filters.quote && !matches) {
        matches = matches || 
          classmate.quote.text.toLowerCase().includes(searchTermLower) ||
          classmate.quote.author.toLowerCase().includes(searchTermLower);
      }
      
      // Search in links if checkbox is checked
      if (filters.links && !matches) {
        matches = matches || 
          (classmate.links.charlotte && classmate.links.charlotte.toLowerCase().includes(searchTermLower)) ||
          (classmate.links.github && classmate.links.github.toLowerCase().includes(searchTermLower)) ||
          (classmate.links.linkedin && classmate.links.linkedin.toLowerCase().includes(searchTermLower)) ||
          (classmate.links.freecodecamp && classmate.links.freecodecamp.toLowerCase().includes(searchTermLower)) ||
          (classmate.links.codecademy && classmate.links.codecademy.toLowerCase().includes(searchTermLower));
      }
      
      // Search in image caption if checkbox is checked
      if (filters.image && !matches && classmate.media.hasImage) {
        matches = matches || classmate.media.caption.toLowerCase().includes(searchTermLower);
      }
      
      return matches;
    });
    
    setFilteredClassmates(filtered);
  }, [searchTerm, classmates, filters]);

  const handleClassmateClick = (classmate) => {
    setSelectedClassmate(classmate);
    setShowSlideshow(false);
  };

  const handleBackToList = () => {
    setSelectedClassmate(null);
    setShowSlideshow(false);
  };

  const handleFilterChange = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleSelectAll = () => {
    setFilters({
      name: true,
      mascot: true,
      personalStatement: true,
      backgrounds: true,
      classes: true,
      extraInfo: true,
      quote: true,
      links: true,
      image: true
    });
  };

  const handleClearAll = () => {
    setFilters({
      name: false,
      mascot: false,
      personalStatement: false,
      backgrounds: false,
      classes: false,
      extraInfo: false,
      quote: false,
      links: false,
      image: false
    });
  };

  // Slideshow functions
  const startSlideshow = () => {
    if (filteredClassmates.length === 0) return;
    setShowSlideshow(true);
    setSlideshowIndex(0);
  };

  const stopSlideshow = () => {
    setShowSlideshow(false);
    if (slideshowTimerRef.current) {
      clearInterval(slideshowTimerRef.current);
      slideshowTimerRef.current = null;
    }
  };

  const nextSlide = () => {
    setSlideshowIndex(prev => 
      prev === filteredClassmates.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setSlideshowIndex(prev => 
      prev === 0 ? filteredClassmates.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="classmates-container">
        <div className="loading">Loading classmates data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="classmates-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (selectedClassmate && !showSlideshow) {
    return (
      <div className="classmates-container">
        <button className="back-button" onClick={handleBackToList}>
          ← Back to List
        </button>
        <ClassmateDetail classmate={selectedClassmate} />
      </div>
    );
  }

  if (showSlideshow && filteredClassmates.length > 0) {
    return (
      <div className="classmates-container">
        <div className="slideshow-header">
          <button className="back-button" onClick={stopSlideshow}>
            ← Stop Slideshow
          </button>
          <div className="slideshow-counter">
            Slide {slideshowIndex + 1} of {filteredClassmates.length}
          </div>
        </div>
        
        <div className="slideshow-container">
          <button className="slideshow-nav prev" onClick={prevSlide}>
            ‹
          </button>
          
          <div className="slideshow-content">
            <ClassmateCard 
              classmate={filteredClassmates[slideshowIndex]} 
              onClick={handleClassmateClick}
              isSlideshow={true}
            />
          </div>
          
          <button className="slideshow-nav next" onClick={nextSlide}>
            ›
          </button>
        </div>
        
        <div className="slideshow-controls">
          <button className="control-button" onClick={prevSlide}>
            Previous
          </button>
          <button 
            className="control-button pause" 
            onClick={stopSlideshow}
          >
            Stop Slideshow
          </button>
          <button className="control-button" onClick={nextSlide}>
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="classmates-container">
      <h1>ITIS 3135 Classmates</h1>
      <p className="classmates-intro">
        Meet your classmates! Click on any student to view their detailed introduction.
      </p>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search classmates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <div className="filter-container">
          <h3>Search Filters</h3>
          <div className="filter-buttons">
            <button onClick={handleSelectAll} className="filter-button select-all">
              Select All
            </button>
            <button onClick={handleClearAll} className="filter-button clear-all">
              Clear All
            </button>
          </div>
          <div className="filter-checkboxes">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.name}
                onChange={() => handleFilterChange('name')}
              />
              <span>Name & Username</span>
            </label>
            
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.mascot}
                onChange={() => handleFilterChange('mascot')}
              />
              <span>Mascot</span>
            </label>
            
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.personalStatement}
                onChange={() => handleFilterChange('personalStatement')}
              />
              <span>Personal Statement</span>
            </label>
            
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.backgrounds}
                onChange={() => handleFilterChange('backgrounds')}
              />
              <span>Backgrounds</span>
            </label>
            
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.classes}
                onChange={() => handleFilterChange('classes')}
              />
              <span>Classes</span>
            </label>
            
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.extraInfo}
                onChange={() => handleFilterChange('extraInfo')}
              />
              <span>Computer & Fun Fact</span>
            </label>
            
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.quote}
                onChange={() => handleFilterChange('quote')}
              />
              <span>Quote</span>
            </label>
            
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.links}
                onChange={() => handleFilterChange('links')}
              />
              <span>Links</span>
            </label>
            
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.image}
                onChange={() => handleFilterChange('image')}
              />
              <span>Image Caption</span>
            </label>
          </div>
        </div>
        
        <div className="results-info">
          <div className="results-count">
            Found {filteredClassmates.length} of {classmates.length} classmates
          </div>
          
          {filteredClassmates.length > 0 && (
            <button 
              className="slideshow-button"
              onClick={startSlideshow}
            >
              Start Slideshow ({filteredClassmates.length} slides)
            </button>
          )}
        </div>
      </div>

      <div className="classmates-grid">
        {filteredClassmates.map((classmate) => (
          <ClassmateCard 
            key={classmate.prefix} 
            classmate={classmate} 
            onClick={handleClassmateClick}
          />
        ))}
      </div>

      {filteredClassmates.length === 0 && (
        <div className="no-results">
          No classmates found matching your search.
        </div>
      )}
    </div>
  );
}

function ClassmateCard({ classmate, onClick }) {
  const fullName = `${classmate.name.first} ${classmate.name.last}`;
  
  return (
    <div className="classmate-card" onClick={() => onClick(classmate)}>
      <div className="card-header">
        <h3>{fullName}</h3>
        <span className="username">@{classmate.prefix}</span>
      </div>
      <div className="card-content">
        <p className="mascot"><strong>Mascot:</strong> {classmate.mascot}</p>
        <p className="personal-statement">
          {classmate.personalStatement.substring(0, 100)}...
        </p>
      </div>
      <div className="card-footer">
        <span className="click-hint">Click to view details →</span>
      </div>
    </div>
  );
}

function ClassmateDetail({ classmate }) {
  const fullName = `${classmate.name.first} ${classmate.name.middleInitial ? classmate.name.middleInitial + ' ' : ''}${classmate.name.last}`;
  
  return (
    <div className="classmate-detail">
      <div className="detail-header">
        <h1>{fullName}</h1>
        <div className="username-badge">@{classmate.prefix}</div>
      </div>

      {classmate.media.hasImage && (
        <div className="detail-image">
          <img 
            src={`https://dvonb.xyz${classmate.media.src}`} 
            alt={classmate.media.caption} 
          />
          <figcaption>{classmate.media.caption}</figcaption>
        </div>
      )}

      <div className="detail-sections">
        <section className="detail-section">
          <h2>About</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Mascot:</strong> {classmate.mascot}
            </div>
            <div className="info-item">
              <strong>Platform:</strong> {classmate.platform.device} ({classmate.platform.os})
            </div>
            <div className="info-item">
              <strong>Fun Fact:</strong> {classmate.funFact}
            </div>
          </div>
        </section>

        <section className="detail-section">
          <h2>Background</h2>
          <div className="background-content">
            <h3>Personal</h3>
            <p>{classmate.backgrounds.personal}</p>
            
            <h3>Professional</h3>
            <p>{classmate.backgrounds.professional}</p>
            
            <h3>Academic</h3>
            <p>{classmate.backgrounds.academic}</p>
          </div>
        </section>

        <section className="detail-section">
          <h2>Courses</h2>
          <div className="courses-list">
            {classmate.courses.map((course, index) => (
              <div key={index} className="course-item">
                <strong>{course.code}:</strong> {course.name}
                <br />
                <em>Reason: {course.reason}</em>
              </div>
            ))}
          </div>
        </section>

        <section className="detail-section">
          <h2>Personal Statement</h2>
          <p className="personal-statement-full">{classmate.personalStatement}</p>
        </section>

        <section className="detail-section">
          <h2>Favorite Quote</h2>
          <blockquote className="quote">
            "{classmate.quote.text}"
            <footer>— {classmate.quote.author}</footer>
          </blockquote>
        </section>

        <section className="detail-section">
          <h2>Links</h2>
          <div className="links-grid">
            {classmate.links.charlotte && (
              <a href={classmate.links.charlotte} target="_blank" rel="noopener noreferrer">
                UNCC Page
              </a>
            )}
            {classmate.links.github && (
              <a href={classmate.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {classmate.links.linkedin && (
              <a href={classmate.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {classmate.links.freecodecamp && (
              <a href={classmate.links.freecodecamp} target="_blank" rel="noopener noreferrer">
                freeCodeCamp
              </a>
            )}
            {classmate.links.codecademy && (
              <a href={classmate.links.codecademy} target="_blank" rel="noopener noreferrer">
                Codecademy
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Classmates;