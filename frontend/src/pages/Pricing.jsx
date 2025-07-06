// import { useAuth } from '@clerk/clerk-react';
// import axiosInstance from '../utils/axios';
// import toast from 'react-hot-toast';

const Pricing = () => {
  // const { getToken } = useAuth();

  // TODO: Re-enable Razorpay integration when API key is available
  // const handleBuyPlan = async (planId) => {
  //   try {
  //     const token = await getToken();
  //     if (!token) throw new Error('Not authenticated');
  //
  //     // 1. Create order
  //     const orderRes = await axiosInstance.post(
  //       `/orders?planId=${planId}`,
  //       {},
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     const orderData = orderRes.data.data;
  //
  //     // 2. Open Razorpay
  //     const options = {
  //       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //       amount: orderData.amount * 100, // Razorpay expects paise
  //       currency: 'INR',
  //       name: 'Remove.bg',
  //       description: `Buy ${planId} credits`,
  //       order_id: orderData.id,
  //       handler: async function (response) {
  //         // 3. Verify payment
  //         try {
  //           await axiosInstance.post(
  //             `/orders/verify`,
  //             response,
  //             { headers: { Authorization: `Bearer ${token}` } }
  //           );
  //           toast.success('Credits added!');
  //           // Optionally refresh user credits here
  //         } catch (err) {
  //           toast.error('Payment verification failed');
  //         }
  //       },
  //       prefill: {},
  //       theme: { color: '#3b82f6' }
  //     };
  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (err) {
  //     toast.error(err.message || 'Something went wrong');
  //   }
  // };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: [
        '3 images per month',
        'Standard quality',
        'Basic support',
        'PNG format'
      ]
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      features: [
        '100 images per month',
        'HD quality',
        'Priority support',
        'All formats',
        'API access'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Unlimited images',
        '4K quality',
        '24/7 support',
        'All formats',
        'API access',
        'Custom solutions'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-500">
            Choose the plan that's right for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                bg-white rounded-lg shadow-lg p-8
                ${plan.popular ? 'ring-2 ring-blue-500' : ''}
              `}
            >
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {plan.name}
              </h3>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-slate-500">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-slate-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                // onClick={() => handleBuyPlan(plan.name)}
                className={`
                  w-full py-3 px-6 rounded-md font-medium
                  ${
                    plan.popular
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }
                  transition-colors duration-200
                `}
                disabled
              >
                Get Started (Coming Soon)
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing; 