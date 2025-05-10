// components/ExternalNewsItem.jsx
import React from 'react';

const ExternalNewsItem = ({ title, urlToImage, description, url, source }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
      {urlToImage && (
        <img src={urlToImage} alt={title} className="rounded-xl w-full h-48 object-cover mb-3" />
      )}
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
        Read more at {source?.name}
      </a>
    </div>
  );
};

export default ExternalNewsItem;
