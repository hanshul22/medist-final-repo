import React, { useState, useEffect } from 'react';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would normally call an API service to get recent activities
    // For now, we'll use mock data
    const fetchActivities = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
          const mockActivities = [
            {
              id: 1,
              type: 'user',
              action: 'registered',
              subject: 'John Doe',
              timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              )
            },
            {
              id: 2,
              type: 'post',
              action: 'published',
              subject: 'Latest Health Tips',
              timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )
            },
            {
              id: 3,
              type: 'appointment',
              action: 'booked',
              subject: 'Dental Checkup',
              timestamp: new Date(Date.now() - 3 * 60 * 60000).toISOString(),
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )
            },
            {
              id: 4,
              type: 'testimonial',
              action: 'added',
              subject: 'Great service review',
              timestamp: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              )
            },
            {
              id: 5,
              type: 'user',
              action: 'updated',
              subject: 'Sarah Johnson',
              timestamp: new Date(Date.now() - 8 * 60 * 60000).toISOString(),
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )
            }
          ];
          
          setActivities(mockActivities);
          setLoading(false);
        }, 800);
        
      } catch (error) {
        console.error('Error fetching activities', error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hr ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day ago`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center space-x-3 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1 p-1 rounded-full bg-gray-100">
            {activity.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {activity.type === 'user' && (
                <>User <span className="font-semibold">{activity.subject}</span> {activity.action}</>
              )}
              {activity.type === 'post' && (
                <>New post <span className="font-semibold">{activity.subject}</span> was {activity.action}</>
              )}
              {activity.type === 'appointment' && (
                <>New appointment <span className="font-semibold">{activity.subject}</span> was {activity.action}</>
              )}
              {activity.type === 'testimonial' && (
                <>New testimonial <span className="font-semibold">{activity.subject}</span> was {activity.action}</>
              )}
            </p>
            <p className="text-xs text-gray-500">{formatTime(activity.timestamp)}</p>
          </div>
          <div className="flex-shrink-0">
            <button className="text-xs text-gray-500 hover:text-gray-700">View</button>
          </div>
        </div>
      ))}
      
      <div className="pt-2 mt-2 border-t">
        <button className="text-sm text-primary hover:text-primary-dark font-medium">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity; 