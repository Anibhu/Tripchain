export const saveApplication = (application) => {
  const existingApplications = JSON.parse(localStorage.getItem('touristApplications') || '[]');
  const updatedApplications = [...existingApplications, application];
  localStorage.setItem('touristApplications', JSON.stringify(updatedApplications));
  return application;
};

export const getApplications = () => {
  return JSON.parse(localStorage.getItem('touristApplications') || '[]');
};

export const getApplicationById = (id) => {
  const applications = getApplications();
  return applications.find(app => app.id === id);
};

export const updateApplicationStatus = (id, status) => {
  const applications = getApplications();
  const updatedApplications = applications.map(app => 
    app.id === id ? { ...app, status, updateDate: new Date().toISOString() } : app
  );
  localStorage.setItem('touristApplications', JSON.stringify(updatedApplications));
  return updatedApplications.find(app => app.id === id);
};

export const getStats = () => {
  const applications = getApplications();
  const total = applications.length;
  const approved = applications.filter(app => app.status === 'approved').length;
  const pending = applications.filter(app => app.status === 'pending').length;
  const rejected = applications.filter(app => app.status === 'rejected').length;
  
  return { total, approved, pending, rejected };
};

export const deleteApplication = (id) => {
  const applications = getApplications();
  const updatedApplications = applications.filter(app => app.id !== id);
  localStorage.setItem('touristApplications', JSON.stringify(updatedApplications));
  return updatedApplications;
};