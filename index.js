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
      "https://crudcrud.com/api/bef7949c448c45b082716b046c13dbd1/itemData",
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
  let buyButton1 = document.createElement("button");
  buyButton1.textContent = "Buy One";
  buyButton1.addEventListener("click", function () {
    // Call the buyOne function with the item's ID when the button is clicked

    buyOne(obj._id, obj.itemName, obj.description, obj.price, obj.quantity);
  });

  let buyButton2 = document.createElement("button");
  buyButton2.textContent = "Buy two";
  buyButton2.addEventListener("click", function () {
    buyTow(obj._id, obj.itemName, obj.description, obj.price, obj.quantity);
  });

  let buyButton3 = document.createElement("button");
  buyButton3.textContent = "Buy three";
  buyButton3.addEventListener("click", function () {
    buyThree(obj._id, obj.itemName, obj.description, obj.price, obj.quantity);
  });

  let deleteItem = document.createElement("button");
  deleteItem.textContent = "Delete item";
  deleteItem.addEventListener("click", () => {
    var itemIdToDelete = obj._id;

    function deleteItem(itemId) {
      console.log("Deleting item with ID:", itemId);
      axios
        .delete(
          "https://crudcrud.com/api/bef7949c448c45b082716b046c13dbd1/itemData/" +
            itemId
        )
        .then((res) => {
          console.log("Deleted successfully:", res.data);
          window.location.reload();
        })
        .catch((err) => {
          console.log("Error deleting item:", err);
        });
    }
    deleteItem(itemIdToDelete);
  });
  // Append the newly created 'li' element to the 'items' container
  li.appendChild(buyButton1);
  li.appendChild(buyButton2);
  li.appendChild(buyButton3);
  li.appendChild(deleteItem);
  items.appendChild(li);
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/bef7949c448c45b082716b046c13dbd1/itemData")
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
function buyOne(itemId, itemName, description, price, quantity) {
  if (quantity <= 0) {
    // Quantity is already zero or negative, no further action needed
    return;
  }
  axios
    .put(
      "https://crudcrud.com/api/bef7949c448c45b082716b046c13dbd1/itemData/" +
        itemId,
      {
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity - 1,
      }
    )
    .then((res) => {
      axios
        .get(
          "https://crudcrud.com/api/bef7949c448c45b082716b046c13dbd1/itemData"
        )
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
    })
    .catch((err) => {
      console.log(err);
    });
}
function buyTow(itemId, itemName, description, price, quantity) {
  if (quantity <= 0) {
    // Quantity is already zero or negative, no further action needed
    return;
  }
  axios
    .put(
      "https://crudcrud.com/api/bef7949c448c45b082716b046c13dbd1/itemData/" +
        itemId,
      {
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity - 2,
      }
    )
    .then((res) => {
      axios
        .get(
          "https://crudcrud.com/api/bef7949c448c45b082716b046c13dbd1/itemData"
        )
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
    })
    .catch((err) => {
      console.log(err);
    });
}
function buyThree(itemId, itemName, description, price, quantity) {
  if (quantity <= 0) {
    // Quantity is already zero or negative, no further action needed
    return;
  }
  axios
    .put(
      "https://crudcrud.com/api/bef7949c448c45b082716b046c13dbd1/itemData/" +
        itemId,
      {
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity - 3,
      }
    )
    .then((res) => {
      axios
        .get(
          "https://crudcrud.com/api/bef7949c448c45b082716b046c13dbd1/itemData"
        )
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
    })
    .catch((err) => {
      console.log(err);
    });
}

//function to delete item
