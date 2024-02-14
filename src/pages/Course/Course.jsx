import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import "./Course.scss";
import { Button, Container } from "react-bootstrap";

export function Course() {

  const { id } = useParams();
  const token = localStorage.getItem("token")
  const [course, setCourse] = useState(null);
  const [episode, setEpisode] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    getCourses();
  }, []);

  function getCourses() {
    axios.get(`${process.env.REACT_APP_IP}/courses/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response.data)

        setCourse(response.data.course);
        setCurrentEpisode(response.data.course.episodes);
      })
      .catch((error) => {
        return toast.error(error.response.data.message, { position: 'bottom-right', duration: 2500 });
      });
  }

  function setWatchTime(seconds) {
    axios.post(`${process.env.REACT_APP_IP}/episodes/${episode?.id}/watchTime`, { seconds }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function postLike() {
    setWatchTime(videoRef.current.currentTime);
    axios.post(`${process.env.REACT_APP_IP}/likes`, { courseId: course.id }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        getCourses();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function postFavorite() {
    setWatchTime(videoRef.current.currentTime);
    axios.post(`${process.env.REACT_APP_IP}/favorites`, { courseId: course.id }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        getCourses();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function setCurrentEpisode(eps) {
    const ep = eps.find((ep) => ep.seconds_long > ep.watchTime);
    setEpisode((ep) ? ep : eps[0]);
  }

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.currentTime = episode?.watchTime || 0;

    const handleVideoEvent = () => {
      if (episode) {
        setWatchTime(videoElement.currentTime)
      }
    };
    const handleUrlEvent = () => {
      if (episode) {
        setWatchTime(videoElement.currentTime)
        window.removeEventListener("popstate", handleUrlEvent);
      }
    }

    videoElement.addEventListener("pause", handleVideoEvent);
    videoElement.addEventListener("ended", handleVideoEvent);
    window.addEventListener("beforeunload", handleVideoEvent);
    window.addEventListener("popstate", handleUrlEvent);

    return () => {
      videoElement.removeEventListener("pause", handleVideoEvent);
      videoElement.removeEventListener("ended", handleVideoEvent);
      window.removeEventListener("beforeunload", handleVideoEvent);
    };
  }, [episode]);

  function getNextEp() {
    return course?.episodes.find((ep) => ep.order === episode.order + 1) || false;
  }

  function nextVideo() {
    setWatchTime(episode.seconds_long);
    setEpisode(getNextEp());
  }

  return (
    <Container className="container-course">
      <div className="row flex-wrap">
        <div className="div-video col-lg-8 col-12">
          <video poster={episode?.thumbnail_url && episode.thumbnail_url} controls className="w-100" ref={videoRef}>
            {episode && <source src={episode?.video_url} />}
          </video>
          <div className="d-flex w-100 justify-content-end" style={{ height: "40px" }}>
            <span className={`material-icons-outlined like-icon my-auto ${course?.like && 'liked-icon'}`}
              data-toggle="tooltip"
              title={`${course?.like === true ? 'Remover' : 'Marcar como'} "Gostei"`}
              onClick={() => postLike()}>
              thumb_up
            </span>
            <span className={`material-icons like-icon my-auto ms-1 ${course?.favorite && 'liked-icon'}`}
              data-toggle="tooltip"
              title={`${course?.favorite === true ? 'Curso já marcado como' : 'Marcar como'} "Favorito"`}
              onClick={() => postFavorite()}>
              {course?.favorite ? 'favorite' : 'favorite_border'}
            </span>
            <Button variant="transparent" disabled={getNextEp() ? false : true} className="btn-prox ms-3" onClick={() => nextVideo()}>próximo vídeo</Button>
          </div>
          <div className="row text-white mt-lg-2 mt-4">
            <h3>{episode?.name}</h3>
            <p>{episode?.synopsis}</p>
          </div>
        </div>
        <div className="list-eps col-lg-4 col-12 mt-lg-0 mt-4">
          <ul className="d-flex flex-column gap-3 ps-md-4 ps-2">
            {course && course?.episodes.map((ep, index) => {
              return <li key={ep.id} onClick={() => setEpisode(ep)} className={ep === episode ? 'ep-active' : ''}>{index + 1} - {ep.name}</li>
            })}
          </ul>
        </div>
      </div>
    </Container>
  )
}