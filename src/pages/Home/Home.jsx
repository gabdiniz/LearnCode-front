
import "./Home.scss";
import { Carousel } from "../../components/Carousel/Carousel";

export function Home() {

  const image1 = "https://picsum.photos/340/340";
  const image2 = "https://picsum.photos/340/400";
  const image3 = "https://picsum.photos/340/500";
  const image4 = "https://picsum.photos/340/300";
  const image5 = "https://picsum.photos/340/500";

  const images = [image1, image2, image3, image4, image5];
  return (
    <div className="container-home">
      <Carousel images={images} categoria="Front-end"/>
      <Carousel images={images} categoria="Back-end"/>
    </div>
  );
};