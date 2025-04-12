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
      img: "/images/cover/cover8.jpg",
      title: "Known to Unknown by Subhadeep Ghosh",
    },
    {
      img: "/images/cover/cover7.jpg",
      title: "Natural Vision by Subhadeep Ghosh",
    },
    {
      img: "/images/cover/cover6.jpg",
      title: "Bhramjal by Dr. Kamlesh Kumar",
    },
    {
      img: "/images/cover/Cover5.jpg",
      title: "Saagara Raagamu",
    },
    {
      img: "/images/cover/Cover4.jpg",
      title: "The Cooking God in You",
    },
    {
      img: "/images/cover/Cover3.jpg",
      title: "Samkalin Hindi Sahitya",
    },
    {
      img: "/images/cover/Cover2.jpg",
      title: "Eternally Imperfect",
    },
    {
      img: "/images/cover/Cover1.jpg",
      title: "Beauty Sleep",
    }
  ];

  return (
    <section className="section py-5" style={{ background: "#fdefe0" }}>
      <div className="container">
        <div className="heading-block mb-4 border-bottom-0">
          <h2 className="fs-2 text-danger">
            <i className="bi bi-book-fill text-danger"></i> Featured Book
          </h2>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-3 col-sm-6 text-center">
            <a href="">
  <img
    src="/images/cover/cover6.jpg"
    alt="Bhramjal"
    className="img-fluid border rounded-3"
    width={230}
    style={{ boxShadow: "5px 5px 10px black" }}
  />
</a>

          </div>
          <div className="col-lg-6 col-sm-6 mt-3 mt-sm-0">
            <div className="heading-block">
              <h6 className="text-danger fs-4">भ्रमजाल</h6>
              <span className="text-primary">डॉ. कमलेश कुमार</span>
            </div>
            <p className="mb-0">
              कुछ यात्राएँ कलम से नहीं, आत्मा से लिखी जाती हैं। "भ्रमजाल" ऐसी ही एक अनुभूति है, जिसे मैंने केवल शब्दों से नहीं, अपनी चेतना, अपने जीवन और अपने भीतर गूंजते हर प्रश्न के उत्तर की तलाश से रचा है। यह पुस्तक मेरी आवाज़ नहीं, उन सभी मौनों की प्रतिध्वनि है जिन्हें समाज ने अनसुना कर दिया, जिन्हें कभी सवाल पूछने की इजाज़त नहीं मिली।
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
