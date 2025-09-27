import React, { useState, useEffect } from 'react';
import { getApplications, updateApplicationStatus, getStats, deleteApplication } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadApplications();
  }, [user, navigate]);

  const loadApplications = () => {
    const apps = getApplications();
    setApplications(apps);
    setStats(getStats());
  };

  const handleStatusUpdate = (id, status) => {
    updateApplicationStatus(id, status);
    loadApplications();
  };

  // Add delete handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(id);
      loadApplications();
    }
  };

  return (
    <div className="page-container">
      <h1 id="Admin-dashboard">Admin Dashboard</h1>
      
      {/* Stats Grid - Update to use real data */}
      <div className="stats-grid">
        <div className="card education">
          <div className="overlay"></div>
          <div className="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="#4C5656">
              <path d="M24 4 2 14l22 10 22-10-22-10Zm0 28q-6.6 0-12.3-3.4T4 22.3V34q0 2.5 1.75 4.25T10 40h28q2.5 0 4.25-1.75T44 34V22.3q-5.3 6.3-11 9.5T24 32Z"/>
            </svg>
          </div>
          <p>Total Applications</p>
          <h3 className="stat-number">{stats.total}</h3>
        </div>

        <div className="card credentialing">
          <div className="overlay"></div>
          <div className="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="#4C5656">
              <path d="M24 24m-12 0a12 12 0 1 0 24 0 12 12 0 1 0-24 0Z"/>
            </svg>
          </div>
          <p>Approved</p>
          <h3 className="stat-number">{stats.approved}</h3>
        </div>

        <div className="card wallet">
          <div className="overlay"></div>
          <div className="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="#4C5656">
              <path d="M6 36q-1.25 0-2.125-.875T3 33V15q0-1.25.875-2.125T6 12h36q1.25 0 2.125.875T45 15v18q0 1.25-.875 2.125T42 36H6Zm36-3V15H6v18h36Zm-6-4q1.25 0 2.125-.875T39 26q0-1.25-.875-2.125T36 23q-1.25 0-2.125.875T33 26q0 1.25.875 2.125T36 29Z"/>
            </svg>
          </div>
          <p>Pending</p>
          <h3 className="stat-number">{stats.pending}</h3>
        </div>

        <div className="card human-resources">
          <div className="overlay"></div>
          <div className="circle">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="#4C5656">
              <path d="M24 4q-8.25 0-14.125 5.875T4 24q0 8.25 5.875 14.125T24 44q8.25 0 14.125-5.875T44 24q0-8.25-5.875-14.125T24 4Z"/>
            </svg>
          </div>
          <p>Rejected</p>
          <h3 className="stat-number">{stats.rejected}</h3>
        </div>
      </div>

      <h1 id="Admin-dashboard">Application List</h1>
      <div className="applications-list">
        <h2>Applications</h2>
        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="table-container">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Passport</th>
                  <th>Arrival Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="id-cell">{app.id}</td>
                    <td>{app.firstName} {app.lastName}</td>
                    <td>{app.passportNumber}</td>
                    <td>{new Date(app.arrivalDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge status-${app.status}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="action-buttons">
                      {app.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(app.id, 'approved')}
                            className="btn-approve"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(app.id, 'rejected')}
                            className="btn-reject"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button className="btn-view">View</button>
                      {/* Add Delete Button */}
                      <button 
                        onClick={() => handleDelete(app.id)}
                        className="btn-delete"
                        style={{marginLeft: '10px', backgroundColor: '#dc3545'}}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;