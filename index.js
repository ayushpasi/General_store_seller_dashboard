let form = document.getElementById("addItemForm");

// Adding event listener to form
form.addEventListener("submit", saveData);

// Function to save data in crudcrud
function saveData(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the form values
  var itemName = document.getElementById("itemname").value;
  var description = document.getElementById("description").value;
  var price = parseFloat(document.getElementById("price").value);
  var quantity = parseInt(document.getElementById("quantity").value);

  // Create a data object to send via Axios
  var formData = {
    itemName: itemName,
    description: description,
    price: price,
    quantity: quantity,
  };

  // Send a POST request to your server to save the data
  axios
    .post(
      "https://crudcrud.com/api/292bde80cbd1430a935352286212ea45/itemData",
      formData
    )
    .then(function (response) {
      console.log("Data saved successfully:", response.data);

      // Clear the form fields
      document.getElementById("addItemForm").reset();

      // Call the display function to show the newly added item
      display(response.data);
    })
    .catch(function (error) {
      console.error("Error saving data:", error);
    });
}

function display(obj) {
  let items = document.getElementById("items");
  let li = document.createElement("li");
  li.textContent =
    obj.itemName +
    " " +
    obj.description +
    "  " +
    obj.price +
    "rs" +
    "  " +
    obj.quantity;
  let buyButton = document.createElement("button");
  buyButton.textContent = "Buy One";
  buyButton.addEventListener("click", function () {
    // Call the buyOne function with the item's ID when the button is clicked

    buyOne(obj._id, obj.quantity);
  });

  // Append the newly created 'li' element to the 'items' container
  items.appendChild(li);
  li.appendChild(buyButton);
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/292bde80cbd1430a935352286212ea45/itemData")
    .then((res) => {
      // Clear any existing items
      document.getElementById("items").innerHTML = "";

      // Iterate over the retrieved data and display each item
      res.data.forEach((item) => {
        display(item);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
function buyOne(itemId, currentQuantity) {
  if (currentQuantity <= 0) {
    // Quantity is already zero or negative, no further action needed
    return;
  }

  axios
    .patch(
      `https://crudcrud.com/api/292bde80cbd1430a935352286212ea45/itemData/${itemId}`,
      { quantity: currentQuantity - 1 }
    )
    .then(function (response) {
      console.log("Quantity decreased successfully:", response.data);
      // Refresh the list of items after decreasing quantity
    })
    .catch(function (error) {
      console.error("Error decreasing quantity:", error);
    });
}
