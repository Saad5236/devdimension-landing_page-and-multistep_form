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
    <td><img src="${row["project-file"]}" alt="project image" /></td>
    <td>${row["project-description"]}</td>
    <td>${row["project-deadline-date"]}</td>
    <td>$${row["percent_range_start"]} - $${row["percent_range_end"]}</td>
    <td>${row["awareness-source"]}</td>
    </tr>`
  })
  .join("")}`

// contactFormsData.forEach((row) => {
//   const tableRow = document.createElement("tr")
//   tableBody.appendChild(tableRow)

//   tableRow.innerHTML = `<td>${row["your-name"]}</td>
//     <td>${row["your-company-name"]}</td>
//     <td>${row["your-email"]}</td>
//     <td>${row["your-phone-no"]}</td>
//     <td>${`<ul>${row["services"]
//       .map((rowService) => `<li>${rowService}</li>`)
//       .join("")}<ul>`}</td>
//     <td><img src="${row["project-file"]}" alt="project image" /></td>
//     <td>${row["project-description"]}</td>
//     <td>${row["project-deadline-date"]}</td>
//     <td>$${row["percent_range_start"]} - $${row["percent_range_end"]}</td>
//     <td>${row["awareness-source"]}</td>
//   `
// })
