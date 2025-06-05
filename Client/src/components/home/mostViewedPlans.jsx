import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Droplet, 
  Microscope, 
  HeartPulse, 
  Dna, 
  FlaskConical 
} from 'lucide-react';
import PackageService from '../../services/PackageService';

function MostViewedPlans() {

  const [plans, setPlans] = useState([])
   useEffect(() => {
      // Replace with your actual API URL
      PackageService.getPopularPackage()
        .then((data) => {console.log(data),setPlans(data.data)})
        .catch((err) => console.error('Error fetching services:', err));
    }, []);

  // const plans = [
  //   {
  //     id: 1,
  //     title: 'Basic Health Checkup',
  //     icon: <HeartPulse size={40} className="text-primary" />,
  //     description: 'Complete health screening with basic blood tests and physical examination',
  //     price: '$99',
  //     link: '/services#basic-health'
  //   },
  //   {
  //     id: 2,
  //     title: 'Premium Blood Test',
  //     icon: <Droplet size={40} className="text-primary" />,
  //     description: 'Comprehensive blood panel including cholesterol, glucose, and organ function',
  //     price: '$149',
  //     link: '/services#blood-test'
  //   },
  //   {
  //     id: 3,
  //     title: 'Advanced Diagnostic',
  //     icon: <Microscope size={40} className="text-primary" />,
  //     description: 'Full body diagnostic scan with detailed medical report and consultation',
  //     price: '$299',
  //     link: '/services#diagnostic'
  //   },
  //   {
  //     id: 4,
  //     title: 'Cardiac Health Plan',
  //     icon: <HeartPulse size={40} className="text-primary" />,
  //     description: 'Specialized cardiac assessment including ECG, stress test and cholesterol panel',
  //     price: '$199',
  //     link: '/services#cardiac'
  //   },
  //   {
  //     id: 5,
  //     title: 'Women\'s Health Package',
  //     icon: <FlaskConical size={40} className="text-primary" />,
  //     description: 'Comprehensive women\'s health screening including mammogram and pap smear',
  //     price: '$249',
  //     link: '/services#womens-health'
  //   },
  //   {
  //     id: 6,
  //     title: 'Genetic Testing',
  //     icon: <Dna size={40} className="text-primary" />,
  //     description: 'Advanced genetic screening for predisposition to hereditary conditions',
  //     price: '$399',
  //     link: '/services#genetic'
  //   }
  // ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">Most Viewed Health Plans</h2>
          <p className="text-lg text-neutral-600">
            Our most popular health screening packages provide comprehensive assessments tailored to your needs.
            Each plan includes consultation with our specialists and detailed reports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mr-4">
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800">{plan.title}</h3>
                </div>
                <p className="text-neutral-600 mb-4">{plan.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">{plan.price}</span>
                  <Link 
                    to={plan.link} 
                    className="inline-flex items-center text-red-500 font-medium hover:text-red-600"
                  >
                    View Details
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="btn-primary inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
          >
            View All Plans
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default MostViewedPlans;
