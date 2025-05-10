import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadNews, loadExternalNews, loadTrendingNews, addNews } from '../redux/newsSlice';
import NewsItem from '../components/NewsItem';
import CategorySelector from '../components/CategorySelector';
import NewsForm from '../components/NewsForm';
import socket from '../socket/socket';

const Home = () => {
  const { 
    allNews,
    filteredNews,
    externalNews,
    trendingNews,
    category,
    loading,
    error
  } = useSelector((state) => state.news);
  
  const dispatch = useDispatch();

  // Load initial data
  useEffect(() => {
    dispatch(loadNews()); // Load all news initially
    dispatch(loadTrendingNews()); // Always load trending news
    
    // Socket connection for real-time updates
    socket.on('newNews', (data) => {
      dispatch(addNews(data));
    });

    return () => {
      socket.off('newNews');
    };
  }, [dispatch]);

  // Handle category changes
  useEffect(() => {
    if (category) {
      dispatch(loadExternalNews(category));
      socket.emit('subscribe', category.toLowerCase());
    } else {
      socket.emit('unsubscribe');
    }

    return () => {
      if (category) {
        socket.emit('unsubscribe', category.toLowerCase());
      }
    };
  }, [category, dispatch]);

  // Determine which news to display
  const displayNews = category ? filteredNews : allNews;

  if (loading && !allNews.length) {
    return <div className="text-center py-8">Loading news...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - Category News (Smaller) */}
        <aside className="lg:w-1/4 space-y-6">
          <CategorySelector />
          <NewsForm />
          
          <section>
            <h1 className="text-2xl font-bold mb-4">
              {category ? `${category} News` : 'All News'}
            </h1>
            {displayNews.length > 0 ? (
              <div className="space-y-4">
                {displayNews.slice(0, 4).map((item) => (
                  <NewsItem 
                    key={item._id} 
                    {...item} 
                    compact 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-500">
                  {category ? `No news available for ${category}` : 'No news available'}
                </p>
              </div>
            )}
          </section>
        </aside>

        {/* Main Content - External & Trending News (Larger) */}
        <main className="lg:w-3/4 space-y-8">
          {/* External News Section */}
          {category && (
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">External {category} News</h2>
              {externalNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {externalNews.slice(0, 6).map((item, index) => (
                    <NewsItem
                      key={`external-${index}`}
                      title={item.title}
                      content={item.description}
                      category={item.source?.name}
                      url={item.url}
                      img={item.urlToImage}
                      featured={index < 2} // First two items are larger
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No external news available</p>
                </div>
              )}
            </section>
          )}

          {/* Trending News Section */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
            {trendingNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingNews.slice(0, 3).map((item, index) => (
                  <NewsItem
                    key={`trending-${index}`}
                    title={item.title}
                    content={item.description}
                    category={item.source?.name}
                    url={item.url}
                    img={item.urlToImage}
                    featured={index < 2} // First two items are larger
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading trending news...</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;