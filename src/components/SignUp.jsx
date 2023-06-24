import { Card, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export const SignUp=()=>{

    const [userDetails, setUserDetails] = useState({
        name:'',email:'',password:''
    });

    const[error, setError] = useState(false);

    const navigate = useNavigate()

    const postData = async()=>{
        let result = await fetch(
          "https://mern-project-beta-smoky.vercel.app/register",
          {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: { "Content-Type": "application/json" },
          }
        );
        result = await result.json();
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result.newUser));
        localStorage.setItem("token", JSON.stringify(result.auth));
        console.log(result);
        navigate("/");
    }

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    }, [navigate])

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!userDetails.name || !userDetails.email || !userDetails.password ){
            setError(true);
            return false;
        }
        postData()
    }


  return (
    <div className="d-flex justify-content-around mt-2 mb-2" border="primary">

        <Card border="primary" style={{ width: '20rem' }}>
        <Card.Header>SignUp</Card.Header>
        <Card.Body>
            <Card.Title>Registration</Card.Title>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Name" onChange={(e)=>setUserDetails({...userDetails, name:e.target.value})} />
                    {!error && !userDetails.name && <span className="text-danger">Enter valid name</span>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setUserDetails({...userDetails, email:e.target.value})}/>
                    {!error && !userDetails.email && <span className="text-danger">Enter valid email</span>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  onChange={(e)=>setUserDetails({...userDetails, password:e.target.value})}/>
                    {!error && !userDetails.password && <span className="text-danger" >Enter valid password</span>}
                </Form.Group><br/>

                <Button variant="primary" type="submit">
                    SignUp
                </Button>
            </Form>
        </Card.Body>
      </Card>
    </div>
  );
}