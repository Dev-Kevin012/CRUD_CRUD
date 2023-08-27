const Axios = axios.create({
  baseURL: "https://crudcrud.com/api/dc276fe39ca548deb4d218bd4b44b515/users",
});
const handleSubmit = (event) => {
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const phone_number = event.target.phone_no.value;

  const formData = {
    Name: name,
    Email_Address: email,
    Phone_Number: phone_number,
  };
  Axios.post("/", formData)
    .then(() => {
      alert("Details Saved!");
      showData();
    })
    .catch((err) => {
      console.log(err);
    });
};

const showData = () => {
  Axios.get("/")
    .then((result) => {
      const data = result.data;
      const table = document.querySelector("#table-container table");
      const tbody = table.querySelector("tbody");
      const thead = table.querySelector("thead");

      // Clear existing tbody content
      tbody.innerHTML = "";

      // Populate the table header
      if (thead.children.length === 0) {
        const headerRow = document.createElement("tr");
        Object.keys(data[0]).forEach((headerText) => {
          const headerCell = document.createElement("th");
          headerCell.textContent = headerText;
          headerRow.appendChild(headerCell);
        });
        thead.appendChild(headerRow);
      }

      // Populate the table body with new data
      data.forEach((item) => {
        const row = document.createElement("tr");
        Object.values(item).forEach((value) => {
          const cell = document.createElement("td");
          cell.textContent = value;
          row.appendChild(cell);
        });
        tbody.appendChild(row);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

document.addEventListener("DOMContentLoaded", showData);
