// servicesData.ts
export const allServices = [
  { id: 1, title: 'Graphic Design', description: 'Logos, posters, and more.', user: 'Alice', category: 'Design', image: 'https://images.unsplash.com/photo-1572044162444-24c95c8859da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, title: 'Tutoring in Math', description: 'Calculus, Algebra, etc.', user: 'Bob', category: 'Tutoring', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, title: 'Coding Help', description: 'Python, JavaScript, and Java assignments.', user: 'Charlie', category: 'Tech', image: 'https://images.unsplash.com/photo-1534665482403-a909d0d97c67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, title: 'Music Editing', description: 'Mixing and mastering tracks.', user: 'David', category: 'Creative', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, title: 'Photography', description: 'Portraits and event photography.', user: 'Eve', category: 'Creative', image: 'https://images.unsplash.com/photo-1520342892973-4f3b6a9b5f5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

export function addService(newService: { title: string; description: string; category: string; image: string }) {
  const newId = allServices.length > 0 ? Math.max(...allServices.map(s => s.id)) + 1 : 1;
  const serviceWithId = { id: newId, user: 'New User', ...newService };
  allServices.push(serviceWithId);
  return serviceWithId;
}
