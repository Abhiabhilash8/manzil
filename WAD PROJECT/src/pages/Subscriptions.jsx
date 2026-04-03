import { useAuth } from '../context/AuthContext';
import PlanCard from '../components/PlanCard';

export default function Subscriptions() {
  const { user, updatePlan } = useAuth();

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for quick commutes.',
      features: ['Trips only']
    },
    {
      id: 'gold',
      name: 'Gold',
      price: '₹99/month',
      description: 'Ideal for frequent travelers.',
      features: ['Trips support', 'Bus & Train Bookings']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹199/month',
      description: 'The ultimate travel companion.',
      features: ['Trips support', 'All Bookings', 'Live Flight Alerts']
    }
  ];

  const handleSelectPlan = (planId) => {
    // In a real app we would do payment verification
    updatePlan(planId);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title" style={{ color: 'var(--accent-brown)' }}>Subscriptions</h1>
        <p className="page-subtitle">Upgrade your travel experience</p>
      </div>

      <div style={{ marginTop: '16px' }}>
        {plans.map(plan => (
          <PlanCard 
            key={plan.id} 
            plan={plan} 
            currentPlan={user?.plan} 
            onSelect={handleSelectPlan} 
          />
        ))}
      </div>
    </div>
  );
}
