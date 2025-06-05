import { ArrowRight, Shield, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

function HealthPackages() {
  const packages = [
    {
      name: "Basic Health Screening",
      price: "$199",
      description: "Essential health checkup including basic blood work and vital checks",
      features: [
        "Complete Blood Count",
        "Lipid Profile",
        "Blood Sugar Test",
        "Kidney Function Test",
        "Liver Function Test"
      ]
    },
    {
      name: "Comprehensive Health Check",
      price: "$399",
      description: "Detailed health assessment with advanced screenings",
      features: [
        "All Basic Screening Tests",
        "Thyroid Profile",
        "Vitamin D & B12",
        "Cancer Markers",
        "Cardiac Risk Assessment"
      ],
      featured: true
    },
    {
      name: "Executive Health Plan",
      price: "$699",
      description: "Complete health evaluation with specialized tests",
      features: [
        "All Comprehensive Tests",
        "Genetic Screening",
        "Heavy Metal Analysis",
        "Hormone Panel",
        "Nutritional Consultation"
      ]
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">Health Packages</h2>
          <p className="text-lg text-neutral-600">
            Choose from our carefully designed health packages for comprehensive wellness screening
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`relative rounded-lg overflow-hidden transition-transform hover:scale-105 ${
                pkg.featured 
                  ? 'bg-primary text-white shadow-xl transform scale-105' 
                  : 'bg-white text-neutral-900'
              }`}
            >
              {pkg.featured && (
                <div className="absolute top-4 right-4 bg-warning text-white px-3 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold mb-4">{pkg.price}</div>
                <p className={`mb-6 ${pkg.featured ? 'text-white/90' : 'text-neutral-600'}`}>
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Shield size={16} className="mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`inline-flex items-center justify-center w-full px-6 py-3 rounded-md transition-colors ${
                    pkg.featured
                      ? 'bg-white text-primary hover:bg-neutral-100'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  Book Now
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center p-6 bg-white rounded-lg">
            <Shield size={40} className="text-primary mr-4" />
            <div>
              <h4 className="font-semibold mb-1">Quality Assured</h4>
              <p className="text-sm text-neutral-600">All tests conducted in certified laboratories</p>
            </div>
          </div>
          
          <div className="flex items-center p-6 bg-white rounded-lg">
            <Clock size={40} className="text-primary mr-4" />
            <div>
              <h4 className="font-semibold mb-1">Quick Results</h4>
              <p className="text-sm text-neutral-600">Get your results within 24-48 hours</p>
            </div>
          </div>
          
          <div className="flex items-center p-6 bg-white rounded-lg">
            <Award size={40} className="text-primary mr-4" />
            <div>
              <h4 className="font-semibold mb-1">Expert Analysis</h4>
              <p className="text-sm text-neutral-600">Detailed report with professional interpretation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HealthPackages;