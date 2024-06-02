import { Carousel } from "react-bootstrap";

function CarouselHome(){
    return (
        <Carousel data-bs-theme="light">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/image/background_1.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/image/background_3.png"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/image/background_2.png"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      );
}
export default CarouselHome;