import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

function BlogSection() {
  const posts = [
    {
      title: "Understanding Blood Test Results: A Complete Guide",
      excerpt: "Learn how to interpret your blood test results and what different markers indicate about your health.",
      image: "https://images.pexels.com/photos/4226769/pexels-photo-4226769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Mar 15, 2024",
      category: "Health Education"
    },
    {
      title: "The Importance of Regular Health Screenings",
      excerpt: "Discover why preventive health screenings are crucial for early detection and maintaining optimal health.",
      image: "https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Mar 12, 2024",
      category: "Wellness"
    },
    {
      title: "Latest Advances in Medical Laboratory Technology",
      excerpt: "Explore the cutting-edge technologies revolutionizing medical testing and diagnostics.",
      image: "https://images.pexels.com/photos/4226122/pexels-photo-4226122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Mar 10, 2024",
      category: "Technology"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="section-title mb-2">Latest Health Insights</h2>
            <p className="text-lg text-neutral-600">
              Stay informed with our latest articles and health tips
            </p>
          </div>
          <Link
            to="/blogs"
            className="hidden md:inline-flex items-center text-primary hover:text-primary-dark font-medium"
          >
            View All Articles
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <Link to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-6">
                <div className="flex items-center text-sm text-neutral-500 mb-2">
                  <Calendar size={14} className="mr-1" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.category}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  <Link 
                    to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-neutral-600 mb-4">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                >
                  Read More
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            to="/blog"
            className="btn-primary"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BlogSection;