import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../actions/product";
import { getCategories, getCategorySubs } from "../../actions/category";
import { Select} from 'antd'
import FileUpload from '../../components/forms/FileUpload'
import {LoadingOutlined} from '@ant-design/icons'
const {Option} = Select;

const initialState = {
  title: "Macbook Pro",
  description: "This is the best Apple product",
  price: "45000",
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: "50",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "White",
  brand: "Apple",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false)

  //destructure
  const {title, description, price,categories, category, subs, shipping, quantity, images, colors, brands,color,brand} = values

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        toast.success(`"${res.data.title}" is created`);
        setValues({
          title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "No",
  quantity: "0",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: ""
        })
        
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

    const productForm = () => 
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" className="form-control" value={title} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" name="description" className="form-control" value={description} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" className="form-control" value={price} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Shipping</label>
                <select name="shipping" className="form-control" onChange={handleChange}>
                    <option value="No">No</option>    
                    <option value="Yes">Yes</option>
                </select>    
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input type="number" name="quantity" className="form-control" value={quantity} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Color</label>
                <select name="color" className="form-control" onChange={handleChange}>
                    <option>Please select</option>    
                    {
                        colors.map((c) => <option key={c} value={c}>{c}</option>)
                    }
                </select>    
            </div>
            <div className="form-group">
                <label>Brand</label>
                <select name="brand" className="form-control" onChange={handleChange}>
                    <option>Please select</option>    
                    {
                        brands.map((b) => <option key={b} value={b}>{b}</option>)
                    }
                </select>    
            </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              className="form-control"
              onChange={handleCatagoryChange}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
        </div>
        {
          showSub && 
        
        <div>
          <label>Sub Categories</label>
          <Select
            mode="multiple" style={{width:'100%'}} placeholder="Please select" value={subs} onChange={value => setValues({...values, subs:value})}
          >
            {subOptions.length && subOptions.map((s) => (
              <Option value={s._id} key={s._id}>{s.name}</Option>
            ))}
            
            
          </Select>
        </div>
        }
        <br/>
            <button className="btn btn-outline-info">Save</button>
        </form>
    

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? 
            <LoadingOutlined className="text-danger h1" />:
            <h4>Product create</h4>
          }
          <hr />
          <div className="p-3">
            <FileUpload
            values={values} 
            setValues={setValues}
            setLoading={setLoading}
            />
          </div>
            {productForm()}
          {JSON.stringify(values)}

          
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
