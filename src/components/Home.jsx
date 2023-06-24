import {Table, Button, Container} from 'react-bootstrap';
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = ({query}) => {
    const[productList, setProductList] = useState([]);
    const navigate = useNavigate()
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    const getProduct = async () => {
      const result = await fetch(
        `https://mern-project-beta-smoky.vercel.app/${userId}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      const data = await result.json();
      setProductList(data);
    };
    
    const deleteProduct = async(id)=>{
      if(window.confirm("Are you conform to delete data")){

        const result = await fetch(
          `https://mern-project-beta-smoky.vercel.app/${id}`,
          {
            method: "DELETE",
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
        getProduct()
      }
    }

    const updateProduct =(el)=>{
        console.log(el);
        localStorage.setItem("product", JSON.stringify(el));
        navigate('/update')
    }

    useEffect(() => {
      getProduct();
    }, []);

  return (
    <Container className="mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Company</th>
            <th>Product Category</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {productList.length > 0 ? (
            productList
              .filter(
                (el) =>
                  el.category.includes(query) ||
                  el.company.includes(query) ||
                  el.name.includes(query)
              )
              .map((el) => {
                return (
                  <tr key={el._id}>
                    <td>{el.name}</td>
                    <td>${el.price}</td>
                    <td>{el.category}</td>
                    <td>{el.company}</td>
                    <td className="d-flex justify-content-around">
                      <Button
                        variant="primary"
                        onClick={() => updateProduct(el)}
                      >
                        Edit
                      </Button>{" "}
                      &nbsp;
                      <Button
                        variant="danger"
                        onClick={() => deleteProduct(el._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
          ) : (
            <tr>
              <th colSpan={5} className="text-center">
                No data found
              </th>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}