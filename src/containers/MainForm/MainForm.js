import React, { useState } from "react";

import "./MainForm.css";
import { checkValidity } from "../../components/MainForm/Input/CheckValidity/CheckValidity";
import Input from "../../components/MainForm/Input/Input";
import Circle from "../../components/MainForm/Circle/Circle";

const MainForm = (props) => {
  const [orderForm, setOrderForm] = useState({
    firstName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        label: "First Name",
      },
      value: "",
      validation: {
        required: true,
        minLength: 2,
        maxLength: 20,
      },
      valid: false,
      touched: false,
    },
    lastName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        label: "Last Name",
      },
      value: "",
      validation: {
        required: true,
        minLength: 2,
        maxLength: 20,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        label: "Your Email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    time: {
      elementType: "checkbox",
      elementConfig: {
        label: "What is best time to contact you?",
        obj: [
          {
            label: "Monday 3pm",
            type: "checkbox",
          },
          {
            label: "Tuesday 3pm",
            type: "checkbox",
          },
        ],
      },
      value: "",
      validation: {
        isChecked: true,
      },
      valid: false,
      touched: false,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (e) => {
    e.preventDefault();
  };

  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm,
    };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = e.target.value;

    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
      e
    );

    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
    settingValidity(updatedOrderForm);
  };

  const settingValidity = (updatedOrderForm) => {
    const validityArray = [];
    for (let key in updatedOrderForm) {
      validityArray.push(updatedOrderForm[key].valid);
    }

    let resultValidity = {};
    validityArray.forEach(
      (el) => (resultValidity[el] = (resultValidity[el] || 0) + 1)
    );

    const newProgressValidity =
      (resultValidity.true * 100) / validityArray.length;
    newProgressValidity
      ? props.findProgress(newProgressValidity)
      : props.findProgress(0);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <form autoComplete="off" onSubmit={orderHandler}>
      {formElementsArray.map((el, idx) => {
        return (
          <div key={idx + 1} className="FormCircleInput">
            <Circle
              text={idx + 1}
              style={{ marginBottom: "30px" }}
              valid={el.config.valid}
            />
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              shouldValidate={el.config.validation}
              invalid={!el.config.valid}
              touched={el.config.touched}
              label={el.config.elementConfig.label}
              changed={(e) => inputChangedHandler(e, el.id)}
            />
          </div>
        );
      })}
    </form>
  );

  const buttonClass = ["Button"];
  if (!formIsValid) {
    buttonClass.push("Disabled");
  }

  return (
    <div className="MainForm">
      {form}
      <button className={buttonClass.join(" ")}>SUBMIT</button>
    </div>
  );
};

export default MainForm;
