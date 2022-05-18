import { useDispatch } from "react-redux";
import { useState } from "react";
import { userAdded } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleName = (e: any) => setName(e.target.value);
  const handleEmail = (e: any) => setEmail(e.target.value);

  const handleClick = () => {
    if (name && email) {
      dispatch(
        userAdded({
          id: nanoid() + '',
          name,
          email,
        })
      );

      setError(null);
      navigate("/");
    } 
    else {
      setError("Fill in all fields");
    }

    setName("");
    setEmail("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add user</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Name</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="test@mailbox.com"
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          <label htmlFor="emailInput">Email</label>
          <input
            className="u-full-width"
            type="email"
            placeholder="test@mailbox.com"
            id="emailInput"
            onChange={handleEmail}
            value={email}
          />
          {error && error}
          <button onClick={handleClick} className="button-primary">
            Add user
          </button>
        </div>
      </div>
    </div>
  );
}