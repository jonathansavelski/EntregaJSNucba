const header = document.getElementById("header");
const menuList = document.querySelector(".nav-list");
const menuBtn = document.querySelector(".menu-label");
const overlay = document.querySelector(".overlay");
const navClose = document.querySelector(".nav-close-icon");
const main = document.getElementById("main");

//Carrito
const cartLabel = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const cartContainer = document.querySelector(".cart-container");
const btnAdd = document.querySelector(".btn-add");
const total = document.querySelector(".total");
const cartBubble = document.querySelector(".cart-bubble");
const btnCheckout = document.querySelector(".btn-checkout");

//Contenedor de productos
const productsContainer = document.querySelector(".products-container");
const showMoreBtn = document.querySelector(".btn-show-more");

//Contenedor de categorías
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category")


const toggleMenu = () => {
    menuList.classList.add("menu-opened");
    menuList.classList.toggle("menu-closed");
    overlay.classList.toggle("show-overlay");
    cartMenu.classList.remove("show-cart");
}

const toggleCart = () => {

    if (!cart.length) {
        Swal.fire({
            icon: 'error',
            title: 'Cart empty',
            text: 'There are no products in the cart',
        })
        cartMenu.classList.remove("show-cart");
    }
    else {
        cartMenu.classList.add("show-cart");
    }
}

// Comportamiento durante el scroll
const onScroll = () => {
    var scrollPosition = window.scrollY;

    if (scrollPosition >= 100) {
        header.classList.add("gradient");
        cartBubble.classList.add("bubble-black");
    }
    if (scrollPosition <= 100) {
        header.classList.remove("gradient");
        cartBubble.classList.remove("bubble-black");
    }
}

const createProductTemplate = (product) => {
    const { id, name, price, img } = product;
    return `
    <div class="card card-product" style="width: 18rem;">
        <img src=${img} class="card-img" alt=${name}>
        <div class="card-body">
            <h4 class="card-title">${name}</h4>
            <span class="card-price">U$S ${price}</span>
            <button class="btn btn-primary btn-add"
                data-id='${id}'
                data-name='${name}'
                data-price='${price}'
                data-img='${img}'>Add product</button>
        </div>
    </div>
    `;
}

//función que permite el renderizado de productos 
const renderProducts = (products) => {
    productsContainer.innerHTML += products
        .map(createProductTemplate)
        .join("")
}

//función para saber si el índice actual renderizado de la lista de productos es igual al límite de productos
const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit - 1;
}

//función para mostrar más productos ante el click del usuario en el botón "show more"
const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add("hidden");
    }

}

// chequeo si el botón que se apretó es un botón de categoría
const filterBtnIsInactive = (element) => {
    return (
        element.classList.contains("category")
    );
}

//Filtro de categoría
const applyFilter = ({ target }) => {
    if (!filterBtnIsInactive(target)) return;
    changeFilterState(target);
    productsContainer.innerHTML = '';
    if (appState.activeFilter) {
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return;
    }
    renderProducts(appState.products[0]);
}

//cambio el estado del filtro
const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState(appState.activeFilter);
    showMoreVisibility();
}

//función para cambiar el estado de los botones de categorías
const changeBtnActiveState = (category) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== category) {
            categoryBtn.classList.remove("active");
            return;
        }
        categoryBtn.classList.add("active");
    })
}

//renderizar los productos filtrados
const renderFilteredProducts = () => {
    const filteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter
    );
    renderProducts(filteredProducts);
}

//función para mostrar u ocultar el botón de "ver más" según corresponsa
const showMoreVisibility = () => {
    if (!appState.activeFilter) {
        showMoreBtn.classList.remove("hidden")
        return
    }
    showMoreBtn.classList.add("hidden")
}

const closeOnScroll = () => {
    if (
        !cartMenu.classList.contains("show-cart")
    ) {
        return
    };
    cartMenu.classList.remove("show-cart");
};

//función para cerrar el menú hamburguesa y el overlay cuando se hace click en un link
const closeOnClick = (e) => {
    if (!e.target.classList.contains("nav-link")) {
        return
    };
    menuList.classList.remove("menu-opened");
    menuList.classList.toggle("menu-closed");
    overlay.classList.remove("show-overlay");
};

//función para cerrar el menú hamburguesa o el carrito y ocultar el overlay cuando el usuario hace clik en el overlay
const closeOnOverlayClick = () => {
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("show-cart");
    overlay.classList.remove("show-overlay");
}

//local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const createCartTemplate = (product) => {
    const { id, name, price, img, quantity } = product;
    return `
        <div class="card cart-card">
            <img src=${img} class="cart-card-img" alt=${name}> 
            <div class="cart-card-body">
                <h4 class="cart-card-title">${name}</h4>
                <div class="cart-card-bottom">
                <span class="cart-card-price">U$S ${price}</span>      
                    <div class="item-handler">
                        <span class="quantity-handler down" data-id=${id}>-</span>
                        <span class="item-quantity">${quantity}</span>
                        <span class="quantity-handler up" data-id=${id}>+</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

const getCartTotal = () => {
    return cart.reduce((accumulator, currentValue) => accumulator + Number(currentValue.price) * currentValue.quantity, 0)
}

const cartTotal = () => {
    total.innerHTML = `${getCartTotal()} U$S`;
}

const renderCart = () => {
    if (!cart.length) {
        cartContainer.innerHTML = `
        <p class="cart-empty-msj">There are no products added.</p>`;
        btnCheckout.classList.add("disabled");
        return;
    }
    cartContainer.innerHTML = cart.map(createCartTemplate).join("");
    btnCheckout.classList.remove("disabled");
}

const addProduct = (e) => {

    if (!e.target.classList.contains("btn-add")) { return };

    const product = createProductData(e.target.dataset);
    //comprobación si el producto ya está en el carrito
    if (isExistingProduct(product)) {
        addUnit(product);
        Swal.fire(
            'Another unit added to cart!',
            '',
            'success'
        )
    }
    else {
        createCartProduct(product);
        Swal.fire(
            'Product added to cart!',
            '',
            'success'
        )
    }
    updateCart();
}

const createProductData = (product) => {
    const { id, name, price, img } = product;
    return { id, name, price, img };
}

const isExistingProduct = (product) => {
    return cart.find((item) => item.id === product.id);
}

const addUnit = (product) => {
    cart = cart.map((cartProduct) =>
        cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct
    )
}

const createCartProduct = (product) => {
    cart = [...cart, { ...product, quantity: 1 }];
}

const renderCartBubble = () => {
    cartBubble.textContent = cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
    }, 0);
}

const updateCart = () => {
    saveCart();
    renderCart();
    cartTotal();
    renderCartBubble();
}

const addQuantity = (id) => {
    const existingProduct = cart.find((product) => product.id === id);
    addUnit(existingProduct);
}

const removeQuantity = (id) => {
    const existingProduct = cart.find((product) => product.id === id);

    if (existingProduct.quantity === 1) {

        Swal.fire({
            title: '¿Do you want to delete this product from the cart?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', '', 'success')
                removeProduct(existingProduct);
                cartMenu.classList.remove("show-cart");
            }
        })

        // if (window.confirm("¿Do you want to delete this product from the cart?")) {
        //     removeProduct(existingProduct);
        // }
        return;
    }
    substractUnit(existingProduct);
}

const removeProduct = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id);
    updateCart();
}

const substractUnit = (existingProduct) => {
    cart = cart.map((product) => {
        return product.id === existingProduct.id
            ? { ...product, quantity: Number(product.quantity) - 1 }
            : product;
    })
}

const handleQuantity = (e) => {
    if (e.target.classList.contains("down")) {
        removeQuantity(e.target.dataset.id);
    } else if (e.target.classList.contains("up")) {
        addQuantity(e.target.dataset.id);
    }
    updateCart();
};

const completePurchase = () => {
    Swal.fire({
        title: 'Do you want to complete the purchase?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'blue',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Purchase completed!',
                '',
                'success'
            )
            resetCartItems();
            cartMenu.classList.remove("show-cart");
        }
    })
}

const resetCartItems = () => {
    cart = [];
    updateCart();
};

// Función inicializadora
const init = () => {
    renderProducts(appState.products[0]);
    menuBtn.addEventListener("click", toggleMenu);
    document.addEventListener("scroll", onScroll);
    navClose.addEventListener("click", toggleMenu);
    showMoreBtn.addEventListener("click", showMoreProducts);
    categoriesContainer.addEventListener("click", applyFilter);
    cartLabel.addEventListener("click", toggleCart);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", cartTotal);
    productsContainer.addEventListener("click", addProduct);
    renderCartBubble(cart);
    window.addEventListener("scroll", closeOnScroll);
    menuList.addEventListener("click", closeOnClick);
    overlay.addEventListener("click", closeOnOverlayClick);
    cartContainer.addEventListener("click", handleQuantity);
    btnCheckout.addEventListener("click", completePurchase);
}

init();