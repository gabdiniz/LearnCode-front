import { useEffect, useRef, useState } from "react";
import "./Carousel.scss";
import { motion } from "framer-motion";

export function Carousel({ images, categoria }) {

  const carousel = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
  }, [])

  return (
    <div className="carousel-maior">
      <motion.div className="carousel" whileTap={{ cursor: "grabbing" }} ref={carousel}>
        <h5 className="title-carousel">{categoria}</h5>
        <motion.div
          className="inner-carousel"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          initial={{ x: 100 }} animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {images.map((img) => {
            return (
              <motion.div className="item-carousel">
                <img src={img} alt="alt" />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};