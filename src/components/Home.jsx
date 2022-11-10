import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionGetPaletasAsync } from "../redux/actions/paletasActions";

const Home = () => {
  const dispatch = useDispatch();
  const { paletas } = useSelector((store) => store.paletasStore);

  useEffect(() => {
    dispatch(actionGetPaletasAsync());
  }, [dispatch]);

  return (
    <div className="d-flex flex-wrap justify-content-evenly">
      {paletas && paletas.length ? (
        paletas.map((paleta, index) => (
          <Card key={index} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={paleta.image} />
            <Card.Body>
              <Card.Title>{paleta.name}</Card.Title>
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
