document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a, .logo, .cta-button[data-page]');
    const pageSections = document.querySelectorAll('.page-section');
    const headerHeight = document.querySelector('header').offsetHeight; // Dynamically get header height

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            if (!targetPage) return;
            
            // Update active section
            pageSections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetPage).classList.add('active');
            
            // Update active navigation link
            navLinks.forEach(navLink => {
                if (navLink.getAttribute('data-page') === targetPage) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            });
            
            // Update URL hash
            window.location.hash = targetPage;
            
            // Scroll to top
            //window.scrollTo(0, 0);
            // Scroll to the section smoothly and account for fixed header
            const yOffset = -headerHeight; // Use the dynamically calculated header height
            //const yOffset = -80; // adjust based on your header height
            const y = document.getElementById(targetPage).getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });
    
    // Handle URL hash on page load
    function handleHash() {
        const hash = window.location.hash.substring(1) || 'home';
        const targetSection = document.getElementById(hash);
        
        if (targetSection) {
            pageSections.forEach(section => {
                section.classList.remove('active');
            });
            targetSection.classList.add('active');
            
            navLinks.forEach(navLink => {
                if (navLink.getAttribute('data-page') === hash) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            });
        }
    }
    
    // Initial hash handling
    handleHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHash);
    
    // Contact form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would handle the form submission here
            // For this demo, just show an alert
            alert('This is a demo. In a real website, this form would send your message.');
            contactForm.reset();
        });
    }
});