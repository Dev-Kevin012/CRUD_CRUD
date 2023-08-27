const table = document.getElementById("table-container");
const Axios = axios.create({
  baseURL: "https://crudcrud.com/api/dc276fe39ca548deb4d218bd4b44b515/users",
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
      Swal.fire("Appointment Booked!", "", "success");
      showData();
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
      if (data.length == 0) {
        document.getElementById("table-container").classList.add("d-none");
        return;
      }
      document.getElementById("table-container").classList.remove("d-none");
      data.forEach((row, index) => {
        html += `<tr class="${row._id}">
        <th scope="row">${index + 1}</th>
        <td>${row.Name}</td>
        <td>${row.Email_Address}</td>
        <td>${row.Phone_Number}</td>
        <td class="text-center align-middle">
         <button class="btn btn-sm btn-danger" onclick="handleDelete('${
           row._id
         }')"><i class='bx bx-trash'></i></button>
        </td>
      </tr>
      `;
      });
      tableBody.innerHTML = html;
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
