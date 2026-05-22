import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const getGuestbook = () => api.get('/guestbook')
export const postGuestbook = (entry) => api.post('/guestbook', entry)

export const postContact = (msg) => api.post('/contact', msg)

export const getBlogPosts = () => api.get('/blog')
export const getBlogPost = (id) => api.get(`/blog/${id}`)

export const trackView = (slug) => api.post(`/projects/${slug}/view`)
export const getProjectViews = () => api.get('/projects/views')
