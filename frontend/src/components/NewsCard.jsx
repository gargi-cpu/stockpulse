import React from 'react';
import Card from './Card';
import './NewsCard.css';

const NewsCard = ({ title, source, time }) => {
  return (
    <Card className="news-card">
      <div className="news-meta">
        <span className="news-source">{source}</span>
        <span className="news-time">{time}</span>
      </div>
      <h4>{title}</h4>
    </Card>
  );
};

export default NewsCard;
