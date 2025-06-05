import { useState, useEffect } from 'react';
import { Search, Calendar, Clock, ExternalLink, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { data } from '../data/data';

function Blogs() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
      searchTerm: '',
      source: 'all',
      sortBy: 'publishedAt'
    });
  
    const [sources, setSources] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const articlesPerPage = 12;
  
    useEffect(() => {
      fetchNews();
    }, [filters, currentPage]);
  
    const fetchNews = () => {
      try {
        setLoading(true);
        
        // Use the local data instead of API fetch
        if (data.status === 'ok') {
          const articles = data.articles || [];
          setTotalResults(data.totalResults || articles.length);
          
          // Extract unique sources
          const uniqueSources = [...new Set(articles.map(article => article.source.name))];
          setSources(uniqueSources);

          // Filter by search term if provided
          let filteredArticles = articles;
          if (filters.searchTerm) {
            const term = filters.searchTerm.toLowerCase();
            filteredArticles = filteredArticles.filter(article => 
              article.title.toLowerCase().includes(term) || 
              article.description.toLowerCase().includes(term)
            );
          }

          // Filter by source if selected
          filteredArticles = filters.source === 'all' 
            ? filteredArticles 
            : filteredArticles.filter(article => article.source.name === filters.source);
          
          // Sort articles
          if (filters.sortBy === 'publishedAt') {
            filteredArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
          }
          
          // Pagination
          const startIndex = (currentPage - 1) * articlesPerPage;
          const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);
          
          setNews(paginatedArticles);
          setTotalResults(filteredArticles.length);
          
          // If current page has no results but there are results on previous pages,
          // go back to the last page with results
          if (paginatedArticles.length === 0 && currentPage > 1 && filteredArticles.length > 0) {
            const lastPageWithResults = Math.ceil(filteredArticles.length / articlesPerPage);
            setCurrentPage(Math.min(currentPage - 1, lastPageWithResults));
          }
        } else {
          throw new Error(data.message || 'Failed to fetch news');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters(prev => ({ ...prev, [name]: value }));
      setCurrentPage(1); // Reset to first page when filters change
    };
  
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    const formatTime = (dateString) => {
      return new Date(dateString).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    };

    const totalPages = Math.ceil(totalResults / articlesPerPage);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0); // Scroll to top when page changes
    };
  
    if (error) {
      return (
        <div className="bg-red-50 p-4 rounded-lg text-red-600">
          <p>Error: {error}</p>
        </div>
      );
    }
  
    return (
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Latest Medical News</h2>
            
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow-sm">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="searchTerm"
                    value={filters.searchTerm}
                    onChange={handleFilterChange}
                    placeholder="Search medical news..."
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                </div>
              </div>
  
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Source
                </label>
                <div className="relative">
                  <select
                    name="source"
                    value={filters.source}
                    onChange={handleFilterChange}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                  >
                    <option value="all">All Sources</option>
                    {sources.map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                </div>
              </div>
  
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                  >
                    <option value="publishedAt">Latest First</option>
                    <option value="relevancy">Relevance</option>
                    <option value="popularity">Popularity</option>
                  </select>
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                </div>
              </div>
            </div>
          </div>
  
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <>
              {news.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {news.map((article, index) => (
                    <article 
                      key={index}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
                    >
                      {article.urlToImage && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <div className="flex items-center text-white text-sm">
                              <Calendar size={14} className="mr-1" />
                              <span>{formatDate(article.publishedAt)}</span>
                              <span className="mx-2">•</span>
                              <Clock size={14} className="mr-1" />
                              <span>{formatTime(article.publishedAt)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <span className="text-sm text-primary font-medium">
                            {article.source.name}
                          </span>
                          {article.author && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="text-sm text-neutral-600">
                                {article.author}
                              </span>
                            </>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <p className="text-neutral-600 mb-4 line-clamp-3">
                          {article.description}
                        </p>
                        
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                        >
                          Read Full Article
                          <ExternalLink size={16} className="ml-1" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <h3 className="text-xl font-medium text-neutral-700 mb-2">No results found</h3>
                  <p className="text-neutral-500">
                    Try adjusting your search terms or filters to find medical news.
                  </p>
                </div>
              )}

              {/* Pagination - Only show if there's data and more than one page */}
              {news.length > 0 && totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md border ${currentPage === 1 ? 'text-neutral-300 cursor-not-allowed' : 'text-neutral-700 hover:bg-neutral-100'}`}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <div className="flex space-x-1">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        let pageNumber;
                        
                        // Display different page numbers based on current page
                        if (totalPages <= 5) {
                          pageNumber = i + 1;
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i;
                        } else {
                          pageNumber = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={i}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`w-10 h-10 flex items-center justify-center rounded-md ${
                              currentPage === pageNumber
                                ? 'bg-primary text-white'
                                : 'text-neutral-700 hover:bg-neutral-100'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md border ${currentPage === totalPages ? 'text-neutral-300 cursor-not-allowed' : 'text-neutral-700 hover:bg-neutral-100'}`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    );
  }
  
  export default Blogs;