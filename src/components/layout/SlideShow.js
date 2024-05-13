import React, { useState } from 'react';

const Slide = ({ image, title, button1Text, button1Link, button2Text, button2Link }) => (
  <div className="slide" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="slide-content">
      <h3>{title}</h3>
      <div className="buttons">
        <a href={button1Link} className="btn btn-primary">{button1Text}</a>
        <a href={button2Link} className="btn btn-secondary">{button2Text}</a>
      </div>
    </div>
  </div>
);

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    // Define your slides here with image, title, button text and links
    {
      image: '/HauteGirlKe.png',
      title: 'Slide 1 Title',
      button1Text: 'Shop Now',
      button1Link: '/menu',
      button2Text: 'Best Sellers',
      button2Link: '/best-sellers',
    },
    {
        image: '/HauteGirlKe.png',
        title: 'Slide 2 Title',
        button1Text: 'Shop Now',
        button1Link: '/menu',
        button2Text: 'Best Sellers',
        button2Link: '/best-sellers',
    },
    {
        image: '/HauteGirlKe.png',
        title: 'Slide 3 Title',
        button1Text: 'Shop Now',
        button1Link: '/menu',
        button2Text: 'Best Sellers',
        button2Link: '/best-sellers',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slideshow">
      <button onClick={prevSlide} className="prev-btn">&#8249;</button>
      <div className="slide-container">
        {slides[currentSlide] && <Slide {...slides[currentSlide]} />}
      </div>
      <button onClick={nextSlide} className="next-btn">&#8250;</button>
    </div>
  );
};

export default Slideshow;
