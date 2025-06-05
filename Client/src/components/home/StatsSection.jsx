import { Users, Clock, Award, Building } from 'lucide-react';

function StatsSection() {
  const stats = [
    {
      id: 1,
      value: '30,000+',
      label: 'Tests Performed Monthly',
      icon: <Clock size={32} className="text-white" />,
    },
    {
      id: 2,
      value: '98.7%',
      label: 'Accuracy Rate',
      icon: <Award size={32} className="text-white" />,
    },
    {
      id: 3,
      value: '25+',
      label: 'Years of Experience',
      icon: <Building size={32} className="text-white" />,
    },
    {
      id: 4,
      value: '50,000+',
      label: 'Satisfied Patients',
      icon: <Users size={32} className="text-white" />,
    },
  ];

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Impact by the Numbers</h2>
          <p className="text-lg text-white/80">
            MediLab delivers accurate testing results for thousands of patients every month, with industry-leading turnaround times and accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center p-6 bg-white/10 rounded-lg transform transition-transform hover:scale-105">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;