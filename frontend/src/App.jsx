
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Form from "./Form";
import UserList from "./UserList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/form" element={<Form />} />
        <Route path="/form/:id" element={<Form />} />
      </Routes>
    </Router>
  );
};

export default App;
