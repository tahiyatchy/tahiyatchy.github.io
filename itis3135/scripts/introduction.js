// Function declarations (moved to top to avoid "used before defined" errors)
function validateForm(formData) {
    // Check if date is selected
    const dateInput = document.getElementById('acknowledgment-date');
    if (!dateInput.value) {
        alert('Please select a valid date');
        return false;
    }
    if (!formData.firstName || !formData.lastName || !formData.acknowledgment || 
        !formData.mascotAdjective || !formData.mascotAnimal || 
        !formData.divider || !formData.pictureCaption || !formData.pictureSourceURL || 
        !formData.personalStatement || !formData.personalBackground || !formData.academicBackground) {
        return false;
    }
    
    return true;
}

function getImageSource() {
    const fileInput = document.getElementById("picture");
    if (fileInput.files && fileInput.files[0]) {
        return URL.createObjectURL(fileInput.files[0]);
    }
    return "images/scenery-course-cover.jpeg";
}

function generateIntroduction() {
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
        alert("Please fill in all required fields.");
        return;
    }

    // Hide h3 instructions
    document.getElementById("form-instructions").style.display = 'none';
    
    // Generate HTML for the introduction
    const resultHTML = `
        <figure>
            <img src="${getImageSource()}" alt="${formData.pictureCaption}" id="cover">
            <figcaption>${formData.pictureCaption} 
                <a href="${formData.pictureSourceURL}">via ${formData.pictureSource}</a>
            </figcaption>
        </figure>
        <p>${formData.personalStatement}</p>
        <ul>
            <li><strong>Personal Background:</strong> ${formData.personalBackground}</li>
            <li><strong>Academic Background:</strong> ${formData.academicBackground}</li>
            <li><strong>Courses I'm taking and why:</strong>
            <ul>
                ${formData.courses.map((course) => 
                    `<li><strong>${course.dept} ${course.number} - ${course.name}:</strong> ${course.reason}</li>`
                ).join('')}
            </ul></li>
        </ul>
        <p id="reset-link" onclick="resetForm()">Reset Form</p>
    `;
    
    // Display the result and hide the form
    document.getElementById("result").innerHTML = resultHTML;
    document.getElementById("result").style.display = "block";
    document.getElementById("intro-form").style.display = "none";
}

// Function to reset the form
function resetForm() {
    document.getElementById("result").style.display = "none";
    document.getElementById("intro-form").style.display = "block";
    document.getElementById("form-instructions").style.display = "block";
}

// Simple Date Selector Functionality
function initializeSimpleDateSelector() {
    const monthSelect = document.getElementById('date-month');
    const daySelect = document.getElementById('date-day');
    const yearSelect = document.getElementById('date-year');
    const hiddenDateInput = document.getElementById('acknowledgment-date');
    const dateDisplay = document.getElementById('selected-date-display');

    // Populate years (current year and 10 years back)
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 10; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    // Populate days (1-31)
    for (let day = 1; day <= 31; day++) {
        const option = document.createElement('option');
        option.value = day.toString().padStart(2, '0');
        option.textContent = day;
        daySelect.appendChild(option);
    }

    // Update date when any selection changes
    function updateDate() {
        const month = monthSelect.value;
        const day = daySelect.value;
        const year = yearSelect.value;

        if (month && day && year) {
            // Validate the date (check for valid day in month)
            const daysInMonth = new Date(year, month, 0).getDate();
            if (parseInt(day) > daysInMonth) {
                dateDisplay.textContent = 'Invalid date for selected month';
                dateDisplay.style.color = '#f44336';
                hiddenDateInput.value = '';
                return;
            }

            const dateString = `${year}-${month}-${day}`;
            hiddenDateInput.value = dateString;
            
            // Format for display
            const date = new Date(year, month - 1, day);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            dateDisplay.textContent = formattedDate;
            dateDisplay.style.color = '#333';
        } else {
            dateDisplay.textContent = 'No date selected';
            dateDisplay.style.color = '#666';
            hiddenDateInput.value = '';
        }
    }

    // Add event listeners
    monthSelect.addEventListener('change', updateDate);
    daySelect.addEventListener('change', updateDate);
    yearSelect.addEventListener('change', updateDate);

    // Set default to current date
    const today = new Date();
    monthSelect.value = (today.getMonth() + 1).toString().padStart(2, '0');
    daySelect.value = today.getDate().toString().padStart(2, '0');
    yearSelect.value = today.getFullYear();
    updateDate();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeSimpleDateSelector();
    
    const formElement = document.getElementById("intro-form");
    formElement.addEventListener("submit", (e) => {
        e.preventDefault(); // prevents page refresh / default behavior
        generateIntroduction();
    });
    
    // Clear button functionality
    const clearButton = document.getElementById("clear-button");
    clearButton.addEventListener("click", function() {
        Array.from(document.querySelectorAll("form input, form textarea")).forEach((input) => {
            input.value = "";
        });
    });
    
    // Add course functionality
    const addCourseButton = document.getElementById("add-course");
    const coursesContainer = document.getElementById("courses-container");
    
    addCourseButton.addEventListener("click", function() {
        const courseEntry = document.createElement("div");
        courseEntry.className = "course-entry";
        courseEntry.innerHTML = `
            <input type="text" name="course-dept" placeholder="Department (e.g., ITIS)" required>
            <input type="text" name="course-number" placeholder="Number (e.g., 3135)" required>
            <input type="text" name="course-name" placeholder="Course Name" required>
            <input type="text" name="course-reason" placeholder="Reason for taking" required>
            <button type="button" class="delete-course">Delete</button>
        `;
        coursesContainer.appendChild(courseEntry);
        
        // Add event listener to the new delete button
        courseEntry.querySelector(".delete-course").addEventListener("click", function() {
            coursesContainer.removeChild(courseEntry);
        });
    });
    
    // Add event listeners to existing delete buttons
    document.querySelectorAll(".delete-course").forEach((button) => {
        button.addEventListener("click", function() {
            coursesContainer.removeChild(button.parentElement);
        });
    });
});