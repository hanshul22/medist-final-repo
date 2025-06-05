import { useState,useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialService from '../../services/TestimonialService';

function TestimonialsSection() {
  const testimonial = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Regular Patient',
      content: 'MediLab provides exceptional service with quick results. Their online portal makes it easy to access my test history. The staff is professional and makes me feel comfortable during every visit.',
      rating: 5,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 2,
      name: 'Dr. Michael Rodriguez',
      role: 'Referring Physician',
      content: 'As a physician who regularly refers patients to MediLab, I can vouch for their accuracy and reliability. Their comprehensive test reports help me make accurate diagnoses, and their turnaround time is impressive.',
      rating: 5,
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 3,
      name: 'Jennifer Thompson',
      role: 'Healthcare Administrator',
      content: 'MediLab has been our partner for laboratory services for over five years. Their consistency, accuracy, and professional approach have made them an invaluable asset to our healthcare facility.',
      rating: 4,
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

const [testimonials, setTestimonial] = useState([]);
    useEffect(() => {
      // Replace with your actual API URL
      TestimonialService.getWebTestimonial()
        .then((data) => {console.log(data),setTestimonial(data.data)})
        .catch((err) => console.error('Error fetching services:', err));
    }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="text-lg text-neutral-600">
            Read testimonials from our satisfied patients and healthcare partners.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-neutral-50 rounded-lg p-8 shadow-sm">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={i < testimonial.rating ? "text-warning" : "text-neutral-300"}
                            fill={i < testimonial.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <p className="text-neutral-700 italic mb-6">"{testimonial.message}"</p>
                      <div className="flex items-center">
                        <img
                          src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-neutral-500">{testimonial.designation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md text-neutral-700 hover:text-primary transition-colors z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md text-neutral-700 hover:text-primary transition-colors z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full ${
                  index === currentIndex ? 'bg-primary' : 'bg-neutral-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;