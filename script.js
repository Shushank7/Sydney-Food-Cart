let cart = [];

function switchTab(tabId) {
    // Hide all views
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from nav links
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected view
    document.getElementById(tabId + '-view').classList.add('active');
    
    // Add active class to clicked link
    event.target.classList.add('active');
    
    // Close cart if open
    document.getElementById('cart-modal').classList.remove('open');
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    
    // Visual feedback
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = 'Added!';
    btn.style.backgroundColor = '#4c7a59';
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = '#1a4d2e';
    }, 1000);
}

function updateCartUI() {
    // Update count badge
    document.getElementById('cart-count').innerText = cart.length;
    
    // Update cart items list
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    
    // Group items by name to show quantities (simplified logic)
    const itemCounts = {};
    cart.forEach(item => {
        if(itemCounts[item.name]) {
            itemCounts[item.name].count++;
        } else {
            itemCounts[item.name] = { price: item.price, count: 1 };
        }
        total += item.price;
    });

    for (const [name, details] of Object.entries(itemCounts)) {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <span class="cart-item-name">${details.count}x ${name}</span>
            <span class="cart-item-price">$${(details.price * details.count).toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(itemEl);
    }
    
    // Update total
    document.getElementById('cart-total-price').innerText = '$' + total.toFixed(2);
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('open');
}

function checkout() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    // Close modal
    toggleCart();
    
    // Switch to checkout view
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('checkout-view').classList.add('active');
    
    // Populate checkout items
    const checkoutItemsContainer = document.getElementById('checkout-items');
    checkoutItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    const itemCounts = {};
    cart.forEach(item => {
        if(itemCounts[item.name]) {
            itemCounts[item.name].count++;
        } else {
            itemCounts[item.name] = { price: item.price, count: 1 };
        }
        subtotal += item.price;
    });

    for (const [name, details] of Object.entries(itemCounts)) {
        const itemEl = document.createElement('div');
        itemEl.className = 'checkout-item';
        itemEl.innerHTML = `
            <div class="checkout-item-details">
                <span class="checkout-item-name">${details.count}x ${name}</span>
                <span class="checkout-item-desc">Premium quality</span>
            </div>
            <span>$${(details.price * details.count).toFixed(2)}</span>
        `;
        checkoutItemsContainer.appendChild(itemEl);
    }
    
    const delivery = 5.00;
    const tax = 6.00;
    const grandTotal = subtotal + delivery + tax;
    
    document.getElementById('checkout-subtotal').innerText = '$' + subtotal.toFixed(2);
    document.getElementById('checkout-grand-total').innerText = '$' + grandTotal.toFixed(2);
    document.getElementById('btn-final-total').innerText = '$' + grandTotal.toFixed(2);
}

function submitBooking(event) {
    event.preventDefault(); // Prevent form submission
    
    // Hide form, show success message
    document.getElementById('booking-form').style.display = 'none';
    document.getElementById('booking-success').style.display = 'block';
    
    // Reset after 3 seconds
    setTimeout(() => {
        document.getElementById('booking-form').reset();
        document.getElementById('booking-form').style.display = 'block';
        document.getElementById('booking-success').style.display = 'none';
    }, 3000);
}

function filterMenu(category) {
    // Update active tab styling
    document.querySelectorAll('.menu-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter items
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'flex';
        } else {
            const categories = card.getAttribute('data-category') || '';
            if (categories.includes(category)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

function placeFinalOrder() {
    alert("Payment successful! Your order is being prepared.");
    cart = [];
    updateCartUI();
    
    // Switch back to home
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('home-view').classList.add('active');
    
    // Reset nav
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('nav a').classList.add('active');
}

// Event listeners for payment methods
document.addEventListener('DOMContentLoaded', () => {
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const paymentDetailsCard = document.getElementById('payment-details-card');

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            // Update active styling
            document.querySelectorAll('.payment-card').forEach(card => {
                card.classList.remove('active');
            });
            e.target.closest('.payment-card').classList.add('active');

            // Show/hide card details form
            if (e.target.value === 'card') {
                paymentDetailsCard.style.display = 'block';
            } else {
                paymentDetailsCard.style.display = 'none';
            }
        });
    });
});
