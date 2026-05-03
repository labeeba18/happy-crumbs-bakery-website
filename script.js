document.addEventListener('DOMContentLoaded', () => {

    // --- Product Data (30+ Items) ---
    const products = [
        // Cookies
        { id: 1, name: "Chocolate Chip", price: 250, image: "chocolate_chip_cookie.png", category: "Cookie" },
        { id: 2, name: "Red Velvet", price: 300, image: "red_velvet_cookie.png", category: "Cookie" },
        { id: 3, name: "Oatmeal Raisin", price: 220, image: "oatmeal_raisin_cookie.png", category: "Cookie" },
        { id: 4, name: "Peanut Butter", price: 280, image: "peanut_butter_cookie.png", category: "Cookie" },
        { id: 5, name: "Double Chocolate", price: 320, image: "double_chocolate_cookie.png", category: "Cookie" },
        { id: 6, name: "White Choc Macadamia", price: 350, image: "chocolate_chip_cookie.png", category: "Cookie" },
        { id: 7, name: "Snickerdoodle", price: 240, image: "oatmeal_raisin_cookie.png", category: "Cookie" },
        { id: 8, name: "Gingerbread", price: 260, image: "peanut_butter_cookie.png", category: "Cookie" },
        { id: 9, name: "Lemon Crinkle", price: 270, image: "red_velvet_cookie.png", category: "Cookie" },
        { id: 10, name: "Almond Biscotti", price: 300, image: "oatmeal_raisin_cookie.png", category: "Cookie" },
        { id: 11, name: "Salted Caramel", price: 330, image: "chocolate_chip_cookie.png", category: "Cookie" },
        { id: 12, name: "Coconut Macaroon", price: 290, image: "oatmeal_raisin_cookie.png", category: "Cookie" },
        { id: 13, name: "Shortbread", price: 250, image: "peanut_butter_cookie.png", category: "Cookie" },
        { id: 14, name: "Espresso Cookie", price: 310, image: "double_chocolate_cookie.png", category: "Cookie" },
        { id: 15, name: "Matcha Green Tea", price: 360, image: "chocolate_chip_cookie.png", category: "Cookie" },

        // Cakes & More
        { id: 16, name: "Classic Cheesecake", price: 850, image: "red_velvet_cookie.png", category: "Cake" },
        { id: 17, name: "Chocolate Truffle", price: 950, image: "double_chocolate_cookie.png", category: "Cake" },
        { id: 18, name: "Red Velvet Cake", price: 1100, image: "red_velvet_cookie.png", category: "Cake" },
        { id: 19, name: "Carrot Cake", price: 800, image: "oatmeal_raisin_cookie.png", category: "Cake" },
        { id: 20, name: "Lemon Drizzle", price: 750, image: "chocolate_chip_cookie.png", category: "Cake" },
        { id: 21, name: "Black Forest", price: 900, image: "double_chocolate_cookie.png", category: "Cake" },
        { id: 22, name: "Vanilla Bean", price: 700, image: "peanut_butter_cookie.png", category: "Cake" },
        { id: 23, name: "Strawberry Shortcake", price: 1000, image: "red_velvet_cookie.png", category: "Cake" },
        { id: 24, name: "Pineapple Upside Down", price: 780, image: "chocolate_chip_cookie.png", category: "Cake" },
        { id: 25, name: "Tiramisu", price: 1200, image: "double_chocolate_cookie.png", category: "Cake" },
        { id: 26, name: "Fruit Tart", price: 650, image: "oatmeal_raisin_cookie.png", category: "Pastry" },
        { id: 27, name: "Chocolate Eclair", price: 450, image: "double_chocolate_cookie.png", category: "Pastry" },
        { id: 28, name: "Blueberry Muffin", price: 350, image: "chocolate_chip_cookie.png", category: "Muffin" },
        { id: 29, name: "Choc Chip Muffin", price: 380, image: "double_chocolate_cookie.png", category: "Muffin" },
        { id: 30, name: "Banana Walnut Muffin", price: 360, image: "oatmeal_raisin_cookie.png", category: "Muffin" },
        { id: 31, name: "Brownie", price: 400, image: "double_chocolate_cookie.png", category: "Brownie" },
        { id: 32, name: "Blondie", price: 420, image: "chocolate_chip_cookie.png", category: "Brownie" }
    ];

    // --- Render Products ---
    const productGrid = document.getElementById('product-grid');

    if (productGrid) {
        productGrid.innerHTML = products.map((product, index) => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image" style="animation-delay: ${index * 50}ms">
                <h3>${product.name}</h3>
                <p class="price">₹${product.price}</p>
                <button class="btn btn-secondary add-to-cart-btn" 
                    data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-image="${product.image}">
                    Add to Cart
                </button>
            </div>
        `).join('');
    }

    // --- Cart Logic ---
    const cartOverlay = document.getElementById('cart-overlay');
    const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');

    let cart = [];

    // Open Cart
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cartOverlay.classList.add('active');
        });
    }

    // Close Cart
    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartOverlay.classList.remove('active');
        });
    }

    // Close Cart when clicking outside
    if (cartOverlay) {
        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) {
                cartOverlay.classList.remove('active');
            }
        });
    }

    // Add to Cart Logic (Event Delegation for Dynamic Elements)
    if (productGrid) {
        productGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const btn = e.target;
                const title = btn.getAttribute('data-name');
                const price = parseInt(btn.getAttribute('data-price'));
                const imageSrc = btn.getAttribute('data-image');

                const existingItem = cart.find(item => item.title === title);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        title,
                        price,
                        imageSrc,
                        quantity: 1
                    });
                }

                updateCart();
                if (cartOverlay) cartOverlay.classList.add('active');
            }
        });
    }

    function updateCart() {
        // Update Count
        const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
        if (cartCountElement) cartCountElement.innerText = totalCount;

        // Update Total Price
        const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        if (cartTotalElement) cartTotalElement.innerText = `₹${totalPrice}`;

        // Render Items
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
                return;
            }

            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                // Ensure image path is correct relative to index.html
                // We use the src directly from the img element which is absolute or relative resolved by browser
                // But here we construct HTML string.
                cartItem.innerHTML = `
                    <img src="${item.imageSrc}" alt="${item.title}">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <span class="cart-item-price">₹${item.price} x ${item.quantity}</span>
                    </div>
                    <span class="remove-item" data-title="${item.title}">&times;</span>
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            // Add Listeners to Remove Buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const titleToRemove = e.target.getAttribute('data-title');
                    cart = cart.filter(item => item.title !== titleToRemove);
                    updateCart();
                });
            });
        }
    }

    // --- UI/UX Utils ---
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');

            // Hamburger Animation
            hamburger.classList.toggle('toggle');
        });
    }

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('nav-active');
            if (hamburger) hamburger.classList.remove('toggle');
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {

            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            e.preventDefault();

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Simple scroll animation for elements
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add 'visible' class styles dynamically or via CSS triggers
    // We already set initial styles, now let's handle the trigger
    document.addEventListener('scroll', () => {
        document.querySelectorAll('.section-title, .gallery-item').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });
});
