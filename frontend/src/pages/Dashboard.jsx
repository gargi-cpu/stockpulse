import React from 'react';
import useAuthUser from '../hooks/useAuthUser';
import IndicesRow from '../components/dashboard/IndicesRow';
import NetFII_DIICards from '../components/dashboard/NetFII_DIICards';
import MostBought from '../components/dashboard/MostBought';
import RightSidebar from '../components/dashboard/RightSidebar';
import './Dashboard.css';

const Dashboard = () => {
  const user = useAuthUser();
  const userEmail = user?.email || '';
  const displayName = userEmail
    ? userEmail.split('@')[0].replace(/\W+/g, ' ').trim()
    : '';
  const nameTitle = displayName
    ? displayName.charAt(0).toUpperCase() + displayName.slice(1)
    : '';
  const initials = displayName
    ? displayName
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0].toUpperCase())
        .slice(0, 2)
        .join('')
    : userEmail
      ? userEmail[0].toUpperCase()
      : '';

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Hi, {nameTitle || userEmail}</h1>
          <p>Read-only market overview and analysis.</p>
        </div>
        <div className="dashboard-user">
          <div className="avatar">{initials}</div>
          <div className="user-meta">
            <span>{userEmail}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-left">
          <IndicesRow />
          <NetFII_DIICards />
          <MostBought />
        </section>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Dashboard;
