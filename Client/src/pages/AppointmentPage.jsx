import { Helmet } from 'react-helmet';
import AppointmentForm from '../components/ui/AppointmentForm';

function AppointmentPage() {
  return (
    <>
      <Helmet>
        <title>Book Appointment | MediLab</title>
        <meta name="description" content="Schedule your lab test appointment online. We offer convenient scheduling options for all our diagnostic services." />
      </Helmet>

      <section className="py-12 bg-neutral-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Book Your Appointment</h1>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Schedule your lab test appointment online. Our team will confirm your booking and provide any additional instructions you may need.
              </p>
            </div>
            <AppointmentForm />
          </div>
        </div>
      </section>
    </>
  );
}

export default AppointmentPage; 