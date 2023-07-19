
import "./Home.scss";
import { Carousel } from "../../components/Carousel/Carousel";

export function Home() {

  const image1 = "https://programadoresdepre.com.br/wp-content/uploads/2020/11/Curso-de-Javascript-para-iniciantes.jpg";
  const image2 = "https://www.cursoemvideo.com/wp-content/uploads/2019/08/html5.jpg";
  const image3 = "https://arquivo.devmedia.com.br/cursos/imagem/curso_o-que-e-html_1966.jpg";
  const image4 = "https://picsum.photos/340/300";
  const image5 = "https://picsum.photos/340/500";

  const images = [image1, image2, image3, image4, image5];
  return (
    <div className="container-home">
      <Carousel images={images} categoria="Front-end" />
      <Carousel images={images} categoria="Back-end" />
    </div>
  );
};