const table = document.getElementById("table-container");
const Axios = axios.create({
  baseURL: "https://crudcrud.com/api/78065c6fd35b4944ba63e4ea1d2adc7c/users",
});
const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});
let rowData = [];

const handleSubmit = (event) => {
  event.preventDefault();

  const formData = {
    Name: event.target.name.value,
    Email_Address: event.target.email.value,
    Phone_Number: event.target.phone_no.value,
  };
  Axios.post("/", formData)
    .then(() => {
      Swal.fire("Appointment Booked!", "", "success");
      showData();
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
    })
    .catch((err) => {
      console.log(err);
    });
};

const showData = () => {
  let html = "";
  Axios.get("/")
    .then((result) => {
      const tableBody = document.getElementById("table-body");
      const data = result.data;
      rowData = data;
      if (data.length > 0) {
        data.forEach((row, index) => {
          html += `<tr class="${row._id}">
          <th scope="row">${index + 1}</th>
          <td>${row.Name}</td>
          <td>${row.Email_Address}</td>
          <td>${row.Phone_Number}</td>
          <td class="d-flex align-items-center gap-2">
             <button class="btn btn-sm btn-primary" onclick="handleEdit('${
               row._id
             }')"><i class='bx bx-edit'></i></button>
           <button class="btn btn-sm btn-danger" onclick="handleDelete('${
             row._id
           }')"><i class='bx bx-trash'></i></button>
          </td>
        </tr>
        `;
        });
        tableBody.innerHTML = html;
      }
      const tableContainer = document.getElementById("table-container");
      if (data.length > 0) {
        tableContainer.classList.remove("d-none"); // Show table
      } else {
        tableContainer.classList.add("d-none"); // Hide table
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

document.addEventListener("DOMContentLoaded", showData);

const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This Appointment will be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#35A29F",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`/${id}`)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Deletion Successful!",
          });
          showData();
        })
        .catch((err) => {
          Swal.fire("Something went Wrong!", "", "error");
        });
    }
  });
};

const handleEdit = (id) => {
  $("#editModal").modal("show");
  const row = rowData.find((item) => item._id === id);
  document.getElementById("Name").value = row.Name;
  document.getElementById("Email").value = row.Email_Address;
  document.getElementById("phone_no").value = row.Phone_Number;
  document.getElementById("itemId").value = row._id;
};

const editItem = () => {
  const data = {
    Name: document.getElementById("Name").value,
    Email_Address: document.getElementById("Email").value,
    Phone_Number: document.getElementById("phone_no").value,
  };
  const endPointId = document.getElementById("itemId").value;
  Axios.put(`/${endPointId}`, data)
    .then(() => {
      $("#editModal").modal("hide"); // Hide the modal

      Toast.fire({
        icon: "success",
        title: "Updation Successful!",
      });

      showData(); // Refresh the data
    })
    .catch(() => {
      Swal.fire("Something went Wrong!", "", "error");
    });
};
