// generate_json.js
// Function to generate JSON code from form data
function generateJSONCode() {
    // Gather form data
    const formData = {
        firstName: document.getElementById("first-name").value,
        preferredName: document.getElementById("nickname").value || "",
        middleInitial: document.getElementById("middle-name").value ? 
                      document.getElementById("middle-name").value.charAt(0) : "",
        lastName: document.getElementById("last-name").value,
        divider: document.getElementById("divider").value,
        mascotAdjective: document.getElementById("mascot-adjective").value,
        mascotAnimal: document.getElementById("mascot-animal").value,
        image: getImageSource(),
        imageCaption: document.getElementById("picture-caption").value,
        personalStatement: document.getElementById("personal-statement").value,
        personalBackground: document.getElementById("personal-background").value,
        professionalBackground: "Fill in your professional background here",
        academicBackground: document.getElementById("academic-background").value,
        subjectBackground: "Fill in your subject background here",
        primaryComputer: "Fill in your primary computer details here",
        courses: [],
        links: [
            {
                "name": "GitHub",
                "href": "https://github.com/yourusername"
            },
            {
                "name": "GitHub Page", 
                "href": "https://yourusername.github.io"
            },
            {
                "name": "freeCodeCamp",
                "href": "https://www.freecodecamp.org/yourusername"
            },
            {
                "name": "Codecademy",
                "href": "https://www.codecademy.com/profiles/yourusername"
            },
            {
                "name": "LinkedIn",
                "href": "https://www.linkedin.com/in/yourusername"
            }
        ]
    };
    
    // Gather course data
    const courseEntries = document.querySelectorAll(".course-entry");
    courseEntries.forEach((entry) => {
        const inputs = entry.querySelectorAll("input");
        formData.courses.push({
            department: inputs[0].value,
            number: inputs[1].value,
            name: inputs[2].value,
            reason: inputs[3].value
        });
    });
    
    // Validate required fields
    if (!validateForm(formData)) {
        alert("Please fill in all required fields before generating JSON.");
        return;
    }

    // Display the JSON code
    displayJSONCode(formData);
}

// Function to display the generated JSON code
function displayJSONCode(jsonData) {
    // Change the H2 title
    document.querySelector("main h2").textContent = "Introduction JSON";
    
    // Hide the form and instructions
    document.getElementById("form-instructions").style.display = 'none';
    document.getElementById("intro-form").style.display = "none";
    
    // Format JSON with proper indentation
    const jsonString = JSON.stringify(jsonData, null, 2);
    
    // Create the result container with syntax highlighting
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `
        <div class="json-output">
            <h3>Generated JSON Data</h3>
            <p>You can copy the JSON data below to use in your applications:</p>
            <div class="code-container">
                <pre><code class="language-json">${jsonString}</code></pre>
            </div>
            <button type="button" id="copy-json" class="copy-button">Copy JSON Code</button>
            <p id="reset-link" onclick="resetForm()">← Back to Form</p>
        </div>
    `;
    resultContainer.style.display = "block";
    
    // Add copy functionality
    document.getElementById("copy-json").addEventListener("click", function() {
        const textArea = document.createElement("textarea");
        textArea.value = jsonString;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        
        const copyButton = document.getElementById("copy-json");
        const originalText = copyButton.textContent;
        copyButton.textContent = "Copied!";
        copyButton.style.backgroundColor = "#4CAF50";
        
        setTimeout(() => {
            copyButton.textContent = originalText;
            copyButton.style.backgroundColor = "";
        }, 2000);
    });
    
    // Apply syntax highlighting if Highlight.js is available
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add Generate JSON button to the button group
    const buttonGroup = document.querySelector('.button-group');
    const generateJSONButton = document.createElement('button');
    generateJSONButton.type = 'button';
    generateJSONButton.id = 'generate-json-button';
    generateJSONButton.textContent = 'Generate JSON';
    generateJSONButton.style.backgroundColor = '#FF9800'; // Orange color
    
    buttonGroup.appendChild(generateJSONButton);
    
    // Add event listener for the Generate JSON button
    generateJSONButton.addEventListener('click', generateJSONCode);
});