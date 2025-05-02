// JavaScript for enhanced interactivity
document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer for scroll animations
  const sections = document.querySelectorAll('.section, .hero, .footer');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
  });

  const form = document.getElementById('contactForm');
  if (!form) return;

  // Form validation
  form.addEventListener('submit', function(e) {
    let isValid = true;
    
    // Validate name
    const nameInput = document.getElementById('name');
    if (nameInput.value.length < 3) {
      nameInput.parentElement.classList.add('invalid');
      nameInput.nextElementSibling.textContent = 'Please enter at least 3 characters';
      isValid = false;
    } else {
      nameInput.parentElement.classList.remove('invalid');
    }
    
    // Validate email
    const emailInput = document.getElementById('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      emailInput.parentElement.classList.add('invalid');
      emailInput.nextElementSibling.textContent = 'Please enter a valid email address';
      isValid = false;
    } else {
      emailInput.parentElement.classList.remove('invalid');
    }
    
    // Validate message
    const messageInput = document.getElementById('message');
    if (messageInput.value.length < 10) {
      messageInput.parentElement.classList.add('invalid');
      messageInput.nextElementSibling.textContent = 'Please enter at least 10 characters';
      isValid = false;
    } else {
      messageInput.parentElement.classList.remove('invalid');
    }
    
    if (!isValid) {
      e.preventDefault();
      return;
    }
    
    // Show loading spinner
    const submitBtn = document.getElementById('submitBtn');
    const submitText = submitBtn.querySelector('.submit-text');
    const spinner = submitBtn.querySelector('.spinner');
    
    submitText.textContent = 'Sending...';
    spinner.classList.remove('hidden');
    submitBtn.disabled = true;
  });

  // Real-time validation
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.parentElement.classList.remove('invalid');
      }
    });
  });

  // Project card hover effect enhancement
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
  });

   // Slideshow functionality
   const slides = document.querySelectorAll('.slide');
   let currentSlide = 0;
   
   function showSlide(index) {
     slides.forEach(slide => slide.classList.remove('active'));
     slides[index].classList.add('active');
   }
   
   function nextSlide() {
     currentSlide = (currentSlide + 1) % slides.length;
     showSlide(currentSlide);
   }
   
   // Start the slideshow
   if (slides.length > 0) {
     showSlide(0);
     setInterval(nextSlide, 3000); // Change slide every 3 seconds
   }

   // Typewriter Effect
  const typewriterText = document.getElementById('typewriter-text');
  const professions = [
    'Computer Science Student',
    'Software Developer',
    'UX/UI Designer',
    'Aspiring Full-Stack Developer',
    'Aspiring Data Scientist'
  ];
  let professionIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 125; // ms per character

  function typeWriter() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
      // Backspace effect
      typewriterText.textContent = currentProfession.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Typing effect
      typewriterText.textContent = currentProfession.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    // Determine next action
    if (!isDeleting && charIndex === currentProfession.length) {
      // Pause at end of word
      isDeleting = true;
      typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
      // Move to next word
      isDeleting = false;
      professionIndex = (professionIndex + 1) % professions.length;
      typingSpeed = 800; // Pause before typing next word
    }

    setTimeout(typeWriter, typingSpeed);
  }

  // Start the typewriter effect after a brief delay
  setTimeout(typeWriter, 500);

  
});