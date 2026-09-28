import { useState } from "react";

export default function ProductForm({
  initialData = {},
  onSubmit,
  buttonText = "Save Product",
}) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    price: initialData.price || "",
    category: initialData.category || "",
    stock: initialData.stock || "",
    brand: initialData.brand || "",
    thumbnail: initialData.thumbnail || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Product name is required";
    }

    if (!form.description.trim()) {
      newErrors.description =
        "Product description is required";
    }

    if (!form.price || Number(form.price) <= 0) {
      newErrors.price = "Enter a valid price";
    }

    if (!form.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!form.stock || Number(form.stock) < 0) {
      newErrors.stock = "Enter valid stock";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Product Name *</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter product name"
          />

          {errors.title && (
            <span className="form-error">
              {errors.title}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Brand</label>

          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand name"
          />
        </div>

        <div className="form-group">
          <label>Price *</label>

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
          />

          {errors.price && (
            <span className="form-error">
              {errors.price}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Category *</label>

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
          />

          {errors.category && (
            <span className="form-error">
              {errors.category}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Stock *</label>

          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock quantity"
          />

          {errors.stock && (
            <span className="form-error">
              {errors.stock}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Image URL</label>

          <input
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="form-group full">
        <label>Description *</label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Write a product description..."
          rows="5"
        />

        {errors.description && (
          <span className="form-error">
            {errors.description}
          </span>
        )}
      </div>

      <button className="primary-button" type="submit">
        {buttonText}
      </button>
    </form>
  );
}