import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import useProducts from "../../hooks/useProducts";

export default function AddProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleSubmit = async (product) => {
    await addProduct(product);
    alert("Product added successfully!");
    navigate("/admin/products");
  };

  return (
    <div>
      <div className="admin-heading">
        <div>
          <span className="eyebrow">CATALOG</span>
          <h1>Add Product</h1>
          <p>Create a new product for your store.</p>
        </div>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        buttonText="Create Product →"
      />
    </div>
  );
}