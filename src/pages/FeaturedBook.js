import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const FeaturedBook = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const [books, setBooks] = useState([]);
  const [latestBook, setLatestBook] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/images`);
        if (res.data.length > 0) {
          setBooks(res.data);
          setLatestBook(res.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch images", err);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="section py-5" style={{ background: "#fdefe0" }}>
      <div className="container">
        <div className="heading-block mb-4 border-bottom-0">
          <h2 className="fs-2 text-danger">
            <i className="bi bi-book-fill text-danger"></i> Featured Book
          </h2>
        </div>
        {latestBook && (
          <div className="row align-items-center">
            <div className="col-lg-3 col-sm-6">
              <a href="https://www.rankpublishinghouse.store" target="_blank" rel="noopener noreferrer">
              <img
                src={latestBook.url}
                alt={latestBook.title}
                className="img-fluid border rounded-3"
                width={230}
                style={{ boxShadow: "5px 5px 10px black" }}
              />
              </a>
            </div>
            <div className="col-lg-6 col-sm-6 mt-3 mt-sm-0">
              <div className="heading-block">
                <h6 className="text-danger fs-4">{latestBook.title}</h6>
                <span className="text-primary">{latestBook.name}</span>
              </div>
              <p className="mb-0">{latestBook.description}</p>
            </div>
            <div className="col-lg-3 mt-5 mt-lg-0 text-center">
              <h6 className="text-danger">
                <i className="bi bi-star-fill text-warning"></i> Other featured
                books
              </h6>
              <Slider {...settings}>
                {books.map((book, index) => (
                  <div key={index} className="p-2">
                    <a href="https://www.rankpublishinghouse.store" target="_blank" rel="noreferrer" className="d-block">
                      <img
                        src={book.url}
                        alt={`Book ${index + 1}`}
                        className="img-fluid rounded shadow-sm border border-secondary"
                      />
                    </a>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBook;
