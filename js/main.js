document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animation (Fade In)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
    
    // Header shadow on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            header.style.background = 'rgba(15, 15, 18, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(15, 15, 18, 0.8)';
        }
    });
    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            const subject = `Portfolio Contact from ${name}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage:%0D%0A${message}`;
            
            window.location.href = `mailto:sharathkl2442@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            // Optional: Clear form after sending
            contactForm.reset();
        });
    }

    // Resume Preview Modal Logic
    const previewResumeBtn = document.getElementById('preview-resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (previewResumeBtn && resumeModal) {
        previewResumeBtn.addEventListener('click', () => {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeModal = () => {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        // Close on backdrop click
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Copy Email to Clipboard Logic
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailTextSpan = document.getElementById('email-text');
    const copyToast = document.getElementById('copy-toast');
    const emailAddress = "Sharathkl2442@gmail.com";

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailAddress).then(() => {
                // Visual feedback on button
                const originalHtml = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = `<i class="fas fa-check" style="color: #10b981;"></i> <span>Copied!</span>`;
                copyEmailBtn.style.borderColor = '#10b981';

                // Show toast notification
                if (copyToast) {
                    copyToast.classList.add('show');
                    setTimeout(() => {
                        copyToast.classList.remove('show');
                    }, 2500);
                }

                // Revert button after 2s
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalHtml;
                    copyEmailBtn.style.borderColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
                window.location.href = `mailto:${emailAddress}`;
            });
        });
    }
});
