'use strict';

// Initialize EmailJS first
emailjs.init("c4JbhVGGhFOugRIwZ");

// Toast function
function showToast(message, isError = false) {
  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'error' : 'success'}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Contact form handling
const form = document.querySelector("[data-form]");
const formBtn = document.querySelector("[data-form-btn]");
let isSubmitting = false;

if (form) {
  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    isSubmitting = true;
    formBtn.disabled = true;
    formBtn.innerHTML = 'Sending...';

    try {
      const formData = {
        from_name: form.querySelector('[name="fullname"]').value,
        from_email: form.querySelector('[name="email"]').value,
        message: form.querySelector('[name="message"]').value
      };

      const response = await emailjs.send(
        'service_0xnzih5',
        'template_b9k6p9r',
        formData
      );

      if (response.status === 200) {
        showToast('Message sent successfully!');
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }

    } catch (error) {
      console.error('Error:', error);
      showToast('Failed to send message. Please try again.', true);
    } finally {
      isSubmitting = false;
      formBtn.disabled = false;
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
    }
  });
}

// element toggle function
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar); 
});


// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Function to set active page
function setActivePage(pageName) {
  pages.forEach((page) => {
    if (page.dataset.page === pageName) {
      page.classList.add("active");
      // Find and activate corresponding nav link
      navigationLinks.forEach((link) => {
        if (link.innerHTML.toLowerCase() === pageName) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    } else {
      page.classList.remove("active");
    }
  });
}

// Check localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedPage = localStorage.getItem("activePage");
  if (savedPage) {
    setActivePage(savedPage);
  } else {
    // Default to 'about' if no saved page
    setActivePage("about");
  }
});

// add event to all nav link
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const clickedPage = this.innerHTML.toLowerCase();
    
    // Save to localStorage
    localStorage.setItem("activePage", clickedPage);
    
    setActivePage(clickedPage);
    window.scrollTo(0, 0);
  });
});

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}
