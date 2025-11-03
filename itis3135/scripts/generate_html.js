// generate_html.js
// Function to display the generated HTML code
function displayHTMLCode(htmlCode) {
    // Change the H2 title
    document.querySelector("main h2").textContent = "Introduction HTML";
    
    // Hide the form and instructions
    document.getElementById("form-instructions").style.display = 'none';
    document.getElementById("intro-form").style.display = "none";
    
    // Create the result container with syntax highlighting
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `
        <div class="html-output">
            <h3>Generated HTML Code</h3>
            <p>You can copy the HTML code below to use on your introduction page:</p>
            <div class="code-container">
                <pre><code class="language-html">${htmlCode}</code></pre>
            </div>
            <button type="button" id="copy-html" class="copy-button">Copy HTML Code</button>
            <p id="reset-link" onclick="resetForm()">← Back to Form</p>
        </div>
    `;
    resultContainer.style.display = "block";
    
    // Add copy functionality
    document.getElementById("copy-html").addEventListener("click", function() {
        const textArea = document.createElement("textarea");
        textArea.value = htmlCode.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        
        const copyButton = document.getElementById("copy-html");
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
// Function to generate HTML code from form data
function generateHTMLCode() {
    // Gather form data
    const formData = {
        firstName: document.getElementById("first-name").value,
        middleName: document.getElementById("middle-name").value,
        nickname: document.getElementById("nickname").value,
        lastName: document.getElementById("last-name").value,
        acknowledgment: document.getElementById("acknowledgment").value,
        acknowledgmentDate: document.getElementById("acknowledgment-date").value,
        mascotAdjective: document.getElementById("mascot-adjective").value,
        mascotAnimal: document.getElementById("mascot-animal").value,
        divider: document.getElementById("divider").value,
        pictureCaption: document.getElementById("picture-caption").value,
        pictureSourceURL: document.getElementById("picture-source-url").value,
        pictureSource: document.getElementById("picture-source").value,
        personalStatement: document.getElementById("personal-statement").value,
        personalBackground: document.getElementById("personal-background").value,
        academicBackground: document.getElementById("academic-background").value,
        courses: []
    };
    
    // Gather course data
    const courseEntries = document.querySelectorAll(".course-entry");
    courseEntries.forEach((entry) => {
        const inputs = entry.querySelectorAll("input");
        formData.courses.push({
            dept: inputs[0].value,
            number: inputs[1].value,
            name: inputs[2].value,
            reason: inputs[3].value
        });
    });
    
    // Validate required fields
    if (!validateForm(formData)) {
        alert("Please fill in all required fields before generating HTML.");
        return;
    }

    // Generate the HTML code as a string with proper formatting
    let htmlCode = `&lt;h2&gt;Introduction HTML&lt;/h2&gt;\n`;
    
    // Name header
    let nameHeader = formData.firstName;
    if (formData.middleName) {
        nameHeader += ` ${formData.middleName}`;
    }
    if (formData.nickname) {
        nameHeader += ` "${formData.nickname}"`;
    }
    nameHeader += ` ${formData.lastName}`;
    nameHeader += ` ${formData.divider} ${formData.mascotAdjective} ${formData.mascotAnimal}`;
    
    htmlCode += `&lt;h3&gt;${nameHeader}&lt;/h3&gt;\n\n`;
    
    // Figure with image
    htmlCode += `&lt;figure&gt;\n`;
    htmlCode += `    &lt;img src="${getImageSource()}" alt="${formData.pictureCaption}" /&gt;\n`;
    htmlCode += `    &lt;figcaption&gt;${formData.pictureCaption} &lt;a href="${formData.pictureSourceURL}"&gt;via ${formData.pictureSource}&lt;/a&gt;&lt;/figcaption&gt;\n`;
    htmlCode += `&lt;/figure&gt;\n\n`;
    
    // Personal statement
    htmlCode += `&lt;p&gt;${formData.personalStatement}&lt;/p&gt;\n\n`;
    
    // List items
    htmlCode += `&lt;ul&gt;\n`;
    htmlCode += `    &lt;li&gt;&lt;strong&gt;Personal Background:&lt;/strong&gt; ${formData.personalBackground}&lt;/li&gt;\n`;
    htmlCode += `    &lt;li&gt;&lt;strong&gt;Academic Background:&lt;/strong&gt; ${formData.academicBackground}&lt;/li&gt;\n`;
    
    // Courses
    htmlCode += `    &lt;li&gt;&lt;strong&gt;Courses I'm taking and why:&lt;/strong&gt;\n`;
    htmlCode += `    &lt;ul&gt;\n`;
    formData.courses.forEach((course) => {
        htmlCode += `        &lt;li&gt;&lt;strong&gt;${course.dept} ${course.number} - ${course.name}:&lt;/strong&gt; ${course.reason}&lt;/li&gt;\n`;
    });
    htmlCode += `    &lt;/ul&gt;&lt;/li&gt;\n`;
    htmlCode += `&lt;/ul&gt;\n\n`;
    
    // Acknowledgment
    htmlCode += `&lt;p&gt;&lt;em&gt;${formData.acknowledgment} ${formData.acknowledgmentDate}&lt;/em&gt;&lt;/p&gt;`;
    
    // Display the HTML code
    displayHTMLCode(htmlCode);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add Generate HTML button to the button group
    const buttonGroup = document.querySelector('.button-group');
    const generateHTMLButton = document.createElement('button');
    generateHTMLButton.type = 'button';
    generateHTMLButton.id = 'generate-html-button';
    generateHTMLButton.textContent = 'Generate HTML';
    generateHTMLButton.style.backgroundColor = '#9C27B0'; // Purple color
    
    buttonGroup.appendChild(generateHTMLButton);
    
    // Add event listener for the Generate HTML button
    generateHTMLButton.addEventListener('click', generateHTMLCode);
});