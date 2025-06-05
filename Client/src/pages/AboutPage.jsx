import React from 'react';
import { Award, Building, Users, FileCheck, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';

function AboutPage() {
  const accreditations = [
    {
      name: 'College of American Pathologists (CAP)',
      description: 'The gold standard in laboratory accreditation, ensuring the highest level of quality in laboratory practices.',
      logo: <Award size={40} className="text-primary" />,
    },
    {
      name: 'Clinical Laboratory Improvement Amendments (CLIA)',
      description: 'Federal certification ensuring quality laboratory testing for all patient specimens.',
      logo: <FileCheck size={40} className="text-primary" />,
    },
    {
      name: 'Joint Commission International (JCI)',
      description: 'Global leader in healthcare accreditation, setting the highest standards for patient safety and quality care.',
      logo: <CheckCircle size={40} className="text-primary" />,
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Laboratory Director',
      image: 'https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Board-certified pathologist with over 15 years of experience in laboratory medicine. Dr. Chen oversees all laboratory operations and ensures adherence to quality standards.',
    },
    {
      name: 'Dr. James Wilson',
      role: 'Chief Pathologist',
      image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Specializing in anatomic and clinical pathology, Dr. Wilson brings 20 years of diagnostic expertise to our laboratory services.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Laboratory Manager',
      image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'With an extensive background in medical laboratory science, Emily ensures smooth operations and maintains our high standards of service.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | MediLab</title>
        <meta name="description" content="Learn about MediLab's history, mission, accreditations, and our team of expert laboratory professionals dedicated to providing accurate results." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl font-bold mb-4">About MediLab</h1>
            <p className="text-lg mb-4">
              Delivering accurate, reliable, and timely laboratory testing services for over 25 years.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="section-title">Our Story</h2>
              <p className="text-neutral-600 mb-4">
                Founded in 1998 by a team of pathologists and laboratory scientists, MediLab began with a simple mission: to provide accurate and timely diagnostic testing with a focus on patient care.
              </p>
              <p className="text-neutral-600 mb-4">
                What started as a small local laboratory has grown into a comprehensive medical testing facility serving thousands of patients and healthcare providers across the region. Throughout our growth, we have maintained our commitment to quality, accuracy, and compassionate service.
              </p>
              <p className="text-neutral-600">
                Today, MediLab is equipped with state-of-the-art technology and staffed by experienced professionals who are dedicated to advancing healthcare through precise diagnostics and personalized service.
              </p>
            </div>
            <div className="relative h-80 md:h-auto">
              <img
                src="https://images.pexels.com/photos/8441818/pexels-photo-8441818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Modern laboratory equipment"
                className="h-full w-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title">Our Mission & Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-neutral-600 mb-4">
                To improve healthcare outcomes through accurate, timely, and accessible laboratory testing services that empower patients and healthcare providers with reliable diagnostic information.
              </p>
              <p className="text-neutral-600">
                We strive to be the trusted laboratory partner for our community, providing exceptional service while embracing innovation and maintaining the highest standards of quality and ethics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Our Core Values</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <CheckCircle size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-medium">Accuracy</span>
                    <p className="text-neutral-600 text-sm">We are committed to delivering precise and reliable test results every time.</p>
                  </div>
                </li>
                <li className="flex">
                  <CheckCircle size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-medium">Compassion</span>
                    <p className="text-neutral-600 text-sm">We approach every patient interaction with empathy and understanding.</p>
                  </div>
                </li>
                <li className="flex">
                  <CheckCircle size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-medium">Innovation</span>
                    <p className="text-neutral-600 text-sm">We continuously adopt new technologies and methodologies to improve our services.</p>
                  </div>
                </li>
                <li className="flex">
                  <CheckCircle size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-medium">Integrity</span>
                    <p className="text-neutral-600 text-sm">We uphold the highest ethical standards in all aspects of our operations.</p>
                  </div>
                </li>
                <li className="flex">
                  <CheckCircle size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-medium">Accessibility</span>
                    <p className="text-neutral-600 text-sm">We strive to make quality laboratory services available to all who need them.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title">Our Accreditations</h2>
            <p className="text-lg text-neutral-600">
              MediLab maintains the highest standards through continuous quality improvement and adherence to national and international accreditation requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accreditations.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">{item.logo}</div>
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-neutral-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment & Technology */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="section-title">State-of-the-Art Equipment</h2>
              <p className="text-neutral-600 mb-4">
                At MediLab, we invest in advanced technology to ensure accurate results and efficient service. Our laboratory is equipped with the latest diagnostic instruments and automated systems.
              </p>
              <ul className="space-y-3">
                <li className="flex">
                  <CheckCircle size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-medium">Advanced Analyzers</span>
                    <p className="text-neutral-600 text-sm">High-throughput, fully automated clinical chemistry and immunoassay analyzers.</p>
                  </div>
                </li>
                <li className="flex">
                  <CheckCircle size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-medium">Molecular Diagnostics</span>
                    <p className="text-neutral-600 text-sm">PCR and next-generation sequencing platforms for precise genetic testing.</p>
                  </div>
                </li>
                <li className="flex">
                  <CheckCircle size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-medium">Digital Pathology</span>
                    <p className="text-neutral-600 text-sm">Digital imaging systems for enhanced pathological assessments.</p>
                  </div>
                </li>
                <li className="flex">
                  <CheckCircle size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-medium">Laboratory Information System</span>
                    <p className="text-neutral-600 text-sm">Integrated management system ensuring accuracy and efficiency throughout the testing process.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2 relative h-80 md:h-auto">
              <img
                src="https://images.pexels.com/photos/6476254/pexels-photo-6476254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Laboratory equipment"
                className="h-full w-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title">Meet Our Expert Team</h2>
            <p className="text-lg text-neutral-600">
              Our team of experienced laboratory professionals is dedicated to providing the highest quality diagnostic services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-60">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-neutral-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;