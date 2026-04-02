import Category from "./Category";
import Products from "./products";

const Home = () => {


  return (
    <div className="custom-container py-10 space-y-10">
      <div className="flex items-center justify-center">
        <Category />
      </div>
      <Products />
    </div>
  );
};

export default Home;
