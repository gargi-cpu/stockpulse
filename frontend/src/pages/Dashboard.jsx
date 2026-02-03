import React from 'react';
import IndicesRow from '../components/dashboard/IndicesRow';
import NetFII_DIICards from '../components/dashboard/NetFII_DIICards';
import MostBought from '../components/dashboard/MostBought';
import RightSidebar from '../components/dashboard/RightSidebar';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Market Today</h1>
          <p>Live overview of indices, flows, and news.</p>
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
