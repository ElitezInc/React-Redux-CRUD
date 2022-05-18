
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.scss';
import UserList from './Components/UserList';
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser';

function App() : JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;