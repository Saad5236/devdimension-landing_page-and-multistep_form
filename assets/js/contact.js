document
  .querySelector(".contact-service-inputs")
  .addEventListener("click", function (event) {
    if (event.target.closest(".contact-service-input input")) {
      // Toggle red border
      event.target
        .closest(".contact-service-input")
        .classList.toggle("contact-service-input-active")

      // Toggle active-tick visibility
      let activeTick = event.target
        .closest(".contact-service-input")
        .querySelector(".active-tick")
      activeTick.classList.toggle("active-tick-visible")

      // toggle box image
      let contactServiceImages = event.target
        .closest(".contact-service-input")
        .querySelectorAll("label div *")
      contactServiceImages[0].classList.toggle("contact-service-active-image")
      contactServiceImages[1].classList.toggle("contact-service-active-image")
    }
  })

// Form range selector

OmRangeSlider.init()

// ___________MULTI STEP FORM HANDLING____________
let currentTab = 0
showTab(currentTab)

function showTab(n) {
  let contactFormTabs = document.querySelectorAll(".contact-form-tab")

  contactFormTabs[n].style.display = "block"

  if (n == 0) {
    document
      .querySelector(".contact-form-prev-btn")
      .setAttribute("style", "display: none !important")
  } else {
    document
      .querySelector(".contact-form-prev-btn")
      .setAttribute("style", "display: flex !important")
  }

  if (n == contactFormTabs.length - 1) {
    document
      .querySelector(".contact-form-next-btn")
      .setAttribute("style", "display: none !important")
    document
      .querySelector(".contact-form-submit-btn")
      .setAttribute("style", "display: flex !important")
  } else {
    document
      .querySelector(".contact-form-next-btn")
      .setAttribute("style", "display: flex !important")
    document
      .querySelector(".contact-form-submit-btn")
      .setAttribute("style", "display: none !important")
  }

  // Contact step highlighting

  let contactSteps = document.querySelectorAll(".contact-step")
  contactSteps.forEach((i) => {
    i.classList.remove("active-contact-step")
  })
  contactSteps[n].classList.add("active-contact-step")
}

function nextPrev(n) {
  let contactFormTabs = document.querySelectorAll(".contact-form-tab")

  // If fields are empty
  if (n === 1 && !validateContactForm()) return false

  // If fields are filled
  contactFormTabs[currentTab].style.display = "none"
  currentTab += n
  // If you've reached end of form
  if (currentTab >= contactForm.length) {
    document.querySelector(".contact-form").submit()
    return false
  }
  showTab(currentTab)
}

function validateContactForm() {
  let formTabs = document.querySelectorAll(".contact-form-tab")
  let formTabFields = formTabs[currentTab].querySelectorAll("input")
  if (currentTab === 2) {
    formTabFields = [
      ...formTabFields,
      formTabs[currentTab].querySelector("textarea"),
    ]
  }
  let valid = true
  for (let i = 0; i < formTabFields.length; i++) {
    formTabFields[i].classList.remove("is-invalid")
  }

  if (currentTab == 1) {
    var serviceCheckboxes = []
    for (let i = 0; i < formTabFields.length; i++) {
      if (formTabFields[i].checked === true) serviceCheckboxes.push(true)
    }

    if (serviceCheckboxes.length > 0) {
      return true
    } else {
      return false
    }
  }

  for (let i = 0; i < formTabFields.length; i++) {
    if (formTabFields[i].value === "" || formTabFields[i].value === undefined) {
      formTabFields[i].classList.add("is-invalid")
      valid = false
    }
  }

  if (valid) {
    for (let i = 0; i < formTabFields.length; i++) {
      formTabFields[i].classList.remove("is-invalid")
    }
  }

  return valid
}

// let contactForm = document.querySelector(".contact-form")
// contactForm.addEventListener("submit", (e) => {
//   if (!validateContactForm()) {
//     e.preventDefault()
//     return
//   }

//   const contacFormtDataObj = new FormData(contactForm)
//   let contactFormData = {}
//   contacFormtDataObj.forEach((value, key) => {
//     contactFormData[key] = value
//   })

//   contactFormData.percent_range_start = contacFormtDataObj
//     .get("percent_range")
//     .split(",")[0]
//   contactFormData.percent_range_end = contacFormtDataObj
//     .get("percent_range")
//     .split(",")[1]
//   const checkedCheckBoxes = document.querySelectorAll(
//     ".contact-service-input input[type=checkbox]:checked"
//   )
//   contactFormData.services = Array.from(checkedCheckBoxes).map(
//     (checkbox) => checkbox.value
//   )

//   let contactFormsData =
//     JSON.parse(localStorage.getItem("contactFormsData")) || []
//   contactFormsData.push(contactFormData)
//   localStorage.setItem("contactFormsData", JSON.stringify(contactFormsData))
//   console.log(contactFormsData)

//   window.location.href = "/Practice/devdimensions_website/contactData.html"
//   e.preventDefault()
// })

let contactForm = document.querySelector(".contact-form")
contactForm.addEventListener("submit", (e) => {
  if (!validateContactForm()) {
    e.preventDefault()
    return
  }

  const contacFormtDataObj = new FormData(contactForm)
  let contactFormData = {}

  // Iterate over form data
  contacFormtDataObj.forEach((value, key) => {
    // If the value is a File object (uploaded image), convert it to a data URL
    if (value instanceof File) {
      const reader = new FileReader()
      reader.onload = function(event) {
        // Store the data URL in the form data object
        contactFormData[key] = event.target.result

        // Proceed with other form data processing
        processData()
      }
      reader.readAsDataURL(value) // Read the file as data URL
    } else {
      // For non-file fields, simply store the value in the form data object
      contactFormData[key] = value
    }
  })

  // Function to process other form data
  function processData() {
    // Split the percent range if needed
    contactFormData.percent_range_start = contacFormtDataObj
      .get("percent_range")
      .split(",")[0]
    contactFormData.percent_range_end = contacFormtDataObj
      .get("percent_range")
      .split(",")[1]

    // Get checked checkboxes
    const checkedCheckBoxes = document.querySelectorAll(
      ".contact-service-input input[type=checkbox]:checked"
    )
    // Store the values of checked checkboxes
    contactFormData.services = Array.from(checkedCheckBoxes).map(
      (checkbox) => checkbox.value
    )

    // Get existing contact forms data from localStorage
    let contactFormsData =
      JSON.parse(localStorage.getItem("contactFormsData")) || []
    // Push the new form data into the array
    contactFormsData.push(contactFormData)
    // Save the updated data back to localStorage
    localStorage.setItem("contactFormsData", JSON.stringify(contactFormsData))

    // Redirect to the next page
    window.location.href = "/Practice/devdimensions_website/contactData.html"
    e.preventDefault()
  }
})

