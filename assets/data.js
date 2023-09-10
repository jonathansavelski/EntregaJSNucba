const productsData = [
    {
        id: 1,
        name: "Samsung Galaxy S23 128GB - Black",
        price: 899,
        category: "phones",
        img: "./assets/img/products/phones/Samsung-S23.jpg",
    },
    {
        id: 2,
        name: "Google Pixel 7 Pro 128GB - Hazel",
        price: 879,
        category: "phones",
        img: "./assets/img/products/phones/Google-Pixel-7-Pro.jpg",
    },
    {
        id: 3,
        name: "Apple iPhone XR 64GB - Red",
        price: 1199,
        category: "phones",
        img: "./assets/img/products/phones/Apple-iPhone-XR.jpg",
    },
    {
        id: 4,
        name: "OnePlus 10T 5G 256GB - Black",
        price: 639,
        category: "phones",
        img: "./assets/img/products/phones/OnePlus-10T-5G.jpg",
    },
    {
        id: 5,
        name: "Apple Silicone Soft Shell Case for iPhone 14 Pro",
        price: 59,
        category: "cases",
        img: "./assets/img/products/cases/Apple-Silicone.jpg",
    },
    {
        id: 6,
        name: "Samsung Galaxy S23 Case Silicone Ring",
        price: 14,
        category: "cases",
        img: "./assets/img/products/cases/Samsung-Galaxy-S23-Case.jpeg",
    },
    {
        id: 7,
        name: "Spigen Crystal Hybrid Case for Google Pixel 7a",
        price: 29,
        category: "cases",
        img: "./assets/img/products/cases/Google-Pixel-7a-Clear.jpg",
    },
    {
        id: 8,
        name: "Anti-Drop Hybrid Magnetic Case for Google Pixel 7",
        price: 17,
        category: "cases",
        img: "./assets/img/products/cases/Anti-Drop-for-Google-Pixel-7.jpeg",
    },
    {
        id: 9,
        name: "Energizer 20000 mAh USB-A/USB-C Power Bank",
        price: 39,
        category: "chargers",
        img: "./assets/img/products/chargers/Energizer-20000-mAh.jpg",
    },
    {
        id: 10,
        name: "USB-C to 3.5mm Headphone-Jack-Adapter",
        price: 15,
        category: "chargers",
        img: "./assets/img/products/chargers/Google-USB-C-to-3.5mm-Headphone-Jack-Adapter.jpg",
    },
    {
        id: 11,
        name: "PowerPic 10W Wireless Charging Picture",
        price: 120,
        category: "chargers",
        img: "./assets/img/products/chargers/Twelve-South-PowerPic-10W.jpg",
    },
    {
        id: 12,
        name: "3 in 1 Wireless Smartphone Charger 10W",
        price: 9.29,
        category: "chargers",
        img: "./assets/img/products/chargers/Stimula-Lifestyle-3-in-1-Wireless-Smartphone-Charger-10W.png",
    },
    {
        id: 13,
        name: "Gift Card Silver",
        price: 100,
        category: "gift-cards",
        img: "./assets/img/products/Gift-Card.jpg",
    },
    {
        id: 14,
        name: "Git Card Gold",
        price: 300,
        category: "gift-cards",
        img: "./assets/img/products/Gift-Card.jpg",
    },
    {
        id: 15,
        name: "Gift Card Platinum",
        price: 500,
        category: "gift-cards",
        img: "./assets/img/products/Gift-Card.jpg",
    },
];

//divido los productos en arrays de x productos
const divideProductsInParts = (target) => {
    let products = [];
    for (let i = 0; i < productsData.length; i += target)
        products.push(productsData.slice(i, i + target))
    return products;
};

//Estado
const appState = {
    products: divideProductsInParts(8),
    currentProductsIndex: 0,
    productsLimit: divideProductsInParts(8).length,
    activeFilter: null
};


