document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch the projects data
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const projectsContainer = document.querySelector('#projects');
        
        // Clear any existing content
        projectsContainer.innerHTML = '';
        
        // Create project cards for each project
        data.projects.forEach(project => {
            const projectNameNoSpaces = project.name.replace(/\s+/g, '');
            const card = document.createElement('div');
            card.className = 'project-card';
            
            card.innerHTML = `
                <div class="project-image">
                    <img src="Images/${projectNameNoSpaces}.png" alt="${project.name}" onerror="this.src='Images/placeholder.png'">
                </div>
                <div class="project-links">
                    <a href="${project.itch}" target="_blank" rel="noopener noreferrer">
                        <img src="Images/itchLogo.svg" alt="Itch.io Link" onerror="this.src='Images/placeholder.png'">
                    </a>
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer">
                        <img src="Images/GitHubLogo.png" alt="GitHub Link" onerror="this.src='Images/placeholder.png'">
                    </a>
                </div>
                <div class="project-info">
                    <h2>${project.name}</h2>
                    <p>${project.description.replace(/\\n/g, '<br>')}</p>
                </div>
            `;
            
            projectsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        const projectsContainer = document.querySelector('#projects');
        projectsContainer.innerHTML = `
            <div class="error-message">
                <h2>Error Loading Projects</h2>
                <p>Unable to load project data. Please try refreshing the page.</p>
                <p>If the problem persists, please check that the projects.json file exists and is properly formatted.</p>
            </div>
        `;
    }
}); 