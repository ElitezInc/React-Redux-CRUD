import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";
import { userUpdated } from "../features/users/usersSlice";

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate();

  const user: any = useSelector((state: any) => 
    state.users.data.find((user: any) => user.id + '' === id)
  );

  const dispatch = useDispatch();

  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [error, setError] = useState<string | null>(null);

  const handleName = (e: any) => setName(e.target.value);
  const handleEmail = (e: any) => setEmail(e.target.value);

  const handleClick = () => {
    if (name && email) {
      dispatch(
        userUpdated({
          id: id,
          name,
          email,
        })
      );

      setError(null);
      navigate('/');
    } else {
      setError("Fill in all fields");
    }

    setName("");
    setEmail("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Edit user</h1>
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
            Save user
          </button>
        </div>
      </div>
    </div>
  );
}
