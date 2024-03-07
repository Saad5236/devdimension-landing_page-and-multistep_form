let contactFormsData =
  Array.from(JSON.parse(localStorage.getItem("contactFormsData"))) || []
let tableBody = document.querySelector("tbody")

tableBody.innerHTML += `${contactFormsData
  .map((row) => {
    return `<tr>
    <td>${row["your-name"]}</td>
    <td>${row["your-company-name"]}</td>
    <td>${row["your-email"]}</td>
    <td>${row["your-phone-no"]}</td>
    <td>${`<ul>${row["services"]
      .map((rowService) => `<li>${rowService}</li>`)
      .join("")}<ul>`}</td>
    <td><ul>${row["project_file_imgs"]
      .map((rowProjectImg) => `<li><img src="${rowProjectImg}" alt="img" /></li>`)
      .join("")}</ul></td>
    <td>${row["project-description"]}</td>
    <td>${row["project-deadline-date"]}</td>
    <td>$${row["percent_range_start"]} - $${row["percent_range_end"]}</td>
    <td>${row["awareness-source"]}</td>
    </tr>`
  })
  .join("")}`
