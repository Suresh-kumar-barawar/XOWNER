import { useState } from "react";
import { useParams } from "react-router-dom";
import { products, categories, brands } from "../../utils/mockData";

const FeaturedProducts = () => {
  const [productsList, setProductList] = useState([]);
  console.log(categories);

  const params = useParams();
  console.log(params);
  return (
    <div>
      <h2></h2>
    </div>
  );
};

export default FeaturedProducts;
