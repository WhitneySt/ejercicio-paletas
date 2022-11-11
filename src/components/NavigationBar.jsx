import React from "react";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { actionFilterAsync, actionGetPaletasAsync } from "../redux/actions/paletasActions";
import { actionLogoutAsync } from "../redux/actions/userActions";

const logo = "https://cdn-icons-png.flaticon.com/512/4433/4433191.png";
const imgStyles = {
  width: "50px",
  height: "auto",
};
const navLinkStyles = {
  textDecoration: "none",
  color: "black",
  margin: "auto 0",
};
const activeNavLinkStyles = {
  textDecoration: "none",
  color: "black",
  margin: "auto 0",
  fontWeight: "bolder",
};

const NavigationBar = ({ isAutentication }) => {
  const dispatch = useDispatch();
  const {register, handleSubmit}= useForm()
  const { photoURL } = useSelector((store) => store.user);
  const onCloseSession = () => {
    dispatch(actionLogoutAsync());
  };

  const onSearch = (data) => {
    const searchParam = data.search
    console.log(searchParam);
    dispatch(actionFilterAsync(searchParam));
  }

  const restorePaletas = ({target}) => {
    if (target.value.trim() === '') {
      dispatch(actionGetPaletasAsync());
    }
  }
  // const onChangeSearch = (e) => {
  //   const searchParam = e.target.value;
  //   dispatch(actionFilterAsync(searchParam));
  // };

  return (
    <div>
      <Navbar key={"md"} bg="light" expand={"md"} className="mb-3">
        <Container fluid>
          <Navbar.Brand>
            <img style={imgStyles} src={logo} alt="Paletas" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"md"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"md"}`}>
                Paletas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {isAutentication ? (
                <>
                  <Nav className="justify-content-end flex-grow-1 pe-3 gap-3 m-3">
                    <NavLink
                      to="/home"
                      style={({ isActive }) =>
                        isActive ? activeNavLinkStyles : navLinkStyles
                      }
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/addPaletas"
                      style={({ isActive }) =>
                        isActive ? activeNavLinkStyles : navLinkStyles
                      }
                    >
                      + Paletas
                    </NavLink>
                  </Nav>
                  <Form className="d-flex m-3" onSubmit={handleSubmit(onSearch)}>
                    <Form.Control
                      type="search"
                      {...register("search", {required: true})}
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      onChange={restorePaletas}
                      // onChange={onChangeSearch}
                    />
                    <Button type='submit' variant="outline-success">Search</Button>
                  </Form>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="button-tooltip-2">Log out</Tooltip>}
                  >
                    {({ ref, ...triggerHandler }) => (
                      <Button
                        variant="light"
                        {...triggerHandler}
                        className="d-inline-flex align-items-center"
                        onClick={onCloseSession}
                      >
                        <Image
                          ref={ref}
                          roundedCircle
                          src={photoURL}
                          style={imgStyles}
                        />
                      </Button>
                    )}
                  </OverlayTrigger>
                </>
              ) : (
                <Nav className="justify-content-end flex-grow-1 pe-3 gap-3 m-3">
                  <NavLink
                    to="/"
                    style={({ isActive }) =>
                      isActive ? activeNavLinkStyles : navLinkStyles
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/Register"
                    style={({ isActive }) =>
                      isActive ? activeNavLinkStyles : navLinkStyles
                    }
                  >
                    Registrarse
                  </NavLink>
                </Nav>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
