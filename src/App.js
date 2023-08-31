import { NavBar } from "./components/NavBar/NavBar";
import { Product } from "./pages/Product/Product";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <ProductForm/> */}
      <Product/>
      <Product/>
      <Product/>
    </div>
  );
}

export default App;
