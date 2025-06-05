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
            
            // Create links array with only non-empty links
            const links = [];
            if (project.itch) links.push({ type: 'itch', url: project.itch });
            if (project.github) links.push({ type: 'github', url: project.github });
            if (project.steam) links.push({ type: 'steam', url: project.steam });
            if (project.other1) links.push({ type: 'other1', url: project.other1 });
            if (project.other2 && links.length < 4) links.push({ type: 'other2', url: project.other2 });
            if (project.other3 && links.length < 4) links.push({ type: 'other3', url: project.other3 });
            if (project.other4 && links.length < 4) links.push({ type: 'other4', url: project.other4 });
            
            // Create links HTML
            const linksHtml = links.map((link, index) => {
                let imgSrc;
                let others = 1;
                switch(link.type) {
                    case 'itch':
                        imgSrc = 'Images/itchLogo.png';
                        break;
                    case 'github':
                        imgSrc = 'Images/GitHubLogo.png';
                        break;
                    case 'steam':
                        imgSrc = 'Images/SteamLogo.png';
                        break;
                    default:
                        imgSrc = `Images/${projectNameNoSpaces} ${others}.png`;
                        others++;
                }
                return `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer">
                        <img src="${imgSrc}" alt="${link.type} Link" onerror="this.src='Images/placeholder.png'">
                    </a>
                `;
            }).join('');
            
            card.innerHTML = `
                <div class="project-content">
                    <div class="project-image">
                        <div class="project-info">
                            <h2>${project.name}</h2>
                        </div>
                        <img src="Images/${projectNameNoSpaces}.png" alt="${project.name}" onerror="this.src='Images/placeholder.png'">
                    </div>
                    <div class="project-description">
                        <p>${project.description.replace(/\\n/g, '<br>')}</p>
                    </div>
                    <div class="project-links" data-links="${links.length}">
                        ${linksHtml}
                    </div>
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
                <p>If the problem persists, please contact me.</p>
            </div>
        `;
    }
}); 