import React from "react";
import { useState } from "react";
import axios from "axios";

const validateURL = "http://127.0.0.1:5000/verify";
const cities = ["Warsaw", "Wroclaw", "Lodz", "Katowice", "Gdansk"];

const EmployeeForm = () => {
  const [message, setMessage] = useState("");
  const [validateMessage, setValidateMessage] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(cities[0]);
  const [isFormShown, setIsFormShown] = useState(true);

  const handleOnClick = () => {
    setValidateMessage("");

    if (name.trim() === "") {
      setValidateMessage("Wypełnij imię!");
    } else if (surname.trim() === "") {
      setValidateMessage("Wypełnij nazwisko!");
    } else if (mail.trim() === "") {
      setValidateMessage("Wypełnij email!");
    } else {
      setIsFormShown(false);

      const data = {
        name: name.trim(),
        surname: surname.trim(),
        mail: mail,
        phone: phone,
        city: city
      };

      axios
        .post(validateURL, data)
        .then((response) => {
          setMessage(
            `Data send: ${response.data["message"]}. We will contact with you asap`
          );
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setMessage(error.response.data["message"]);
          }
        });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleMailChange = (e) => {
    setMail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="contact-form">
      {isFormShown && (
        <div>
          <h2>Join to our team!</h2>
          <p>Please complete the form below so that we can get to know you better.</p>
          <div>
            <p>
              <label for="name">
                Name:{" "}
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                />
              </label>
            </p>
            <p>
              <label for="surname">
                Surname:
                <input
                  type="text"
                  id="surname"
                  value={surname}
                  onChange={handleSurnameChange}
                />
              </label>
            </p>
            <p>
              <label for="city">
                City:
                <select name="city" id="city">
                  {cities.map((city) => (
                    <option value={city} onChange={handleCityChange}>{city}</option>
                  ))}
                </select>
              </label>
            </p>
            <p>
              <label for="mail">
                Email:
                <input
                  type="email"
                  id="mail"
                  value={mail}
                  onChange={handleMailChange}
                />
              </label>
            </p>
            <p>
              <label for="tel">
                Phone number:
                <input
                  type="tel"
                  id="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </label>
            </p>

            <button className="button-form" onClick={handleOnClick}>
              Send
            </button>

            <p className="error_message">{validateMessage}</p>
          </div>
        </div>
      )}
      {!isFormShown && <p className="info">{message}</p>}
    </div>
  );
};

export default EmployeeForm;
