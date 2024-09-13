import React from 'react';

const FormHeader = ({ title }) => (
  <div className="flex items-center mb-6">
    <img src="/logo.jpeg" alt="Logo" className="w-12 h-12 mr-4" />
    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
  </div>
);

export default FormHeader;
