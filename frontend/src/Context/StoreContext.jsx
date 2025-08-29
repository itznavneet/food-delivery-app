// Import axios for making HTTP requests to the backend
import axios from "axios";

// Import createContext (for creating React context), 
// useEffect (for side effects), and useState (for managing component state)
import { createContext, useEffect, useState } from "react";

// Create a new context object, initially with null as default value
export const StoreContext = createContext(null)

// Create a context provider component that will wrap around child components
// and provide them with global state and functions.
const StoreContextProvider = (props) => {

    // cartItems will store cart data as an object: { itemId: quantity }
    const [cartItems, setCartItems] = useState({})

    // Backend server base URL
    const url = "http://localhost:4000"

    // Token will store authentication token of logged-in user
    const [token, setToken] = useState("")

    // food_list will store the array of available food items fetched from backend
    const [food_list, setFoodList] = useState([])

    // Function to add an item to the cart
    const addToCart = async (itemId) => {
        // If item not present in cart, add it with quantity = 1
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        // If item already present, increase its quantity by 1
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        // If user is logged in (token exists), also update the cart in backend
        if (token) {
            await axios.post(
                url + "/api/cart/add",
                { itemId },
                { headers: { token } }
            )
        }
    }

    // Function to remove an item from the cart
    const removeFromCart = async (itemId) => {
        // Decrease quantity of the item in cart by 1
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        // If user is logged in, also update backend cart
        if (token) {
            await axios.post(
                url + "/api/cart/remove",
                { itemId },
                { headers: { token } }
            )
        }
    }

    // Function to calculate the total price of all items in cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        // Loop through each item in the cart
        for (const item in cartItems) {
            // Only consider items with quantity > 0
            if (cartItems[item] > 0) {
                // Find full product info of this item from food_list
                let itemInfo = food_list.find((product) => product._id === item)

                // Add (price * quantity) to total
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    // Fetch food items list from backend API
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list")
        // Save response data into food_list state
        setFoodList(response.data.data)
    }

    // Load cart data from backend for a logged-in user
    const loadCartData = async (token) => {
        const response = await axios.post(
            url + "/api/cart/get",
            {},
            { headers: { token } }
        )
        // Set cartItems from backend response
        setCartItems(response.data.cartData)
    }

    // useEffect runs once when component mounts
    useEffect(() => {
        async function loadData() {
            // First fetch food items list
            await fetchFoodList();

            // If token is stored in localStorage, load user data
            if (localStorage.getItem("token")) {
                // Set token state
                setToken(localStorage.getItem("token"))

                // Load user's cart data from backend
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();  // Call the async function
    }, [])  // Empty dependency array means run only once on component mount

    // All states and functions that should be available globally via context
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    // Wrap children components with StoreContext.Provider
    // so they can access the contextValue
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

// Export the provider to be used in index.js or App.js
export default StoreContextProvider;
