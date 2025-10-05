// scripts/HTMLinclude.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DYNAMIC COMPONENT LOADER DEBUG ===');
    console.log('Current URL:', window.location.href);
    console.log('Current path:', window.location.pathname);
    console.log('Script location:', document.currentScript?.src);
    
    loadAllIncludes();
});

async function loadAllIncludes() {
    const elements = document.querySelectorAll('[data-include]');
    console.log(`Found ${elements.length} elements with data-include`);
    
    for (const element of elements) {
        const file = element.getAttribute('data-include');
        console.log(`🔄 Attempting to load: ${file}`);
        
        // Try multiple path variations
        const pathAttempts = [
            file,
            `./${file}`,
            `/${file}`,
            `../${file}`,
            `components/${file.split('/').pop()}`,
            `./components/${file.split('/').pop()}`
        ];
        
        let success = false;
        
        for (const attemptPath of pathAttempts) {
            console.log(`  Trying path: ${attemptPath}`);
            
            try {
                const response = await fetch(attemptPath);
                
                if (response.ok) {
                    const html = await response.text();
                    element.innerHTML = html;
                    console.log(`✅ SUCCESS: Loaded ${file} from ${attemptPath}`);
                    success = true;
                    
                    // Set active navigation if header was loaded
                    if (file.includes('header.html')) {
                        setTimeout(setActiveNavLink, 50);
                    }
                    break;
                }
            } catch (error) {
                console.log(`  ❌ Failed: ${attemptPath} - ${error.message}`);
            }
        }
        
        if (!success) {
            const errorHTML = `
                <div style="border: 2px solid red; padding: 10px; margin: 10px; background: #ffe6e6;">
                    <strong>ERROR: Could not load ${file}</strong>
                    <br>Attempted paths: ${pathAttempts.join(', ')}
                    <br>Please check:
                    <ul>
                        <li>File exists at: components/${file.split('/').pop()}</li>
                        <li>Correct folder structure</li>
                        <li>Running on a web server (not file:// protocol)</li>
                    </ul>
                    <button onclick="location.reload()">Retry</button>
                </div>
            `;
            element.innerHTML = errorHTML;
            console.error(`❌ CRITICAL: All paths failed for ${file}`);
        }
    }
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#primary-nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Fallback: If DOMContentLoaded already fired
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    loadAllIncludes();
}