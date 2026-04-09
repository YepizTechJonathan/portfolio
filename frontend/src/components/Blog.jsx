import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBlogPosts } from '../services/api'

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getBlogPosts()
      .then((res) => setPosts(res.data))
      .catch(() => {})
  }, [])

  return (
    <section id="blog">
      <div className="container">
        <h2 className="section-title">Blog</h2>
        <p className="section-subtitle">
          Technical writeups and things I am learning — stored in a database, served via API.
        </p>
        <div className="blog-grid">
          {posts.length === 0 && (
            <p className="blog-empty">Posts coming soon — check back later.</p>
          )}
          {posts.map((post) => (
            <Link to={`/blog/${post.id}`} className="blog-card" key={post.id}>
              <div className="blog-tag">{post.category}</div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="blog-date">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
