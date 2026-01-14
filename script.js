// Ancient Book Portfolio - JavaScript

let currentPage = 1;
const totalPages = 4;
const pages = ['about', 'skills', 'projects', 'contact'];

// Open the book
function openBook() {
    const bookCover = document.getElementById('bookCover');
    const bookContainer = document.getElementById('bookContainer');
    
    bookCover.style.transform = 'scale(0)';
    bookCover.style.opacity = '0';
    
    setTimeout(() => {
        bookCover.style.display = 'none';
        bookContainer.style.display = 'block';
    }, 500);
}

// Close the book
function closeBook() {
    const bookCover = document.getElementById('bookCover');
    const bookContainer = document.getElementById('bookContainer');
    
    bookContainer.style.opacity = '0';
    
    setTimeout(() => {
        bookContainer.style.display = 'none';
        bookCover.style.display = 'block';
        bookCover.style.transform = 'scale(1)';
        bookCover.style.opacity = '1';
    }, 300);
}

// Turn to a specific page
function turnToPage(pageName) {
    const pageIndex = pages.indexOf(pageName);
    if (pageIndex !== -1) {
        currentPage = pageIndex + 1;
        updatePage();
    }
}

// Next page
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updatePage();
    }
}

// Previous page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePage();
    }
}

// Update page display
function updatePage() {
    // Hide all pages
    const allPages = document.querySelectorAll('.page-content');
    allPages.forEach(page => page.classList.remove('active'));
    
    // Show current page
    const currentPageId = pages[currentPage - 1] + 'Page';
    const currentPageElement = document.getElementById(currentPageId);
    if (currentPageElement) {
        currentPageElement.classList.add('active');
    }
    
    // Update page indicator
    const pageIndicator = document.getElementById('pageIndicator');
    if (pageIndicator) {
        pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
    
    // Add page turn animation
    const rightPage = document.querySelector('.right-page');
    if (rightPage) {
        rightPage.style.animation = 'none';
        setTimeout(() => {
            rightPage.style.animation = 'pageTurn 0.6s ease';
        }, 10);
    }
}

// Contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            alert('Prithee, fill in all fields of the scroll!');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Thy electronic post address appears to be invalid!');
            return;
        }
        
        alert(`Hark! Thy message hath been received, ${name}. I shall respond posthaste to ${email}.`);
        contactForm.reset();
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const bookContainer = document.getElementById('bookContainer');
    if (bookContainer && bookContainer.style.display !== 'none') {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
            nextPage();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            prevPage();
        } else if (e.key === 'Escape') {
            closeBook();
        }
    } else if (e.key === 'Enter' || e.key === ' ') {
        const bookCover = document.getElementById('bookCover');
        if (bookCover && bookCover.style.display !== 'none') {
            openBook();
        }
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updatePage();
    
    // Console message
    console.log('%c📜 Welcome to the Ancient Chronicle', 'font-size: 20px; font-weight: bold; color: #c9a961;');
    console.log('%cCrafted with care in the old style', 'font-size: 14px; color: #8b6f47;');
    console.log('%chttps://github.com/AzadNishad', 'font-size: 14px; color: #c9a961;');
});

// Add page turn animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pageTurn {
        0% {
            opacity: 0.7;
            transform: rotateY(5deg);
        }
        100% {
            opacity: 1;
            transform: rotateY(0deg);
        }
    }
`;
document.head.appendChild(style);
