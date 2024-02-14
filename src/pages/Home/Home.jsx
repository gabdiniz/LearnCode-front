
import "./Home.scss";
import { Carousel } from "../../components/Carousel/Carousel";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

export function Home() {

  const [categories, setCategories] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_IP}/categories`)
      .then((response) => {
        setCategories(response.data);
      })
  }, [])

  return (
    <div className="container-home">
      <div></div>
      {
        categories &&
        categories.map((e) => {
          return (
            <Fragment key={e.id}>
              <Carousel id={e.id} />
            </Fragment>
          )
        })
      }
    </div>
  );
};