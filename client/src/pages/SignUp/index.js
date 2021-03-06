import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { auth, generateUserDocument } from "../../firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import "./style.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
    }
    catch(error){
      setError('Error Signing up with email and password, please use 8 characters in password, please sign in anyway');
    }
    
    setEmail("");
    setPassword("");
    setDisplayName("");
    document.getElementById("linkToSignIn").classList.add("show");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div className="bodyStyle">
    
      <h1 className="text-3xl mb-2 text-center font-bold">Pretty Dorky</h1>
      <h4 className="begin"> Sign up to begin your adventure. . .</h4>
      <div className="border">
        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        {/* <Row> */}

        <Form className="signUpForm text-center">
          <Form.Row style={{padding:"2%"}}>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="fancyWizard@email.com" 
                type="email"
                className="my-1 p-1 w-full"
                name="userEmail"
                value={email}
                placeholder="fancyWizard@mail.com"
                id="userEmail"
                onChange={event => onChangeHandler(event)} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="8 character secret"
                  className="mt-1 mb-3 p-1 w-full"
                  name="userPassword"
                  value={password}
                  id="userPassword"
                  onChange={event => onChangeHandler(event)} />
            </Form.Group> 
          </Form.Row>
          <Button variant="info"className="signInBtn"
            className="signUpBtn"
            onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}>
            Sign up
          </Button>
        </Form>

        <div id="linkToSignIn" className="hide">
          <p className="text-center my-3">Awesome.</p>
          <p className="text-center my-3">
          <span className="signIp">
            Ready to{" "}
            <Link to="/" className="text" style={{ textDecoration: 'none' }}>
              Sign in here ?
            </Link>{" "}
          </span>
            {/* Already started your adventure?{" "}
            <Link to="/signin" className="text-blue-500 hover:text-blue-600">
              Sign in here
            </Link>{" "} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
