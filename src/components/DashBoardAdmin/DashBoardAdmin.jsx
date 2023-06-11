import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Create from './CreatePost.jsx';
import Delete from './Delete.jsx';
import { useSelector } from 'react-redux';

const Admin = () => {
  const styles = useSelector(state => state.styles);

  return (
    <div>
      <div className="btn-group btn-group-toggle m-1">
        {/* Botones y enlaces */}
        <Link to="/CreatePost" className="btn btn-primary">
          Create Product
        </Link>
        <Link to="/Delete" className="btn btn-danger">
          Delete Product
        </Link>
      </div>

      <Routes>
        <Route
          path="/CreatePost"
          element={<Create style={styles} />}
        />
        <Route
          path="/Delete"
          element={<Delete style={styles} />}
        />
      </Routes>
    </div>
  );
};

export default Admin;