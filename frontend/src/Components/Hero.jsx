import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const items = [
  <div
    className="item h-[80vh] w-full bg-[url('https://mobirise.com/extensions/commercem4/assets/images/gallery07.jpg')] bg-cover bg-center bg-no-repeat opacity-90"
    data-value="1"
  >
    <p className="text-bottom p-16 text-5xl font-bold text-white">
      Men's Sneakers upto 50% off
    </p>
  </div>,
  <div
    className="item h-[80vh] w-full bg-[url('https://mobirise.com/extensions/commercem4/assets/images/gallery01.jpg')] bg-cover bg-bottom bg-no-repeat opacity-90"
    data-value="2"
  >
    <p className=" p-16 text-5xl font-bold text-white">
      Sony Cameras upto 40% off
    </p>
  </div>,
  <div
    className="item h-[80vh] w-full bg-[url('https://mobirise.com/extensions/commercem4/assets/images/gallery06.jpg')] bg-cover bg-center bg-no-repeat opacity-90"
    data-value="3"
  >
    <p className=" p-16 text-5xl font-bold text-white">
      Women Sports Shoes upto 70% off
    </p>
  </div>,
  <div
    className="item h-[80vh] w-full bg-[url('https://mobirise.com/extensions/commercem4/assets/images/gallery02.jpg')] bg-cover bg-center bg-no-repeat opacity-90"
    data-value="4"
  >
    <p className=" p-16 text-5xl font-bold text-white">
      Bluetooth HeadPhones upto 40% off
    </p>
  </div>,
  <div
    className="item h-[80vh] w-full bg-[url('https://mobirise.com/extensions/commercem4/assets/images/gallery04.jpg')] bg-cover bg-center bg-no-repeat opacity-90"
    data-value="5"
  >
    <p className=" p-16 text-4xl font-bold text-white">
      Kids Sport Shoes upto 30% off
    </p>
  </div>,
];

const Hero = () => {
  return (
    <AliceCarousel
      autoPlay
      autoPlayStrategy="none"
      autoPlayInterval={2000}
      animationDuration={1000}
      animationType="slide"
      infinite
      touchTracking={false}
      disableDotsControls
      disableButtonsControls
      items={items}
    />
  );
};

export default Hero;
