import React,{useState,useEffect} from 'react';
import { Droplet, Microscope, HeartPulse, Dna, FlaskConical, Scan, Hourglass, DollarSign, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet';
import PackageService from '../services/PackageService';

function ServicesPage() {

   const [packages, setPackages] = useState([]);
   
  useEffect(() => {
      // Replace with your actual API URL
      PackageService.getWebPackage()
        .then((data) => {console.log(data),setPackages(data.data)})
        .catch((err) => console.error('Error fetching services:', err));
    }, []);

  const serviceCategories = [
    {
      id: 'blood-tests',
      title: 'Blood Tests',
      icon: <Droplet size={32} className="text-primary" />,
      description: 'Comprehensive blood panels to evaluate overall health and detect specific conditions.',
      services: [
        {
          name: 'Complete Blood Count (CBC)',
          description: 'Evaluates overall health and detects disorders like anemia, infection, and leukemia.',
          preparation: 'Fasting may be required depending on the specific test panel.',
          turnaround: '24 hours',
          priceRange: '$50-100',
        },
        {
          name: 'Comprehensive Metabolic Panel (CMP)',
          description: 'Assesses kidney and liver function, electrolyte and fluid balance, and blood sugar levels.',
          preparation: 'Fasting for 8-12 hours is typically required.',
          turnaround: '24 hours',
          priceRange: '$100-150',
        },
        {
          name: 'Lipid Panel',
          description: 'Measures cholesterol levels to assess risk of cardiovascular disease.',
          preparation: 'Fasting for 9-12 hours is required.',
          turnaround: '24 hours',
          priceRange: '$60-120',
        },
      ],
    },
    {
      id: 'diagnostic',
      title: 'Diagnostic Testing',
      icon: <Microscope size={32} className="text-primary" />,
      description: 'Advanced diagnostics to identify diseases, infections, and other health conditions.',
      services: [
        {
          name: 'COVID-19 Testing',
          description: 'PCR and rapid antigen testing for COVID-19 detection.',
          preparation: 'No special preparation is needed.',
          turnaround: '15 min - 24 hours depending on test type',
          priceRange: '$75-200',
        },
        {
          name: 'Allergy Testing',
          description: 'Identifies specific allergens causing reactions.',
          preparation: 'Avoid antihistamines for 5 days prior to testing.',
          turnaround: '3-5 days',
          priceRange: '$200-350',
        },
        {
          name: 'Hormone Testing',
          description: 'Evaluates hormone levels for various endocrine disorders.',
          preparation: 'Specific requirements based on the hormone being tested.',
          turnaround: '3-5 days',
          priceRange: '$150-400',
        },
      ],
    },
    {
      id: 'cardiac',
      title: 'Cardiac Testing',
      icon: <HeartPulse size={32} className="text-primary" />,
      description: 'Specialized tests to assess heart function and cardiovascular health.',
      services: [
        {
          name: 'Cardiac Enzyme Tests',
          description: 'Detects heart damage by measuring enzyme levels released during a heart attack.',
          preparation: 'No special preparation is needed.',
          turnaround: '2-4 hours (STAT available)',
          priceRange: '$150-300',
        },
        {
          name: 'Lipid Profile',
          description: 'Measures cholesterol levels to assess risk of heart disease.',
          preparation: 'Fasting for 9-12 hours is required.',
          turnaround: '24 hours',
          priceRange: '$60-120',
        },
        {
          name: 'Cardiac Risk Assessment',
          description: 'Comprehensive testing to evaluate overall risk of cardiovascular disease.',
          preparation: 'Fasting for 12 hours is typically required.',
          turnaround: '3-5 days',
          priceRange: '$250-500',
        },
      ],
    },
    // More service categories...
  ];

  return (
    <>
      <Helmet>
        <title>Our Services | MediLab</title>
        <meta name="description" content="Explore our comprehensive range of laboratory testing services, from blood work to advanced diagnostics, imaging, and genetic testing." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-primary-light py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Our Laboratory Services</h1>
            <p className="text-lg mb-8">
              We offer a comprehensive range of laboratory tests with accurate results and quick turnaround times. Our state-of-the-art facilities and experienced professionals ensure the highest quality of care.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-16">
            
              <div  className="scroll-mt-24">
                {/* serviceCategories Header */}
                <div className="flex items-center mb-6">
                  <div className="mr-4">{serviceCategories[0].icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold">{serviceCategories[0].title}</h2>
                    <p className="text-neutral-600">{serviceCategories[0].description}</p>
                  </div>
                </div>

                {/* Services List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map((service, index) => (
                    <div key={index} className="card p-6 hover:border-primary hover:border">
                      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-neutral-600 mb-4">{service.include[0].description}</p>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <FileText size={16} className="text-primary mt-1 mr-2 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Preparation:</span> {service?.preparation}
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Hourglass size={16} className="text-primary mt-1 mr-2 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Turnaround Time:</span> {service.reportTime}
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <DollarSign size={16} className="text-primary mt-1 mr-2 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Price Range:</span> {service.offerPrice}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            
          </div>
        </div>
      </section>

      {/* Insurance & Payment */}
      <section className="bg-neutral-50 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center">Insurance & Payment Information</h2>
            <p className="text-center text-neutral-600 mb-8">
              We accept most major insurance plans and offer various payment options for your convenience.
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Accepted Insurance Providers</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-neutral-50 p-3 rounded text-center">Aetna</div>
                <div className="bg-neutral-50 p-3 rounded text-center">Blue Cross</div>
                <div className="bg-neutral-50 p-3 rounded text-center">Cigna</div>
                <div className="bg-neutral-50 p-3 rounded text-center">Humana</div>
                <div className="bg-neutral-50 p-3 rounded text-center">Medicare</div>
                <div className="bg-neutral-50 p-3 rounded text-center">United Healthcare</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Payment Options</h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-600">
                <li>All major credit cards accepted</li>
                <li>Health Savings Account (HSA)</li>
                <li>Flexible Spending Account (FSA)</li>
                <li>Cash or check</li>
                <li>Payment plans available for qualifying services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServicesPage;