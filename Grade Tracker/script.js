// Get DOM elements
const subjectInput = document.getElementById('subject-input');
const gradeInput = document.getElementById('grade-input');
const totalSubjectsEl = document.getElementById('total-subjects');
const averageGradeEl = document.getElementById('average-grade');
const gradesDisplayEl = document.getElementById('grades-display');

// Array to store grades
let grades = [];

// Function to add a new grade
function addGrade() {
    const subject = subjectInput.value.trim();
    const grade = parseInt(gradeInput.value);
    
    // Validation
    if (!subject) {
        alert('Please enter a subject name');
        return;
    }
    
    if (isNaN(grade) || grade < 0 || grade > 100) {
        alert('Please enter a valid grade between 0 and 100');
        return;
    }
    
    // Add grade to array
    grades.push({
        subject: subject,
        grade: grade
    });
    
    // Clear inputs
    subjectInput.value = '';
    gradeInput.value = '';
    
    // Update display
    updateDisplay();
}

// Function to update the display
function updateDisplay() {
    // Update total subjects
    totalSubjectsEl.textContent = grades.length;
    
    // Calculate and update average
    if (grades.length > 0) {
        const average = grades.reduce((sum, item) => sum + item.grade, 0) / grades.length;
        averageGradeEl.textContent = average.toFixed(1);
    } else {
        averageGradeEl.textContent = '0';
    }
    
    // Update grades list
    gradesDisplayEl.innerHTML = '';
    
    grades.forEach((gradeItem, index) => {
        const li = document.createElement('li');
        
        const gradeClass = getGradeClass(gradeItem.grade);
        
        li.innerHTML = `
            <span>${gradeItem.subject}</span>
            <span class="grade-value ${gradeClass}">${gradeItem.grade}%</span>
        `;
        
        gradesDisplayEl.appendChild(li);
    });
}

// Function to determine grade class based on score
function getGradeClass(grade) {
    if (grade >= 90) return 'grade-a';
    if (grade >= 80) return 'grade-b';
    if (grade >= 70) return 'grade-c';
    if (grade >= 60) return 'grade-d';
    return 'grade-f';
}

// Add event listener for Enter key
subjectInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        gradeInput.focus();
    }
});

gradeInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addGrade();
    }
});

// Initialize display
updateDisplay();