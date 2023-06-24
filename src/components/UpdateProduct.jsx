import { useState } from 'react';
import { Button, Form, Card }from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export const UpdateProduct =()=>{

     const[product,setProduct]=useState(JSON.parse(localStorage.getItem('product')));
    const navigate = useNavigate();

    const updateProduct = async()=>{
        const result = await fetch(
          `https://mern-project-beta-smoky.vercel.app/${product._id}`,
          {
            method: "PUT",
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

    const[error, setError]=useState(false);
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!product.name || !product.price || !product.category || !product.company ){
          setError(true);
          return false;
        }
        const id = JSON.parse(localStorage.getItem('user'))._id
        setProduct({...product, userId:id});
        updateProduct();
        navigate('/')
        console.log(product);
    }


  return (
    <div className="d-flex justify-content-around mt-2 mb-2" border="primary">
      <Card border="primary" style={{ width: '80vw' }}>
        <Card.Header>Update Products</Card.Header>
        <Card.Body>
          <Card.Title>Product Details</Card.Title>
          <Form noValidate onSubmit={handleSubmit}>
              <Form.Group md="4" controlId="validationCustom01">
                <Form.Label>Product Name:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={product.name}
                  onChange={(e)=>setProduct({...product, name:e.target.value})}
                />
                {!error && !product.name && <span className="text-danger">Enter valid name</span>}
              </Form.Group>

              <Form.Group md="4" controlId="validationCustom02">
                <Form.Label>Product Price:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={product.price}
                  onChange={(e)=>setProduct({...product, price:e.target.value})}
                />
                {!error && !product.price && <span className="text-danger">Enter valid price</span>}
              </Form.Group>

              <Form.Group md="6" controlId="validationCustomUsername">
                <Form.Label>Product Category:</Form.Label>
                  <Form.Control
                    type="text"
                    value={product.category}
                    required
                    onChange={(e)=>setProduct({...product, category:e.target.value})}
                  />
                  {!error && !product.category && <span className="text-danger">Enter valid category</span>}
              </Form.Group>
            
              <Form.Group md="6" controlId="validationCustom03">
                <Form.Label>Product Company:</Form.Label>
                <Form.Control
                type="text"
                value={product.company}
                required
                onChange={(e)=>setProduct({...product, company:e.target.value})}/>
                {!error && !product.company && <span className="text-danger">Enter valid company</span>}
              </Form.Group><br/>

            <Button type="submit">Update Product</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}