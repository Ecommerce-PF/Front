import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Admin = () => {
  const styles = useSelector(state => state.styles);

  return (
    <div>
      <div className="btn-group btn-group-toggle m-1">
        
        <div>
        <Link to="/CreatePost" className="btn btn-primary">
          Create Product
        </Link>
        </div>
        
        <div>
        <Link to="/Delete" className="btn btn-danger">
          Delete Product
        </Link>
        <Link to="/Order" className="btn btn-info">
          Order Users
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;