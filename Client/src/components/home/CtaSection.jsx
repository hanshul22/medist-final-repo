import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function CtaSection() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              Ready to Schedule Your Test?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl">
              Book your appointment online or contact us to discuss your testing needs. We offer convenient scheduling options, including same-day appointments for urgent cases.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/appoint_booking"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md bg-white text-secondary hover:bg-neutral-100 transition-colors"
              >
                Book Appointment
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md bg-transparent border border-white text-white hover:bg-white/10 transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Have Questions?</h3>
            <p className="text-neutral-600 mb-4">
              Our team is available to answer any questions you may have about our laboratory services, testing procedures, or insurance coverage.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-neutral-50 p-4 rounded-md">
                <h4 className="font-medium text-neutral-900 mb-1">Call Us</h4>
                <a href="tel:+18005551234" className="text-primary hover:text-primary-dark transition-colors">
                  800-555-1234
                </a>
              </div>
              <div className="bg-neutral-50 p-4 rounded-md">
                <h4 className="font-medium text-neutral-900 mb-1">Email Us</h4>
                <a href="mailto:info@medilab.com" className="text-primary hover:text-primary-dark transition-colors">
                  info@medilab.com
                </a>
              </div>
            </div>
            <Link
              to="/faq"
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
            >
              Check our FAQ section <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;