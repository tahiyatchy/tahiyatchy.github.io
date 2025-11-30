import { useState, useEffect } from 'react';
import './Classmates.css';

function Classmates() {
  const [classmates, setClassmates] = useState([]);
  const [filteredClassmates, setFilteredClassmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassmate, setSelectedClassmate] = useState(null);

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

  useEffect(() => {
    const filtered = classmates.filter(classmate => 
      classmate.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classmate.name.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classmate.prefix.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classmate.mascot.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClassmates(filtered);
  }, [searchTerm, classmates]);

  const handleClassmateClick = (classmate) => {
    setSelectedClassmate(classmate);
  };

  const handleBackToList = () => {
    setSelectedClassmate(null);
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

  if (selectedClassmate) {
    return (
      <div className="classmates-container">
        <button className="back-button" onClick={handleBackToList}>
          ← Back to List
        </button>
        <ClassmateDetail classmate={selectedClassmate} />
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
          placeholder="Search by name, username, or mascot..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="results-count">
          Showing {filteredClassmates.length} of {classmates.length} classmates
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