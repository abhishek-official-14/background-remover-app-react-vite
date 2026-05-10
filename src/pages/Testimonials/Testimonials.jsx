import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Card from "@components/common/Card";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./Testimonials.module.scss";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Photographer",
    content:
      "This tool has transformed my workflow. The background removal is incredibly accurate, even with complex hair details.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Michael Chen",
    role: "E-commerce Manager",
    content:
      "Batch processing saves me hours every week. The quality is outstanding and the API integration was seamless.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Emily Rodriguez",
    role: "Graphic Designer",
    content:
      "Best background remover I've used. The edge detection is superior to other tools I've tried.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className={styles.testimonials}>
      <div className="container">
        <h2 className="section-title">Loved by Creators Worldwide</h2>
        <p className="section-subtitle">Join thousands of satisfied users</p>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className={styles.swiper}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <Card className={styles.testimonial}>
                <div className={styles.header}>
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className={styles.avatar}
                  />
                  <div>
                    <h4 className={styles.name}>{testimonial.name}</h4>
                    <p className={styles.role}>{testimonial.role}</p>
                  </div>
                </div>
                <div className={styles.rating}>
                  {"★".repeat(testimonial.rating)}
                  {"☆".repeat(5 - testimonial.rating)}
                </div>
                <p className={styles.content}>"{testimonial.content}"</p>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
