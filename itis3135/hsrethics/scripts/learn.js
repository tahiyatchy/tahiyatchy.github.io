
// ===== FUNCTION DEFINITIONS =====

// Quiz answers
const quizAnswers = {
    belmont: 0,
    coi: 0,
    irb: 0,
    data: 0
};

// Quiz feedback
const quizFeedback = {
    belmont: "Correct! Respect for Persons requires acknowledging autonomy and protecting those with diminished autonomy through informed consent.",
    coi: "Correct! Financial conflicts of interest occur when researchers have financial stakes that could influence their research conduct or outcomes.",
    irb: "Correct! Research involving more than minimal risk requires Full Board Review by the complete IRB committee.",
    data: "Correct! De-identification protects participant confidentiality by removing personally identifiable information."
};

// Define all available modules
const ALL_MODULES = ['Belmont Report', 'Conflicts of Interest', 'IRB Regulations', 'Data Handling'];

// Global variables
let completedModules = [];

// Initialize progress tracker
function initializeProgressTracker() {
    // Load completed modules from localStorage
    const storedModules = localStorage.getItem('completedModules');
    
    if (storedModules) {
        try {
            completedModules = JSON.parse(storedModules);
        } catch (e) {
            console.error('Error parsing stored modules:', e);
            completedModules = [];
        }
    } else {
        completedModules = [];
    }
    
    updateProgressDisplay();
    updateCompletionCheckboxes();
}

// Initialize jQuery UI components
function initializeJQueryUI() {
    // Initialize timeline tabs
    $("#ethics-timeline").tabs({
        activate: function(event, ui) {
            // Update timeline visualization when tabs change
            const activeIndex = ui.newTab.index();
            highlightTimelineEra(activeIndex);
        }
    });
    
    // Initialize glossary accordion
    $("#research-glossary").accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
    });
    
    // Initialize tooltips for acronyms
    $(".acronym").tooltip({
        content: function() {
            return $(this).data('definition');
        },
        position: {
            my: "left+15 center",
            at: "right center"
        }
    });
}

function highlightTimelineEra(eraIndex) {
    // Remove highlight from all timeline headers
    $("#ethics-timeline .ui-tabs-anchor").removeClass('timeline-highlight');
    // Add highlight to current era
    $("#ethics-timeline .ui-tabs-anchor").eq(eraIndex).addClass('timeline-highlight');
}

// Show content function for learn.html
function showContent(contentId) {
    // Hide all content sections
    const allContent = document.querySelectorAll('.content-section');
    allContent.forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
    });
    
    // Show selected content
    const selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
        selectedContent.classList.add('active');
        selectedContent.classList.add('fade-in');
        
        // Scroll to the content
        selectedContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Quiz functionality
function selectAnswer(element, selectedIndex, quizType = 'belmont') {
    const options = element.parentElement.children;
    const feedbackId = `${quizType}-feedback`;
    const feedbackElement = document.getElementById(feedbackId);
    
    // Remove selected class from all options
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove('selected', 'correct', 'incorrect');
    }
    
    // Add selected class to chosen option
    element.classList.add('selected');
    
    // Check if answer is correct
    if (selectedIndex === quizAnswers[quizType]) {
        element.classList.add('correct');
        feedbackElement.innerHTML = `<strong>Correct!</strong> ${quizFeedback[quizType]}`;
        feedbackElement.style.backgroundColor = '#d4edda';
        feedbackElement.style.borderLeftColor = '#28a745';
    } else {
        element.classList.add('incorrect');
        feedbackElement.innerHTML = `<strong>Incorrect.</strong> ${quizFeedback[quizType]}`;
        feedbackElement.style.backgroundColor = '#f8d7da';
        feedbackElement.style.borderLeftColor = '#dc3545';
    }
    
    feedbackElement.classList.remove('hidden');
}

// Progress Tracker functionality
function trackModuleCompletion(moduleName, isCompleted) {
    if (isCompleted) {
        // Add module if not already completed
        if (!completedModules.includes(moduleName)) {
            completedModules.push(moduleName);
            // Update progress display and checkboxes
            updateProgressDisplay();
            updateCompletionCheckboxes();
        }
    } else {
        // Remove module from completed list
        const index = completedModules.indexOf(moduleName);
        if (index > -1) {
            completedModules.splice(index, 1);
        }
    }
    
    // Save to localStorage
    localStorage.setItem('completedModules', JSON.stringify(completedModules));
    
    // Show achievement badge
    if (isCompleted) {
        showAchievementBadge(moduleName);
    }
    
    // Update progress display
    updateProgressDisplay();
}

function updateProgressDisplay() {
    const totalModules = ALL_MODULES.length;
    const completedCount = completedModules.length;
    const completionPercentage = Math.round((completedCount / totalModules) * 100);
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = `${completionPercentage}%`;
    }
    
    // Update progress text
    const progressText = document.getElementById('progressText');
    if (progressText) {
        progressText.textContent = `${completionPercentage}% Complete`;
    }
    
    // Update modules completed count
    const modulesCompleted = document.getElementById('modulesCompleted');
    if (modulesCompleted) {
        modulesCompleted.textContent = `${completedCount}/${totalModules} Modules`;
    }
    
    // Check for completion milestone
    if (completionPercentage === 100) {
        showCompletionMessage();
    }
}

function updateCompletionCheckboxes() {
    // Update checkboxes based on completed modules
    const checkboxes = {
        'Belmont Report': 'belmont-complete',
        'Conflicts of Interest': 'coi-complete',
        'IRB Regulations': 'irb-complete',
        'Data Handling': 'data-complete'
    };
    
    for (const [moduleName, checkboxId] of Object.entries(checkboxes)) {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
            checkbox.checked = completedModules.includes(moduleName);
        }
    }
}

function showAchievementBadge(moduleName) {
    // Create and show achievement badge
    const badge = document.createElement('span');
    badge.className = 'achievement-badge';
    badge.textContent = 'Completed!';
    
    // Find the module card and add badge
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        if (card.querySelector('h3').textContent === moduleName) {
            card.querySelector('h3').appendChild(badge);
            
            // Remove badge after 3 seconds
            setTimeout(() => {
                if (badge.parentNode) {
                    badge.parentNode.removeChild(badge);
                }
            }, 3000);
        }
    });
}

function showCompletionMessage() {
    // Create completion message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        text-align: center;
        max-width: 300px;
    `;
    message.innerHTML = `
        <h3>Congratulations! 🎉</h3>
        <p>You've completed all learning modules!</p>
        <button onclick="this.parentNode.remove()" style="margin-top: 10px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Continue</button>
    `;
    
    document.body.appendChild(message);
}

// Reset function for testing
function resetProgress() {
    completedModules = [];
    localStorage.removeItem('completedModules');
    updateProgressDisplay();
    updateCompletionCheckboxes();
}

// ===== EVENT LISTENERS AND INITIALIZATION =====

// Enhanced Module Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const moduleCards = document.querySelectorAll('.module-card');
    
    // Add click tracking and visual feedback
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Initialize progress tracker and checkboxes
    initializeProgressTracker();
    
    // Initialize jQuery UI components
    setTimeout(initializeJQueryUI, 100);
});
