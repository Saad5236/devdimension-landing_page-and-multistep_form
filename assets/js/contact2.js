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

// DRAG DROP AND BROWSE IMAGES HANDLING

let dragDropZone = document.querySelector(".drop-images-drag")
let fileInput = document.querySelector("#project-file-input")
let imgCanvas = document.querySelector(".img-canvas")
let contactForm = document.querySelector(".contact-form")
let imgSrcs = []

let events = ["dragenter", "dragover", "dragleave", "drop"]
events.forEach((eventName) => {
  dragDropZone.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults(event) {
  event.preventDefault()
  event.stopPropagation()
}

// Drag and drop

dragDropZone.addEventListener("drop", handleDrop, false)

function handleDrop(event) {
  const dt = event.dataTransfer
  const files = dt.files

  handleFiles(files)
  console.log("working...1")
}

function handleFiles(files) {
  ;[...files].forEach(uploadFile)
  console.log("working...2")
}

function uploadFile(file) {
  const reader = new FileReader()

  reader.onload = function (event) {
    imgSrcs.push(event.target.result)

    dragDropZone.querySelector(
      ".dropped-images"
    ).innerHTML += `<div class="dropped-img"><img src="${event.target.result}" /><span>X</span></div>`

    document.querySelectorAll(".dropped-img span").forEach((delBtn, index) => {
      delBtn.addEventListener("click", (e) => {
        imgSrcs.splice(index, 1)
        delBtn.parentNode.remove()
      })
    })
  }

  reader.readAsDataURL(file)
  console.log("working...3")
}

// Browse file

fileInput.addEventListener("change", handleFileInput, false)

function handleFileInput(event) {
  const files = event.target.files
  handleFiles(files)
}

contactForm.addEventListener("submit", (e) => {
  if (!validateContactForm()) {
    e.preventDefault()
    return
  }

  const contacFormDataObj = new FormData(contactForm)
  let contactFormData = {}

  // Iterate over form data

  contacFormDataObj.forEach((value, key) => {
    contactFormData[key] = value
  })

  contactFormData.percent_range_start = contacFormDataObj
      .get("percent_range")
      .split(",")[0]
    contactFormData.percent_range_end = contacFormDataObj
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

    contactFormData.project_file_imgs = imgSrcs

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
})
