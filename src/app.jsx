import { createRoot } from "react-dom/client";
import Pizza from "./Pizza.jsx";

const App = () => {
    return(
        <div>
            <h1>Padre Gino's - Order Now</h1>
            <Pizza
                name="Pepperoni"
                description="pep, cheese, n staff"
                image={"/api/public/pizzas/pepperoni.webp"}
            />

            <Pizza
                name="Hawaiian"
                description="beef, pineapple n stuff"
                image={"/api/public/pizzas/hawaiian.webp"}
            />
        </div>
    )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>)
