import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const NewsItem = ({ title, content, category, timestamp, url, img, compact }) => {
  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden mb-4 ${!compact && 'mb-4'}`}>
      {img && (
        <img 
          src={img} 
          alt={title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200?text=News+Image';
          }}
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mb-2">
            {category}
          </span>
          {timestamp && (
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
            </span>
          )}
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className={`text-gray-600 ${compact ? 'line-clamp-2' : ''}`}>{content}</p>
        {url && (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            Read more →
          </a>
        )}
      </div>
    </div>
  );
};

export default NewsItem;