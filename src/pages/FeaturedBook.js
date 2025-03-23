import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const FeaturedBook = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const books = [
    {
      img: "/images/cover/Cover1.jpg",
      title: "Beauty Sleep",
    },
    {
      img: "/images/cover/Cover2.jpg",
      title: "Eternally Imperfect",
    },
    {
      img: "/images/cover/Cover3.jpg",
      title: "Samkalin Hindi Sahitya",
    },
    {
      img: "/images/cover/Cover4.jpg",
      title: "The Cooking God in You",
    },
    {
      img: "/images/cover/Cover5.jpg",
      title: "Saagara Raagamu",
    },
  ];

  return (
    <section className="section py-5" style={{ background: "#fdefe0" }}>
      <div className="container">
        <div className="heading-block mb-4 border-bottom-0">
          <h2 className="ls0 nott mb-0 text-danger">
            <i className="bi bi-book-fill text-danger"></i> Featured Book
          </h2>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-3 col-sm-6 text-center">
            <a href="">
              <img
                src="/images/cover/Cover3.jpg"
                alt="Korangeera"
                className="img-fluid shadow-lg border border-danger rounded-3"
                width={230}
              />
            </a>
          </div>
          <div className="col-lg-6 col-sm-6 mt-3 mt-sm-0">
            <div className="heading-block">
              <h3 className="text-danger">My Life Story</h3>
              <span className="text-primary">By Kamlesh Yadav</span>
            </div>
            <p className="mb-0">
              "Life is a journey filled with both challenges and triumphs. My
              story is one of resilience, perseverance, and unwavering
              determination." "There were moments when the road ahead seemed
              uncertain, and obstacles tested my strength. Yet, I chose to rise,
              to learn, and to push forward—turning adversity into opportunity."
              "This is not just my story; it is the story of everyone who dares
              to dream, who refuses to give up, and who believes that with
              dedication, anything is possible."
            </p>
          </div>
          <div className="col-lg-3 mt-5 mt-lg-0 text-center">
            <h6 className="text-danger">
              <i className="bi bi-star-fill text-warning"></i> Other featured
              books
            </h6>
            <Slider {...settings}>
              {books.map((book, index) => (
                <div key={index} className="p-2">
                  <a href={book.link} className="d-block">
                    <img
                      src={book.img}
                      alt={book.title}
                      className="img-fluid rounded shadow-sm border border-secondary"
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBook;
