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
    slidesToShow: 2, // Sirf 2 images dikhengi
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 2 sec ke baad next image ayegi
    arrows: true,
  };

  const books = [
    {
      img: "https://www.orangebooks.in/assets/images/featured-books/Beauty-Sleep.jpg",
      link: "https://orangebooks.in/product/Beauty-Sleep",
      title: "Beauty Sleep",
    },
    {
      img: "https://www.orangebooks.in/assets/images/featured-books/Eternally-Imperfect.png",
      link: "https://orangebooks.in/product/eternally-imperfect/",
      title: "Eternally Imperfect",
    },
    {
      img: "https://www.orangebooks.in/assets/images/featured-books/Samkalin-Hindi-Saahity-Mein-Naari-Vimarsh.png",
      link: "https://orangebooks.in/product/samkalin-hindi-saahity-mein-naari-vimarsh/",
      title: "Samkalin Hindi Sahitya",
    },
    {
      img: "https://www.orangebooks.in/assets/images/featured-books/The-Cooking-God-in-you.png",
      link: "https://orangebooks.in/product/The-Cooking-God-in-you",
      title: "The Cooking God in You",
    },
    {
      img: "https://www.orangebooks.in/assets/images/featured-books/Saagara-Raagamu.png",
      link: "https://orangebooks.in/product/Saagara-Raagamu",
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
          <div className="col-lg-3 col-sm-6">
            <a href="https://orangebooks.in/product/korangeera/">
              <img
                src="https://www.orangebooks.in/assets/images/featured-books/Korangeera.png"
                alt="Korangeera"
                className="img-fluid"
              />
            </a>
          </div>
          <div className="col-lg-6 col-sm-6 mt-3 mt-sm-0">
            <div className="heading-block">
              <h3 className="text-danger">Korangeera</h3>
              <span className="text-primary">By Abhijith Chandra</span>
            </div>
            <p className="mb-0">
              "Korangeera" is Abhijith Chandra's debut into the world of
              writing. Every goal achieved has a dream behind it and it is
              literally true in case of "Korangeera". Get ready for an
              adrenaline surge and let your imagination take you on a
              rollercoaster with this one.
            </p>
          </div>
          <div className="col-lg-3 mt-5 mt-lg-0">
            <h6 className="text-danger">
              <i className="bi bi-star-fill text-warning"></i> Other featured books
            </h6>
            <Slider {...settings}>
              {books.map((book, index) => (
                <div key={index} className="p-2">
                  <a href={book.link} className="d-block">
                    <img
                      src={book.img}
                      alt={book.title}
                      className="img-fluid rounded shadow-sm"
                      style={{ width: "120px", height: "180px" }}
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
