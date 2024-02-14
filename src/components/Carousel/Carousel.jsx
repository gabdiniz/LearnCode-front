import { useEffect, useRef, useState } from "react";
import "./Carousel.scss";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

export function Carousel({ id }) {

  const carousel = useRef();
  const [width, setWidth] = useState(0);

  const [courses, setCourses] = useState(null);
  const [title, setTitle] = useState();

  useEffect(() => {
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, [courses]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP}/categories/${id}`)
      .then((response) => {
        const array = [];
        response.data.courses.map((e) => array.push(e));
        setCourses(array);
        setTitle(response.data.name);
      })
  }, [id]);

  return (
    <div className="carousel-maior">
      <motion.div className="carousel" whileTap={{ cursor: "grabbing" }} ref={carousel}>
        {
          title &&
          <h5 className="title-carousel">{title}</h5>
        }
        <motion.div
          className="inner-carousel"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          initial={{ x: 100 }} animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {
            courses &&
            courses.map((course) => {
              return (
                <Link to={`/course/${course.id}`}  key={course.id}>
                  <motion.div className="item-carousel" >
                    <img src={course.thumbnail_url} alt="alt" />
                  </motion.div>
                </Link>
              );
            })}
        </motion.div>
      </motion.div>
    </div>
  );
};