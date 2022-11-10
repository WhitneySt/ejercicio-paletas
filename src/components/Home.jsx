import React, { useEffect } from "react";
import { Badge, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionGetPaletasAsync } from "../redux/actions/paletasActions";

const Home = () => {
  const dispatch = useDispatch();
  const { paletas } = useSelector((store) => store.paletasStore);

  useEffect(() => {
    dispatch(actionGetPaletasAsync());
  }, [dispatch]);

  return (
    <div className="d-flex flex-wrap justify-content-evenly gap-3">
      {paletas && paletas.length ? (
        paletas.map((paleta, index) => (
          <Card key={index} style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={paleta.image}
              style={{ height: "150px", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{paleta.name}</Card.Title>
              <Badge bg="warning" text="dark">
                {`$ ${new Intl.NumberFormat("de-DE", {
                  style: "currency",
                    currency: "COP",
                  minimumSignificantDigits: 1
                }).format(paleta.price)}`}
              </Badge>
              <Card.Text>
                {paleta.category}
                {": "}
                {paleta.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
