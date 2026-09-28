import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import useProducts from "../../hooks/useProducts";
import Loader from "../../components/Loader";

export default function EditProduct() {
  const { id } = useParams();

  const {
    products,
    loading,
    updateProduct,
  } = useProducts();

  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <div className="error-box">
        Product not found.
      </div>
    );
  }

  const handleSubmit = async (updatedProduct) => {
    await updateProduct(product.id, updatedProduct);
    alert("Product updated successfully!");
    navigate("/admin/products");
  };

  return (
    <div>
      <div className="admin-heading">
        <div>
          <span className="eyebrow">CATALOG</span>
          <h1>Edit Product</h1>
          <p>Update product information.</p>
        </div>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        buttonText="Update Product →"
      />
    </div>
  );
}