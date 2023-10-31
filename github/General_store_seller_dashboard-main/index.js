let form = document.getElementById("addItemForm");

// Adding event listener to form
form.addEventListener("submit", saveData);

// Function to save data in crudcrud
async function saveData(event) {
  event.preventDefault(); // Prevent the default form submission

  var itemName = document.getElementById("itemname").value;
  var description = document.getElementById("description").value;
  var price = parseFloat(document.getElementById("price").value);
  var quantity = parseInt(document.getElementById("quantity").value);

  var formData = {
    itemName: itemName,
    description: description,
    price: price,
    quantity: quantity,
  };

  try {
    // Send a POST request to your server to save the data
    const response = await axios.post(
      "https://crudcrud.com/api/7ddb030886664e51bfecf965b8936461/itemData",
      formData
    );

    console.log("Data saved successfully:", response.data);

    document.getElementById("addItemForm").reset();

    display(response.data);
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

async function display(obj) {
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
  buyButton1.addEventListener("click", async () => {
    await buyOne(
      obj._id,
      obj.itemName,
      obj.description,
      obj.price,
      obj.quantity
    );
  });

  let buyButton2 = document.createElement("button");
  buyButton2.textContent = "Buy two";
  buyButton2.addEventListener("click", async () => {
    await buyTwo(
      obj._id,
      obj.itemName,
      obj.description,
      obj.price,
      obj.quantity
    );
  });

  let buyButton3 = document.createElement("button");
  buyButton3.textContent = "Buy three";
  buyButton3.addEventListener("click", async () => {
    await buyThree(
      obj._id,
      obj.itemName,
      obj.description,
      obj.price,
      obj.quantity
    );
  });

  let deleteItem = document.createElement("button");
  deleteItem.textContent = "Delete item";
  deleteItem.addEventListener("click", async () => {
    await deleteItemFunction(obj._id);
  });

  li.appendChild(buyButton1);
  li.appendChild(buyButton2);
  li.appendChild(buyButton3);
  li.appendChild(deleteItem);
  items.appendChild(li);
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get(
      "https://crudcrud.com/api/7ddb030886664e51bfecf965b8936461/itemData"
    );
    const itemsContainer = document.getElementById("items");

    itemsContainer.innerHTML = "";

    // Iterate over the retrieved data and display each item
    res.data.forEach(async (item) => {
      await display(item);
    });
  } catch (err) {
    console.log(err);
  }
});

async function buyOne(itemId, itemName, description, price, quantity) {
  if (quantity <= 0) {
    return;
  }

  try {
    // Update quantity and send a PUT request
    const response = await axios.put(
      `https://crudcrud.com/api/7ddb030886664e51bfecf965b8936461/itemData/${itemId}`,
      {
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity - 1,
      }
    );

    await refreshItems();
  } catch (error) {
    console.log(error);
  }
}

async function buyTwo(itemId, itemName, description, price, quantity) {
  if (quantity <= 0) {
    return;
  }

  try {
    // Update quantity and send a PUT request
    const response = await axios.put(
      `https://crudcrud.com/api/7ddb030886664e51bfecf965b8936461/itemData/${itemId}`,
      {
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity - 2,
      }
    );

    await refreshItems();
  } catch (error) {
    console.log(error);
  }
}

async function buyThree(itemId, itemName, description, price, quantity) {
  if (quantity <= 0) {
    return;
  }

  try {
    // Update quantity and send a PUT request
    const response = await axios.put(
      `https://crudcrud.com/api/7ddb030886664e51bfecf965b8936461/itemData/${itemId}`,
      {
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity - 3,
      }
    );

    await refreshItems();
  } catch (error) {
    console.log(error);
  }
}

async function deleteItemFunction(itemId) {
  try {
    console.log("Deleting item with ID:", itemId);
    const response = await axios.delete(
      `https://crudcrud.com/api/7ddb030886664e51bfecf965b8936461/itemData/${itemId}`
    );

    console.log("Deleted successfully:", response.data);

    await refreshItems();
  } catch (error) {
    console.log("Error deleting item:", error);
  }
}

async function refreshItems() {
  try {
    const res = await axios.get(
      "https://crudcrud.com/api/7ddb030886664e51bfecf965b8936461/itemData"
    );
    const itemsContainer = document.getElementById("items");

    // Clear any existing items
    itemsContainer.innerHTML = "";

    // Iterate over the retrieved data and display each item
    res.data.forEach(async (item) => {
      await display(item);
    });
  } catch (err) {
    console.log(err);
  }
}
