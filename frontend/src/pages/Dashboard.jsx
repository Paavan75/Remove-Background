import { useUserContext } from '../context/UserContext';

const Dashboard = () => {
  const { userData, isLoading, error } = useUserContext();

  const recentImages = [
    { id: 1, name: 'image1.png', date: '2024-03-15', size: '2.4 MB' },
    { id: 2, name: 'image2.jpg', date: '2024-03-14', size: '1.8 MB' },
    { id: 3, name: 'image3.png', date: '2024-03-13', size: '3.2 MB' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">Welcome back, {userData?.fullName || 'User'}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Images Processed
            </h3>
            <p className="text-3xl font-bold text-blue-500">
              {userData?.imagesProcessed ?? 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Credits Remaining
            </h3>
            <p className="text-3xl font-bold text-green-500">
              {userData?.credits ?? 'N/A'}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Last Processed
            </h3>
            <p className="text-3xl font-bold text-slate-500">
              {userData?.lastProcessed ?? 'N/A'}
            </p>
          </div>
        </div>

        {/* Recent Images */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Images
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {recentImages.map((image) => (
                  <tr key={image.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {image.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {image.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {image.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-500 hover:text-blue-600 mr-4">
                        Download
                      </button>
                      <button className="text-red-500 hover:text-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 