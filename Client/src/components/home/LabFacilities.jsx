import { Microscope, Dna, FlaskConical, Thermometer, Syringe, Stethoscope } from 'lucide-react';

function LabFacilities() {
  const facilities = [
    {
      icon: <Microscope className="w-12 h-12 text-primary {
        
      }" />,
      title: "Advanced Microscopy",
      description: "State-of-the-art microscopes for detailed sample analysis"
    },
    {
      icon: <Dna className="w-12 h-12 text-primary" />,
      title: "Genetic Testing",
      description: "Comprehensive DNA analysis and genetic screening"
    },
    {
      icon: <FlaskConical className="w-12 h-12 text-primary" />,
      title: "Chemical Analysis",
      description: "Precise chemical composition testing and analysis"
    },
    {
      icon: <Thermometer className="w-12 h-12 text-primary" />,
      title: "Temperature Control",
      description: "Controlled environment for accurate test results"
    },
    {
      icon: <Syringe className="w-12 h-12 text-primary" />,
      title: "Sample Collection",
      description: "Professional blood drawing and sample collection"
    },
    {
      icon: <Stethoscope className="w-12 h-12 text-primary" />,
      title: "Medical Consultation",
      description: "Expert consultation for test results interpretation"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">Our Laboratory Facilities</h2>
          <p className="text-lg text-neutral-600">
            Experience excellence in medical testing with our state-of-the-art facilities and equipment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div 
              key={index}
              className="p-6 bg-neutral-50 rounded-lg transition-transform hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                {facility.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{facility.title}</h3>
                <p className="text-neutral-600">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LabFacilities;