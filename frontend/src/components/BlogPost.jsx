import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogPost } from '../services/api'

export default function BlogPost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getBlogPost(id)
      .then((res) => setPost(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <section className="blog-post-page"><div className="container"><p>Loading...</p></div></section>
  if (!post) return <section className="blog-post-page"><div className="container"><p>Post not found.</p><Link to="/">Go home</Link></div></section>

  return (
    <section className="blog-post-page">
      <div className="container">
        <Link to="/#blog" className="back-link"><i className="fa-solid fa-arrow-left"></i> Back</Link>
        <article>
          <div className="blog-tag">{post.category}</div>
          <h1>{post.title}</h1>
          <p className="blog-date">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </section>
  )
}
