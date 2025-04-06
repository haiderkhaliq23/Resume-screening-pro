import React, { useState, useEffect } from 'react';
import './Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from your backend API
    // For demo purposes, we'll use mock data
    const mockBlogs = [
      {
        id: 1,
        title: 'How to Write a Winning Resume',
        excerpt: 'Learn the key elements that make your resume stand out to recruiters...',
        source: 'CareerAdvice.com',
        date: '2023-05-15'
      },
      {
        id: 2,
        title: 'Interview Tips for Tech Jobs',
        excerpt: 'Preparing for technical interviews? Here are 10 essential tips...',
        source: 'TechCareers',
        date: '2023-06-22'
      },
      {
        id: 3, 
        title: 'Navigating Career Changes',
        excerpt: 'Thinking about switching careers? Here are the steps to make a smooth transition...',
        source: 'ProfessionalGrowth',
        date: '2023-07-10'
      }
    ];

    setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="blogs-container">
      <h2>Career Advice Blogs</h2>
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="blog-list">
          {blogs.map(blog => (
            <div key={blog.id} className="blog-card">
              <h3>{blog.title}</h3>
              <p className="blog-meta">{blog.source} • {blog.date}</p>
              <p className="blog-excerpt">{blog.excerpt}</p>
              <a href="#" className="read-more">Read More</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
