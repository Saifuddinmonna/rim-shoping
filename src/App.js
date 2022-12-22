import logo from "./logo.svg";
import "./App.css";

import ConfirmModal from "../src/components/Name/t";
import Main from "./Layout/Main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Order from "./components/Orders/Order";
import Inventory from "./components/Inventory/Inventory";
import About from "./components/About/About";
import Shop from "./components/Shop/Shop";
import Cart from "./components/Cart/Cart";
function App() {

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Main />,
			children: [
				{
					path: "/order",
					
					element: <Order></Order>,
				},
				{
					path: "/shop",
					loader: async ()=>fetch('products.json'),
					element: <Shop></Shop>,
				},
				{
					path: "/inventory",
					element: <Inventory></Inventory>,
				},
				{
					path: "/about",
					element: <About></About>,
				},
			],
		},
	]);
	
	return (
		<div className="App">

			<RouterProvider router={router}></RouterProvider>
			
		</div>
	);
}

export default App;
