import React from 'react';

const NewsList = ({ articles }) => {
  if (!articles.length) return <p>No news found for this category.</p>;

  return (
    <div>
      {articles.map((article, i) => (
        <div key={i} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem', paddingBottom: '1rem' }}>
          <h3>{article.title}</h3>
          {article.urlToImage && <img src={article.urlToImage} alt="" width="100%" />}
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
