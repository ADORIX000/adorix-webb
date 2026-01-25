import React from 'react';

const Profile = () => {
  return (
    <div className="pt-28 px-8 max-w-3xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
            <p className="text-gray-500 text-sm">Update your personal details here.</p>
        </div>
        <div className="p-8 space-y-6">
            <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-adorix-100 rounded-full flex items-center justify-center text-adorix-600 text-2xl font-bold">
                    D
                </div>
                <button className="text-sm border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50">Change Avatar</button>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="border p-3 rounded-lg" defaultValue="Deeghayu" />
                <input type="text" placeholder="Last Name" className="border p-3 rounded-lg" />
            </div>
            <input type="email" placeholder="Email" className="w-full border p-3 rounded-lg" defaultValue="user@example.com" disabled />
        </div>
        <div className="bg-gray-50 p-4 text-right">
            <button className="bg-adorix-900 text-white px-6 py-2 rounded-lg font-medium">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;