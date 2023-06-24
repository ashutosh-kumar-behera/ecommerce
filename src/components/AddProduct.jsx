import { useState } from 'react';
import { Button, Form, Card }from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export const AddProduct =()=>{

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    userId: JSON.parse(localStorage.getItem("user"))._id,
    company: "",
  });

    const navigate = useNavigate();

    const postProduct = async()=>{
        const result = await fetch(
          "https://mern-project-beta-smoky.vercel.app",
          {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        const data = await result.json();
        console.log(data);
    }
    const[error, setError] = useState(false);
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!product.name || !product.price || !product.category || !product.company ){
            setError(true);
            return false;
        }
        postProduct();
        navigate('/')
    }


  return (
    <div className="d-flex justify-content-around mt-2 mb-2" border="success" >
      <Card border="primary" style={{ width: '80vw' }}>
        <Card.Header>New Products</Card.Header>
        <Card.Body>
          <Card.Title>Product Details</Card.Title>
        <Form noValidate  onSubmit={handleSubmit}>
        <Form.Group md="4" controlId="validationCustom01">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Add Product Name"
            onChange={(e)=>setProduct({...product, name:e.target.value})}
          />
          {!error && !product.name && <span className="text-danger">Enter valid name</span>}
        </Form.Group>

        <Form.Group md="4" controlId="validationCustom02">
          <Form.Label>Product Price:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Add Product Price"
            onChange={(e)=>setProduct({...product, price:e.target.value})}
          />
          {!error && !product.price && <span className="text-danger">Enter valid price</span>}
        </Form.Group>

        <Form.Group md="6" controlId="validationCustomUsername">
          <Form.Label>Product Category:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add Product Category"
              required
              onChange={(e)=>setProduct({...product, category:e.target.value})}
            />
            {!error && !product.category && <span className="text-danger">Enter valid category</span>}
        </Form.Group>

        <Form.Group md="6" controlId="validationCustom03">
          <Form.Label>Product Company:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add Product Company"
            required
            onChange={(e)=>setProduct({...product, company:e.target.value})}
          />
          {!error && !product.company && <span className="text-danger">Enter valid company</span>}
        </Form.Group><br/>

          <Button type="submit">Add Product</Button>
        </Form>
        </Card.Body>
      </Card>
    </div>
  );
}