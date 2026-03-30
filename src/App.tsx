import CartProvider from "./providers/CartContext.tsx";
import { AppRoutes } from "./routes/index.tsx";

function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App;
