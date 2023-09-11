document.addEventListener("DOMContentLoaded", function () {
  const cardRow = document.getElementById("cardRow");
  const table = document.querySelector(".table");
  const selectedItems = [];

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item, index) => {
        const card = document.createElement("div");

        card.classList.add("col-2");
        const cardContent = document.createElement("div");
        cardContent.classList.add("card", "mb-3");
        cardContent.innerHTML = `
                    <a href="#" id="cardLink${index}">
                        <img src="${item.imgSrc}" class="card-img-top img-fluid" alt="Medicine Image">
                    </a>
                    <p>${item.name}</p>
                `;
        card.appendChild(cardContent);
        cardRow.appendChild(card);
        const cardLink = document.getElementById(`cardLink${index}`);
        cardLink.addEventListener("click", function (event) {
          event.preventDefault();
          selectedItems.push(item);
          updateTable();
        });
      });


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

let input = "";

function appendInput(value) {
  input += value;
  document.getElementById("result").value = input;
}

function clearResult() {
  input = "";
  document.getElementById("result").value = "";
}

function calculate() {
  try {
    const result = eval(input);
    document.getElementById("result").value = result;
    input = "";
  } catch (error) {
    document.getElementById("result").value = "Error";
  }
}
