// Function to add a product to the cart
function addToCart(name, price, image) {
    // Retrieve existing cart items from localStorage or initialize an empty array
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Create a new product object
    const product = {
        name: name,
        price: price,
        image: image,
        quantity: 1, // Default quantity is 1
    };

    // Check if the product already exists in the cart
    const existingProductIndex = cartItems.findIndex(item => item.name === name);
    if (existingProductIndex !== -1) {
        // If the product exists, increase its quantity
        cartItems[existingProductIndex].quantity += 1;
    } else {
        // If the product does not exist, add it to the cart
        cartItems.push(product);
    }

    // Save the updated cart items back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Show a success message
    alert(`${name} has been added to your cart.`);
}

// Function to display cart items on the cart page
function displayCartItems() {
    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-container');
    const totalItems = document.getElementById('total-items');
    const totalPrice = document.getElementById('total-price');

    // Clear the cart container
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalItems.textContent = 0;
        totalPrice.textContent = 0;
        return;
    }

    let total = 0;

    // Loop through cart items and display them
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Price: ₹${item.price}</p>
                <div class="quantity-controls">
                    <button class="decrease-btn" onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-btn" onclick="increaseQuantity(${index})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                <button class="save-btn" onclick="saveForLater(${index})">Save for Later</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    totalItems.textContent = cartItems.length;
    totalPrice.textContent = total;
}

// Function to increase the quantity of a product
function increaseQuantity(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems[index].quantity += 1;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
}

// Function to decrease the quantity of a product
function decreaseQuantity(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems();
    } else {
        alert('Quantity cannot be less than 1.');
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
}

// Function to save an item for later
function saveForLater(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

    // Move the item from cart to saved for later
    const item = cartItems.splice(index, 1)[0];
    savedItems.push(item);

    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('savedItems', JSON.stringify(savedItems));

    // Reload the cart and saved items
    displayCartItems();
    displaySavedItems();
}

// Function to display saved items
function displaySavedItems() {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const savedContainer = document.getElementById('saved-container');

    // Clear the saved container
    savedContainer.innerHTML = '';

    if (savedItems.length === 0) {
        savedContainer.innerHTML = '<p>No items saved for later.</p>';
        return;
    }

    savedItems.forEach((item, index) => {
        const savedItem = document.createElement('div');
        savedItem.classList.add('saved-item');
        savedItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="saved-item-image">
            <div class="saved-item-details">
                <h4>${item.name}</h4>
                <p>Price: ₹${item.price}</p>
                <button class="remove-btn" onclick="removeFromSaved(${index})">Remove</button>
                <button class="move-btn" onclick="moveToCart(${index})">Move to Cart</button>
            </div>
        `;
        savedContainer.appendChild(savedItem);
    });
}

// Function to remove an item from saved for later
function removeFromSaved(index) {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    savedItems.splice(index, 1);
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
    displaySavedItems();
}

// Function to move an item back to the cart
function moveToCart(index) {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Move the item from saved for later to cart
    const item = savedItems.splice(index, 1)[0];
    cartItems.push(item);

    // Update localStorage
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Reload the cart and saved items
    displayCartItems();
    displaySavedItems();
}

// Load cart and saved items on page load
window.onload = function () {
    displayCartItems();
    displaySavedItems();
};
// 