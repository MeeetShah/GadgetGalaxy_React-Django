import React from 'react';
import '../Aboutus.css';  // Add styles in a separate CSS file

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <section className="about-banner">
        <h1>About Gadget Galaxy</h1>
        <p>Your Trusted Electronics Store</p>
      </section>

      <section className="about-content">
        <h2>Our Story</h2>
        <p>
          Welcome to Gadget Galaxy, your go-to destination for all things electronics. 
          Founded in [Year], we have been delivering the latest and greatest in electronics 
          from top brands around the globe. Our mission is simple: to provide the highest 
          quality products at competitive prices while offering unmatched customer service.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>Wide range of electronic products including TVs, smartphones, laptops, and more.</li>
          <li>Top brands like Samsung, Sony, Apple, and more.</li>
          <li>Exclusive offers and deals on the latest tech gadgets.</li>
          <li>Fast and secure delivery service.</li>
        </ul>

        <h2>Our Values</h2>
        <p>
          At Gadget Galaxy, we pride ourselves on our core values:
        </p>
        <ul>
          <li><strong>Customer First:</strong> We are dedicated to providing an excellent shopping experience.</li>
          <li><strong>Quality Assurance:</strong> Every product we sell is thoroughly vetted to ensure top-notch quality.</li>
          <li><strong>Innovation:</strong> We stay ahead of the curve by offering the latest technology.</li>
          <li><strong>Integrity:</strong> Transparency and honesty are the pillars of our business.</li>
        </ul>

        <h2>Our Mission</h2>
        <p>
          Our mission is to bring you cutting-edge technology with the convenience of seamless online shopping.
          We strive to build lasting relationships with our customers by offering a wide variety of high-quality 
          electronics and providing exceptional after-sales service.
        </p>
      </section>

      <section className="about-team">
        <h2>Meet the Team</h2>
        <p>
          Our dedicated team is passionate about technology and committed to helping you find the right products 
          for your needs. From expert advice to technical support, we are here for you every step of the way.
        </p>
      </section>

      <section className="about-footer">
        <h2>Contact Us</h2>
        <p>
          Have questions? Need help with a product? Feel free to <a href="/contact">contact us</a>. 
          We're always happy to assist you with any queries or issues.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
