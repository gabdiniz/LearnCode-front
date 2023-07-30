import { useEffect, useRef, useState } from "react";
import "./Carousel.scss";
import { motion } from "framer-motion";
import axios from "axios";

export function Carousel({ id }) {

  const carousel = useRef();
  const [width, setWidth] = useState(0);

  const [images, setImages] = useState(null);
  const [title, setTitle] = useState();

  useEffect(() => {
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, [images]);

  useEffect(() => {
    axios.get(`http://localhost:3001/categories/${id}`)
      .then((response) => {
        const array = [];
        response.data.courses.map((e) => array.push(e.thumbnail_url));
        setImages(array);
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
            images &&
            images.map((img) => {
              return (
                <motion.div key={img} className="item-carousel">
                  <img src={img} alt="alt" />
                </motion.div>
              );
            })}
        </motion.div>
      </motion.div>
    </div>
  );
};