// use local storage to manage cart data
const addToDb = (id) => {
	let shoppingCart = {};

	//get the shopping cart from local storage
	const storedCart = localStorage.getItem("shopping-cart");
	if (storedCart) {
		shoppingCart = JSON.parse(storedCart);
	}

	// add quantity
	const quantity = shoppingCart[id];
	if (quantity) {
		const newQuantity = quantity + 1;
		shoppingCart[id] = newQuantity;
	} else {
		shoppingCart[id] = 1;
	}
	localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
};
const getLocalStorage = () => {
	let shoppingCart = {};
	const storedCart = localStorage.getItem("shopping-cart");
	if (storedCart) {
		shoppingCart = JSON.parse(storedCart);
	}
	return shoppingCart;
};

const removeFromDb = (id) => {
	const storedCart = localStorage.getItem("shopping-cart");
	if (storedCart) {
		const shoppingCart = (storedCart);
		if (id in shoppingCart) {
			delete shoppingCart[id];
			localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
		}
	}
};
 function refreshPage() {
		window.location.reload(false);
 }
const deleteShoppingCart = () => {
    localStorage.removeItem("shopping-cart");
    refreshPage();
};

export { addToDb, getLocalStorage, removeFromDb, deleteShoppingCart };
