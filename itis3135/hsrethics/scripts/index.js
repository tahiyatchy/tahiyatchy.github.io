function loadClinicalTrialsExample() {
    $.ajax({
        url: 'https://clinicaltrials.gov/api/query/study_fields?expr=ethics+research&fields=NCTId,BriefTitle,Condition,OverallStatus&min_rnk=1&max_rnk=5&fmt=json',
        method: 'GET',
        success: function(data) {
            if (data.StudyFieldsResponse && data.StudyFieldsResponse.StudyFields) {
                displayClinicalTrials(data.StudyFieldsResponse.StudyFields);
            } else {
                displayFallbackTrials();
            }
        },
        error: function() {
            displayFallbackTrials();
        }
    });
}

function displayClinicalTrials(trials) {
    let trialsHTML = '<h4>Current Clinical Trials Involving Ethics Research</h4>';
    trials.forEach(trial => {
        trialsHTML += `
            <div class="trial-example">
                <h5>${trial.BriefTitle ? trial.BriefTitle[0] : 'Ethics in Clinical Research Study'}</h5>
                <p><strong>Status:</strong> ${trial.OverallStatus ? trial.OverallStatus[0] : 'Recruiting or Active'}</p>
                <p><strong>Clinical Trial ID:</strong> ${trial.NCTId ? trial.NCTId[0] : 'NCTXXXXXXX'}</p>
                <p><strong>Focus:</strong> ${trial.Condition ? trial.Condition[0] : 'Research Ethics and Participant Protection'}</p>
            </div>
        `;
    });
    trialsHTML += `<p><small>Source: ClinicalTrials.gov API - Real-time clinical trials data</small></p>`;
    $('#clinical-trials-data').html(trialsHTML);
}

function displayFallbackTrials() {
    $('#clinical-trials-data').html(`
        <h4>Example Clinical Trials Involving Ethics Research</h4>
        <div class="trial-example">
            <h5>Ethical Considerations in Vulnerable Population Research</h5>
            <p><strong>Status:</strong> Active, not recruiting</p>
            <p><strong>Focus:</strong> Informed consent processes in cognitively impaired populations</p>
            <p><em>This example illustrates the importance of special ethical considerations when working with vulnerable groups.</em></p>
        </div>
        <div class="trial-example">
            <h5>Data Privacy and Confidentiality in Genetic Research</h5>
            <p><strong>Status:</strong> Recruiting</p>
            <p><strong>Focus:</strong> Ethical data handling in genomic studies</p>
            <p><em>Demonstrates current challenges in maintaining privacy while advancing genetic research.</em></p>
        </div>
        <p><small>Note: These are representative examples. Real clinical trials data would load here when available.</small></p>
    `);
}

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    loadClinicalTrialsExample();

    const sections = document.querySelectorAll('.lazy-section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});