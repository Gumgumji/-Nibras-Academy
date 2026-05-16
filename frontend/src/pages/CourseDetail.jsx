import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import courseService from '../services/course.service';
import Navbar from '../components/Navbar';

export default function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadCourse();
  }, [id]);

  async function loadCourse() {
    try {
      setLoading(true);
      const data = await courseService.getOne(id);
      setCourse(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Course not found');
    } finally {
      setLoading(false);
    }
  }

  function getYouTubeEmbedUrl(url) {
    if (!url) return null;
    let videoId = null;
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) videoId = watchMatch[1];
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) videoId = shortMatch[1];
    const embedMatch = url.match(/embed\/([^?]+)/);
    if (embedMatch) videoId = embedMatch[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  function openYoutube(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/60">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Link to="/courses" className="btn btn-ghost btn-sm mb-4 gap-2">
            ← Back to Courses
          </Link>
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!course) return null;

  const embedUrl = getYouTubeEmbedUrl(course.youtubeUrl);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-5xl">

        <Link to="/courses" className="btn btn-ghost btn-sm mb-4 gap-2">
          ← Back to Courses
        </Link>

        <div className="space-y-6">

          {/* Hero - عنوان ووصف */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
                <p className="text-white/90 text-lg">{course.description}</p>
              </div>

              {isAdmin && (
                <button
                  onClick={() => navigate(`/courses/${course.id}/edit`)}
                  className="btn btn-sm bg-white text-primary hover:bg-base-100 border-none"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* فيديو الكورس */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="text-2xl font-bold mb-4">Course Video</h2>

              {embedUrl ? (
                <div className="aspect-video rounded-xl overflow-hidden bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={embedUrl}
                    title={course.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <button
                  onClick={() => openYoutube(course.youtubeUrl)}
                  className="btn btn-primary"
                >
                  Watch on YouTube
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}