import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet';
import useAsync from '../hooks/useAsync';
import ContactServices from '../services/ContactServices';

function ContactPage() {
  const { data, error, isLoading, run } = useAsync(ContactServices.getContactDetail);
  // console.log(data)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    agreeToTerms: false
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real application, you would send this to your backend
      console.log('Form submitted:', formData);
      setFormStatus({ submitted: true, error: null });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        agreeToTerms: false
      });
    } catch (error) {
      setFormStatus({ submitted: false, error: 'Failed to submit form. Please try again.' });
    }
  };

  // const locations = [
  //   {
  //     city: "Bengaluru",
  //     flag: "🇮🇳",
  //     address: "1234 MG road, Bengaluru, Karnataka 560001, India",
  //     email: "contact@demowebsite.com",
  //     phone: "+91 98765-43210"
  //   },
  //   {
  //     city: "London",
  //     flag: "🇬🇧",
  //     address: "56 High street, London, WC1A 1AA, United Kingdom",
  //     email: "support@demowebsite.com",
  //     phone: "+44 1234-567890"
  //   },
  //   {
  //     city: "Sydney",
  //     flag: "🇦🇺",
  //     address: "78 George street, Sydney, NSW 2000, Australia",
  //     email: "sales@demowebsite.com",
  //     phone: "+61 2 1234-5678"
  //   }
  // ];

  return (
    <>
      <Helmet>
        <title>Contact Us | MediLab</title>
        <meta name="description" content="Get in touch with MediLab for all your laboratory testing needs. Find our contact information and office locations." />
      </Helmet>

      <section className="bg-neutral-50 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Get in touch</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex items-center justify-center">
                <MapPin className="text-primary mr-3" />
                <div>
                  <h3 className="font-semibold text-lg">Street info</h3>
                  <p className="text-neutral-600">Inida</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="text-primary mr-3" />
                <div>
                  <h3 className="font-semibold text-lg">Dial our line</h3>
                  <p className="text-neutral-600">We're ready to help</p>
                  <a href={`tel:+91${data?.data?.phone}`} className="cs_iconbox_text">
                          +91 {data?.data?.phone}
                        </a>
                        <a href={`tel:+91${data?.data?.whatsApp}`} className="cs_iconbox_text">
                          +91 {data?.data?.whatsApp}
                        </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Mail className="text-primary mr-3" />
                <div>
                  <h3 className="font-semibold text-lg">We are here!</h3>
                  <p className="text-neutral-600">Ready to assist you</p>
                  <a href={`mailto:${data?.data?.email}`} className="cs_iconbox_text">
                          {data?.data?.email}
                        </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            {/* <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Have some queries?</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Phone number"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                    required
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-neutral-600">
                    I agree to the <a href="#" className="text-primary hover:underline">rules & policies</a> and acknowledge that my info will be stored safely following the data guidelines.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition-colors"
                >
                  SUBMIT NOW
                </button>

                {formStatus.submitted && (
                  <p className="text-success text-center">Thank you for your message. We'll get back to you soon!</p>
                )}
                {formStatus.error && (
                  <p className="text-error text-center">{formStatus.error}</p>
                )}
              </form>
            </div> */}

            {/* Map */}
            <div className="col-lg-12">
               
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9927.397014423128!2d-0.11606041997657368!3d51.53432469680956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b6eadb3896d%3A0x5aa8ffed63aea5ac!2sIslington%2C%20London%2C%20UK!5e0!3m2!1sen!2sbd!4v1726660581556!5m2!1sen!2sbd" />
            </div>
          </div>

          {/* Locations */}
          {/* <div className="mt-16">
            <h2 className="text-4xl font-bold text-neutral-800 mb-12">Our shop</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {locations.map((location, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-2">{location.flag}</span>
                    <h3 className="text-xl font-semibold">{location.city}</h3>
                  </div>
                  <p className="text-neutral-600 mb-4">{location.address}</p>
                  <div className="space-y-2">
                    <a href={`mailto:${location.email}`} className="block text-primary hover:text-primary-dark">
                      {location.email}
                    </a>
                    <a href={`tel:${location.phone}`} className="block text-primary hover:text-primary-dark">
                      {location.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default ContactPage;