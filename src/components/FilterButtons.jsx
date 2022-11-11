import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actionFilterPaletasAsync, actionGetPaletasAsync } from "../redux/actions/paletasActions";
import { category } from "../services/dates";

const FilterButtons = () => {
  const dispatch = useDispatch();
  const onFiltered = (searchValue) => {
    const searchParam = "category";
    dispatch(actionFilterPaletasAsync(searchParam, searchValue));
  };
  return (
    <div className="d-flex justify-content-evenly mb-3">
      <Button
        variant="warning"
        onClick={() => {
          dispatch(actionGetPaletasAsync());
        }}
      >
        Todas
      </Button>
      {category.map((item) => (
        <Button
          key={item.value}
          variant="warning"
          onClick={() => {
            onFiltered(item.label);
          }}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
