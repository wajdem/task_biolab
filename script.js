document.addEventListener("DOMContentLoaded", function () {
    // Get the 'cardRow' element.
    const cardRow = document.getElementById("cardRow");
    // Find the first element with class 'table'.
    const table = document.querySelector(".table");
    // Array to store selected items.
    const selectedItems = [];
  
    // Fetch and process data from 'data.json'.
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        // Iterate over data items.
        data.forEach((item, index) => {
          // Create a new card element.
          const card = document.createElement("div");
          card.classList.add("col-2");
          
          // Create card content with image and name.
          const cardContent = document.createElement("div");
          cardContent.classList.add("card", "mb-3");
          cardContent.innerHTML = `
            <a href="#" id="cardLink${index}">
              <img src="${item.imgSrc}" class="card-img-top img-fluid" alt="Medicine Image">
            </a>
            <p class="name">${item.name}</p>
          `;
          card.appendChild(cardContent);
          cardRow.appendChild(card);
  
          // Add event listener to card link.
          const cardLink = document.getElementById(`cardLink${index}`);
          cardLink.addEventListener("click", function (event) {
            event.preventDefault();
            selectedItems.push(item);
            updateTable();
          });
        });
  
        // Update the table with selected items.
        function updateTable() {
          const tableBody = table.querySelector("tbody");
          tableBody.innerHTML = "";
  
          let totalPrice = 0;
          selectedItems.forEach((item, index) => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
              <th scope="row">${index + 1}</th>
              <td>${item.name}</td>
              <td>${item.Price}</td>
            `;
            tableBody.appendChild(tableRow);
            totalPrice += item.Price;
          });
  
          const totalRow = document.createElement("tr");
          totalRow.innerHTML = `
            <th scope="row"></th>
            <td>Total</td>
            <td>${totalPrice}</td>
          `;
          tableBody.appendChild(totalRow);
        }
      });
  });
  
  // Global variable 'input' for calculator.
  let input = "";
  
  // Function to append value to 'input'.
  function appendInput(value) {
    input += value;
    document.getElementById("result").value = input;
  }
  
  // Function to clear 'input'.
  function clearResult() {
    input = "";
    document.getElementById("result").value = "";
  }
  
  // Function to calculate and display result.
  function calculate() {
    try {
      const result = eval(input);
      document.getElementById("result").value = result;
      input = "";
    } catch (error) {
      document.getElementById("result").value = "Error";
    }
  }
  