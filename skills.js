document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('skills.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const skillsGrid = document.querySelector('.skills-grid');
        
        // Clear any existing content
        skillsGrid.innerHTML = '';
        
        // Create skill elements for each skill
        data.skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.textContent = skill;
            skillsGrid.appendChild(skillElement);
        });
    } catch (error) {
        console.error('Error loading skills:', error);
        const skillsGrid = document.querySelector('.skills-grid');
        skillsGrid.innerHTML = `
            <div class="error-message">
                <h2>Error Loading Skills</h2>
                <p>Unable to load skills data. Please try refreshing the page.</p>
                <p>If the problem persists, please contact me.</p>
            </div>
        `;
    }
}); 