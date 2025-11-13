// Quiz Data
const quizData = {
    belmont: [
        {
            question: "Which Belmont Report principle requires that participants provide voluntary, informed consent?",
            options: [
                "Respect for Persons",
                "Beneficence", 
                "Justice",
                "Fidelity"
            ],
            correct: 0,
            explanation: "Respect for Persons requires acknowledging autonomy and protecting those with diminished autonomy through informed consent."
        },
        {
            question: "The principle of Justice in the Belmont Report primarily addresses:",
            options: [
                "Fair selection of research subjects",
                "Maximizing benefits to researchers",
                "Quick approval of research protocols",
                "Financial compensation for participants"
            ],
            correct: 0,
            explanation: "Justice ensures the fair distribution of the benefits and burdens of research, including fair subject selection."
        }
    ],
    coi: [
        {
            question: "A researcher stands to gain financially if their study shows positive results. This represents:",
            options: [
                "A conflict of interest",
                "Standard research practice", 
                "Academic freedom",
                "Research efficiency"
            ],
            correct: 0,
            explanation: "Financial conflicts of interest occur when researchers have financial stakes that could influence their research conduct or outcomes."
        }
    ],
    irb: [
        {
            question: "Which type of IRB review is required for research involving more than minimal risk?",
            options: [
                "Full Board Review",
                "Expedited Review",
                "Exempt Review",
                "No review required"
            ],
            correct: 0,
            explanation: "Research involving more than minimal risk requires Full Board Review by the complete IRB committee."
        }
    ],
    data: [
        {
            question: "What is the primary purpose of data de-identification in research?",
            options: [
                "Protect participant confidentiality",
                "Make data analysis easier",
                "Reduce storage costs",
                "Meet publication requirements"
            ],
            correct: 0,
            explanation: "De-identification protects participant confidentiality by removing personally identifiable information."
        }
    ]
};

// Enhanced Scenario Data with Multiple Steps
const scenarios = [
    {
        id: 1,
        title: "Vulnerable Population Research",
        currentStep: 0,
        steps: [
            {
                text: "You're conducting research on educational outcomes and want to include participants from a local homeless shelter. The shelter director is enthusiastic and offers to help recruit participants. What is your first step?",
                choices: [
                    {
                        text: "Accept the director's help and start recruitment immediately",
                        nextStep: 1,
                        feedback: "This approach may create undue influence. Vulnerable populations require careful consideration of coercion risks.",
                        ethicalScore: -1
                    },
                    {
                        text: "Consult with your IRB about special protections needed",
                        nextStep: 2,
                        feedback: "Good start! Consulting your IRB ensures you follow proper protocols for vulnerable populations.",
                        ethicalScore: 1
                    },
                    {
                        text: "Design a separate consent process with additional safeguards",
                        nextStep: 3,
                        feedback: "Proactive approach, but you should still consult your IRB before implementation.",
                        ethicalScore: 0
                    }
                ]
            },
            {
                text: "You proceeded with recruitment through the shelter director. Several residents feel pressured to participate. How do you address this?",
                choices: [
                    {
                        text: "Continue since they already agreed",
                        nextStep: 4,
                        feedback: "Continuing despite signs of coercion violates the principle of Respect for Persons.",
                        ethicalScore: -2
                    },
                    {
                        text: "Pause recruitment and implement independent consent monitors",
                        nextStep: 5,
                        feedback: "Good corrective action! Independent monitors help ensure voluntary participation.",
                        ethicalScore: 1
                    },
                    {
                        text: "Offer financial incentives to reduce perceived pressure",
                        nextStep: 6,
                        feedback: "Financial incentives may exacerbate coercion in vulnerable populations.",
                        ethicalScore: -1
                    }
                ]
            },
            {
                text: "Your IRB recommends additional safeguards. Which approach best implements these?",
                choices: [
                    {
                        text: "Use independent consent advocates not affiliated with the shelter",
                        nextStep: 7,
                        feedback: "Excellent! Independent advocates ensure participants understand they can decline without consequences.",
                        ethicalScore: 2
                    },
                    {
                        text: "Have shelter staff explain the research in more detail",
                        nextStep: 8,
                        feedback: "Shelter staff may still exert influence, even with better explanations.",
                        ethicalScore: 0
                    },
                    {
                        text: "Reduce the number of questions to make participation easier",
                        nextStep: 9,
                        feedback: "Simplifying research doesn't address the fundamental issue of voluntary consent.",
                        ethicalScore: -1
                    }
                ]
            },
            {
                text: "Final Assessment: Based on your choices, your approach demonstrates:",
                choices: [
                    {
                        text: "View Results",
                        nextStep: 10,
                        feedback: "",
                        ethicalScore: 0
                    }
                ]
            }
        ],
        results: {
            excellent: {
                minScore: 4,
                title: "Excellent Ethical Approach",
                description: "Your decisions consistently prioritized participant autonomy and implemented appropriate safeguards for vulnerable populations.",
                principles: ["Respect for Persons", "Beneficence", "Justice"]
            },
            good: {
                minScore: 2,
                title: "Good Ethical Approach",
                description: "You generally made ethical choices but missed some opportunities for optimal protection of vulnerable participants.",
                principles: ["Respect for Persons", "Beneficence"]
            },
            needs_improvement: {
                minScore: 0,
                title: "Needs Improvement",
                description: "Some of your choices risked compromising participant autonomy. Review the Belmont Report principles, especially Respect for Persons.",
                principles: ["Respect for Persons"]
            },
            poor: {
                minScore: -10,
                title: "Significant Ethical Concerns",
                description: "Your approach raised serious ethical concerns regarding coercion and inadequate protections for vulnerable populations.",
                principles: ["All three principles need review"]
            }
        }
    },
    {
        id: 2,
        title: "Data Privacy and Confidentiality",
        currentStep: 0,
        steps: [
            {
                text: "Your research involves collecting sensitive health information about HIV status. During consent, participants are assured of confidentiality. How do you handle the data?",
                choices: [
                    {
                        text: "Store data on encrypted university servers with access logs",
                        nextStep: 1,
                        feedback: "Good start! Proper encryption and access controls are essential for sensitive data.",
                        ethicalScore: 2
                    },
                    {
                        text: "Keep data on a password-protected laptop for convenience",
                        nextStep: 2,
                        feedback: "Insufficient protection for highly sensitive health information.",
                        ethicalScore: -1
                    },
                    {
                        text: "Anonymize data immediately after collection",
                        nextStep: 3,
                        feedback: "Premature anonymization may limit important longitudinal analysis.",
                        ethicalScore: 0
                    }
                ]
            },
            {
                text: "A government health agency requests your raw data for public health surveillance, citing an urgent need. What do you do?",
                choices: [
                    {
                        text: "Provide the data immediately for public health reasons",
                        nextStep: 4,
                        feedback: "This violates confidentiality promises and may breach ethical/legal obligations.",
                        ethicalScore: -2
                    },
                    {
                        text: "Consult your IRB and legal counsel about the request",
                        nextStep: 5,
                        feedback: "Correct approach! Proper channels must be followed for data sharing.",
                        ethicalScore: 2
                    },
                    {
                        text: "Refuse outright, citing confidentiality promises",
                        nextStep: 6,
                        feedback: "While protective of participants, this may miss opportunities for legitimate public health collaboration.",
                        ethicalScore: 0
                    }
                ]
            },
            {
                text: "Your consultation reveals the agency has legal authority to access the data. How do you proceed?",
                choices: [
                    {
                        text: "Provide minimal necessary data with additional security measures",
                        nextStep: 7,
                        feedback: "Good balance! Minimizing data shared while complying with legal requirements.",
                        ethicalScore: 1
                    },
                    {
                        text: "Contact participants to inform them of the disclosure",
                        nextStep: 8,
                        feedback: "Excellent! Maintaining transparency with participants about data sharing.",
                        ethicalScore: 2
                    },
                    {
                        text: "Provide all data as requested without additional measures",
                        nextStep: 9,
                        feedback: "Fails to implement additional protections where possible.",
                        ethicalScore: -1
                    }
                ]
            },
            {
                text: "Final Assessment: Review your data handling decisions",
                choices: [
                    {
                        text: "View Results",
                        nextStep: 10,
                        feedback: "",
                        ethicalScore: 0
                    }
                ]
            }
        ],
        results: {
            excellent: {
                minScore: 6,
                title: "Excellent Data Stewardship",
                description: "You consistently protected participant confidentiality while navigating complex data sharing situations appropriately.",
                principles: ["Respect for Persons", "Beneficence"]
            },
            good: {
                minScore: 3,
                title: "Good Data Management",
                description: "You generally protected participant data well, with some opportunities for improvement in complex situations.",
                principles: ["Respect for Persons"]
            },
            needs_improvement: {
                minScore: 0,
                title: "Needs Improvement",
                description: "Some decisions risked participant confidentiality. Review data protection protocols and legal requirements.",
                principles: ["Respect for Persons"]
            },
            poor: {
                minScore: -10,
                title: "Significant Privacy Concerns",
                description: "Your approach compromised participant confidentiality and failed to implement necessary safeguards.",
                principles: ["All principles need review"]
            }
        }
    },
    {
        id: 3,
        title: "Informed Consent Challenges",
        currentStep: 0,
        steps: [
            {
                text: "You're recruiting participants for a study on workplace stress. The HR department offers to distribute your survey to all employees. What do you do?",
                choices: [
                    {
                        text: "Accept HR's offer for efficient recruitment",
                        nextStep: 1,
                        feedback: "Risk of coercion - employees may feel pressured to participate.",
                        ethicalScore: -1
                    },
                    {
                        text: "Use independent recruitment channels",
                        nextStep: 2,
                        feedback: "Better approach! Prevents perceived coercion from management.",
                        ethicalScore: 2
                    },
                    {
                        text: "Have HR distribute but emphasize voluntary participation",
                        nextStep: 3,
                        feedback: "Some risk remains, but clear communication helps.",
                        ethicalScore: 0
                    }
                ]
            },
            {
                text: "Several participants express confusion about the consent form's technical language. How do you respond?",
                choices: [
                    {
                        text: "Proceed - they signed the form",
                        nextStep: 4,
                        feedback: "Violates informed consent principle - understanding is essential.",
                        ethicalScore: -2
                    },
                    {
                        text: "Revise the consent form to simpler language",
                        nextStep: 5,
                        feedback: "Good! Consent forms should be understandable to participants.",
                        ethicalScore: 2
                    },
                    {
                        text: "Provide verbal explanations but keep the complex form",
                        nextStep: 6,
                        feedback: "Partial solution, but the written form should also be clear.",
                        ethicalScore: 0
                    }
                ]
            },
            {
                text: "A participant wants to withdraw midway but has already provided sensitive data. What is your procedure?",
                choices: [
                    {
                        text: "Honor withdrawal and destroy their data",
                        nextStep: 7,
                        feedback: "Excellent! Respecting autonomy includes honoring withdrawal requests fully.",
                        ethicalScore: 2
                    },
                    {
                        text: "Keep data already collected but stop future collection",
                        nextStep: 8,
                        feedback: "Partial compliance - should honor full withdrawal including data destruction if possible.",
                        ethicalScore: -1
                    },
                    {
                        text: "Try to persuade them to continue",
                        nextStep: 9,
                        feedback: "Inappropriate pressure on participant autonomy.",
                        ethicalScore: -2
                    }
                ]
            },
            {
                text: "Final Assessment: Review your informed consent approach",
                choices: [
                    {
                        text: "View Results",
                        nextStep: 10,
                        feedback: "",
                        ethicalScore: 0
                    }
                ]
            }
        ],
        results: {
            excellent: {
                minScore: 6,
                title: "Excellent Consent Practices",
                description: "You consistently prioritized participant understanding and autonomy throughout the consent process.",
                principles: ["Respect for Persons", "Beneficence"]
            },
            good: {
                minScore: 3,
                title: "Good Consent Approach",
                description: "You generally respected participant autonomy with some areas for improvement in communication.",
                principles: ["Respect for Persons"]
            },
            needs_improvement: {
                minScore: 0,
                title: "Needs Improvement",
                description: "Some decisions compromised informed consent. Review the elements of valid consent.",
                principles: ["Respect for Persons"]
            },
            poor: {
                minScore: -10,
                title: "Significant Consent Issues",
                description: "Your approach failed to ensure proper informed consent and respect for participant autonomy.",
                principles: ["All principles need review"]
            }
        }
    }
];

// Research Assessment Questions
const researchQuestions = [
    {
        question: "Does your research involve any vulnerable populations?",
        options: [
            "No, only competent adults",
            "Yes, children under 18",
            "Yes, prisoners or institutionalized individuals",
            "Yes, economically or educationally disadvantaged persons"
        ],
        weight: 2
    },
    {
        question: "How will you obtain informed consent?",
        options: [
            "Written consent with detailed information",
            "Oral consent with documentation",
            "Implied consent through survey completion",
            "Waiver of consent approved by IRB"
        ],
        weight: 3
    }
];

// Global variables for scenario tracking
let currentScenario = null;
let scenarioScore = 0;
let scenarioPath = [];

// Navigation active state
document.addEventListener('DOMContentLoaded', function() {
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

    // Shuffle modules functionality
    const shuffleBtn = document.getElementById('shuffleModules');
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', shuffleModules);
    }
});

// Shuffle modules function
function shuffleModules() {
    const grid = document.querySelector('.module-grid');
    if (grid) {
        const modules = Array.from(grid.children);
        modules.sort(() => Math.random() - 0.5);
        modules.forEach(module => grid.appendChild(module));
    }
}

// Show content function for learn.html
function showContent(contentId) {
    // Hide all content sections
    const allContent = document.querySelectorAll('.content-section');
    allContent.forEach(content => content.classList.add('hidden'));
    
    // Show selected content
    const selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
    }
}

// Quiz functionality for test.html
let currentQuiz = null;
let currentQuestion = 0;
let score = 0;

function startQuiz(quizType) {
    currentQuiz = quizType;
    currentQuestion = 0;
    score = 0;
    
    const container = document.getElementById('quiz-container');
    const questionElement = document.getElementById('quiz-question');
    const optionsElement = document.getElementById('quiz-options');
    const nextButton = document.getElementById('quiz-next');
    const resultElement = document.getElementById('quiz-result');
    const progressElement = document.getElementById('quiz-progress');
    
    container.classList.remove('hidden');
    resultElement.classList.add('hidden');
    nextButton.classList.add('hidden');
    
    showQuestion();
}

function showQuestion() {
    const questions = quizData[currentQuiz];
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        const progressElement = document.getElementById('quiz-progress');
        const questionElement = document.getElementById('quiz-question');
        const optionsElement = document.getElementById('quiz-options');
        const nextButton = document.getElementById('quiz-next');
        
        progressElement.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
        questionElement.textContent = question.question;
        
        optionsElement.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('div');
            button.className = 'quiz-option';
            button.textContent = option;
            button.onclick = () => selectAnswer(index);
            optionsElement.appendChild(button);
        });
        
        nextButton.classList.add('hidden');
    } else {
        showQuizResult();
    }
}

function selectAnswer(selectedIndex) {
    const questions = quizData[currentQuiz];
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const nextButton = document.getElementById('quiz-next');
    const resultElement = document.getElementById('quiz-result');
    
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === question.correct) {
            option.style.borderLeft = '4px solid #27ae60';
        } else if (index === selectedIndex) {
            option.style.borderLeft = '4px solid #e74c3c';
        }
    });
    
    if (selectedIndex === question.correct) {
        score++;
        resultElement.innerHTML = `<strong>Correct!</strong> ${question.explanation}`;
        resultElement.className = 'quiz-result correct';
    } else {
        resultElement.innerHTML = `<strong>Incorrect.</strong> ${question.explanation}`;
        resultElement.className = 'quiz-result incorrect';
    }
    
    resultElement.classList.remove('hidden');
    nextButton.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function showQuizResult() {
    const container = document.getElementById('quiz-container');
    const questionElement = document.getElementById('quiz-question');
    const optionsElement = document.getElementById('quiz-options');
    const nextButton = document.getElementById('quiz-next');
    const resultElement = document.getElementById('quiz-result');
    const progressElement = document.getElementById('quiz-progress');
    
    questionElement.textContent = '';
    optionsElement.innerHTML = '';
    nextButton.classList.add('hidden');
    progressElement.textContent = '';
    
    const percentage = (score / quizData[currentQuiz].length) * 100;
    resultElement.innerHTML = `
        <h3>Quiz Complete!</h3>
        <p>Your score: ${score} out of ${quizData[currentQuiz].length} (${percentage.toFixed(1)}%)</p>
        <p>${percentage >= 80 ? 'Excellent! You have a strong understanding of this topic.' : 
            percentage >= 60 ? 'Good job! Review the materials to improve your understanding.' : 
            'Consider reviewing the learning materials and trying again.'}</p>
    `;
    resultElement.classList.remove('hidden');
}

// Enhanced Scenario Functionality
function startScenario() {
    // Show scenario selection
    const container = document.getElementById('scenario-container');
    const textElement = document.getElementById('scenario-text');
    const choicesElement = document.getElementById('scenario-choices');
    const feedbackElement = document.getElementById('scenario-feedback');
    const restartButton = document.getElementById('scenario-restart');
    const resetButton = document.getElementById('scenario-reset');
    
    container.classList.remove('hidden');
    feedbackElement.classList.add('hidden');
    restartButton.classList.add('hidden');
    resetButton.classList.add('hidden');
    
    textElement.innerHTML = `
        <h3>Ethical Dilemma Scenarios</h3>
        <p>Choose a scenario to explore complex ethical decision-making in human subjects research:</p>
    `;
    
    choicesElement.innerHTML = '';
    scenarios.forEach((scenario, index) => {
        const button = document.createElement('div');
        button.className = 'scenario-choice';
        button.innerHTML = `
            <strong>${scenario.title}</strong>
            <p>${scenario.steps[0].text.substring(0, 100)}...</p>
        `;
        button.onclick = () => startSpecificScenario(index);
        choicesElement.appendChild(button);
    });
}

function startSpecificScenario(scenarioId) {
    currentScenario = scenarios[scenarioId];
    scenarioScore = 0;
    scenarioPath = [];
    
    const container = document.getElementById('scenario-container');
    const restartButton = document.getElementById('scenario-restart');
    const resetButton = document.getElementById('scenario-reset');
    
    container.classList.remove('hidden');
    restartButton.classList.add('hidden');
    resetButton.classList.remove('hidden');
    
    showScenarioStep(0);
}

function showScenarioStep(stepIndex) {
    const scenario = currentScenario;
    const step = scenario.steps[stepIndex];
    const textElement = document.getElementById('scenario-text');
    const choicesElement = document.getElementById('scenario-choices');
    const feedbackElement = document.getElementById('scenario-feedback');
    const restartButton = document.getElementById('scenario-restart');
    const resetButton = document.getElementById('scenario-reset');
    
    feedbackElement.classList.add('hidden');
    
    // Update scenario title and progress
    textElement.innerHTML = `
        <h3>${scenario.title}</h3>
        <div class="scenario-progress">Step ${stepIndex + 1} of ${scenario.steps.length}</div>
        <p>${step.text}</p>
    `;
    
    choicesElement.innerHTML = '';
    step.choices.forEach((choice, index) => {
        const button = document.createElement('div');
        button.className = 'scenario-choice';
        button.innerHTML = choice.text;
        button.onclick = () => handleScenarioChoice(choice, stepIndex, index);
        choicesElement.appendChild(button);
    });
    
    // Store current step in path
    if (stepIndex > 0) {
        scenarioPath.push(stepIndex);
    }
}

function handleScenarioChoice(choice, currentStepIndex, choiceIndex) {
    const feedbackElement = document.getElementById('scenario-feedback');
    const choicesElement = document.getElementById('scenario-choices');
    const restartButton = document.getElementById('scenario-restart');
    const resetButton = document.getElementById('scenario-reset');
    
    // Update score
    scenarioScore += choice.ethicalScore;
    
    // Disable further choices for this step
    choicesElement.style.pointerEvents = 'none';
    
    // Show feedback if available
    if (choice.feedback) {
        feedbackElement.innerHTML = `
            <h4>Decision Feedback</h4>
            <p>${choice.feedback}</p>
            ${choice.ethicalScore > 0 ? 
                '<p class="positive-feedback">✓ This approach aligns with ethical standards</p>' :
                choice.ethicalScore < 0 ? 
                '<p class="negative-feedback">✗ This approach raises ethical concerns</p>' :
                '<p class="neutral-feedback">→ This approach has both strengths and limitations</p>'
            }
        `;
        feedbackElement.classList.remove('hidden');
    }
    
    // Handle next step or show results
    setTimeout(() => {
        if (choice.nextStep === 10) { // Results step
            showScenarioResults();
        } else {
            showScenarioStep(choice.nextStep);
        }
    }, 2000);
}

function showScenarioResults() {
    const scenario = currentScenario;
    const textElement = document.getElementById('scenario-text');
    const choicesElement = document.getElementById('scenario-choices');
    const feedbackElement = document.getElementById('scenario-feedback');
    const restartButton = document.getElementById('scenario-restart');
    const resetButton = document.getElementById('scenario-reset');
    
    // Determine result category
    let resultCategory = 'poor';
    for (const [category, details] of Object.entries(scenario.results)) {
        if (scenarioScore >= details.minScore) {
            resultCategory = category;
            break;
        }
    }
    
    const result = scenario.results[resultCategory];
    
    textElement.innerHTML = `
        <h3>Scenario Complete: ${scenario.title}</h3>
        <div class="scenario-score">Ethical Decision Score: ${scenarioScore}</div>
    `;
    
    choicesElement.innerHTML = '';
    feedbackElement.innerHTML = `
        <div class="result-header ${resultCategory}">
            <h4>${result.title}</h4>
        </div>
        <p>${result.description}</p>
        <div class="principles-applied">
            <strong>Key Ethical Principles:</strong>
            <ul>
                ${result.principles.map(principle => `<li>${principle}</li>`).join('')}
            </ul>
        </div>
        <div class="path-summary">
            <strong>Your Path:</strong> ${scenarioPath.length} decision points completed
        </div>
    `;
    feedbackElement.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    resetButton.classList.add('hidden');
    
    // Add event listener for restart button
    restartButton.onclick = startScenario;
    resetButton.onclick = () => startSpecificScenario(scenarios.indexOf(currentScenario));
}

// Research Assessment functionality
function startResearchAssessment() {
    alert('Research assessment functionality would be implemented similarly to the quiz system with questions about methodology, participant selection, data handling, and consent procedures.');
}