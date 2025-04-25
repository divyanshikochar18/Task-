import React from 'react';
import { Doctor } from '../hooks/useDoctors';

interface Props {
  doctor: Doctor;
}

const DoctorCard: React.FC<Props> = ({ doctor }) => {
  return (
    <div data-testid="doctor-card" className="border p-4 rounded shadow bg-white">
      <h2 data-testid="doctor-name" className="text-xl font-semibold">{doctor.name}</h2>
      <p data-testid="doctor-specialty">{doctor.specialty}</p>
      <p data-testid="doctor-experience">Experience: {doctor.experience} years</p>
      <p data-testid="doctor-fee">Fee: ₹{doctor.fee}</p>
    </div>
  );
};

export default DoctorCard;
