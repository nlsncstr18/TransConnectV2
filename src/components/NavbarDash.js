import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useNavigate } from "react-router-dom";
const NavbarDash = () => {
  const navigate = useNavigate();

  const handleOnclickHome = () => {
    navigate("/dashboard");
  };
  const handleOnclickTransactions = () => {
    navigate("/transactions");
  };
  const handleOnclickAboutUs = () => {
    navigate("/about");
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link onClick={handleOnclickHome}>Home</Nav.Link>
            <Nav.Link onClick={handleOnclickTransactions}>
              Transactions
            </Nav.Link>
            <Nav.Link onClick={handleOnclickAboutUs}>About Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarDash;
