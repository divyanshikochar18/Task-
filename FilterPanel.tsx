import React from 'react';
import { Doctor } from '../hooks/useDoctors';

interface Props {
  selectedType: string;
  selectedSpecialties: string[];
  selectedSort: string;
  doctors: Doctor[];
  onFilterChange: (type: string, specialties: string[], sort: string) => void;
}

const FilterPanel: React.FC<Props> = ({
  selectedType,
  selectedSpecialties,
  selectedSort,
  doctors,
  onFilterChange,
}) => {
  const uniqueSpecialties = Array.from(new Set(doctors.map(d => d.specialty)));

  const toggleSpecialty = (spec: string) => {
    const updated = selectedSpecialties.includes(spec)
      ? selectedSpecialties.filter(s => s !== spec)
      : [...selectedSpecialties, spec];
    onFilterChange(selectedType, updated, selectedSort);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 data-testid="filter-header-moc" className="font-semibold">Consultation Type</h3>
        <label className="block">
          <input
            type="radio"
            name="consultation"
            checked={selectedType === 'Video Consult'}
            onChange={() => onFilterChange('Video Consult', selectedSpecialties, selectedSort)}
            data-testid="filter-video-consult"
          /> Video Consult
        </label>
        <label className="block">
          <input
            type="radio"
            name="consultation"
            checked={selectedType === 'In Clinic'}
            onChange={() => onFilterChange('In Clinic', selectedSpecialties, selectedSort)}
            data-testid="filter-in-clinic"
          /> In Clinic
        </label>
      </div>

      <div>
        <h3 data-testid="filter-header-speciality" className="font-semibold">Specialties</h3>
        {uniqueSpecialties.map(spec => (
          <label key={spec} className="block">
            <input
              type="checkbox"
              checked={selectedSpecialties.includes(spec)}
              onChange={() => toggleSpecialty(spec)}
              data-testid={`filter-specialty-${spec.replace(/\s/g, '-')}`}
            /> {spec}
          </label>
        ))}
      </div>

      <div>
        <h3 data-testid="filter-header-sort" className="font-semibold">Sort By</h3>
        <label className="block">
          <input
            type="radio"
            name="sort"
            checked={selectedSort === 'fees'}
            onChange={() => onFilterChange(selectedType, selectedSpecialties, 'fees')}
            data-testid="sort-fees"
          /> Fees (asc)
        </label>
        <label className="block">
          <input
            type="radio"
            name="sort"
            checked={selectedSort === 'experience'}
            onChange={() => onFilterChange(selectedType, selectedSpecialties, 'experience')}
            data-testid="sort-experience"
          /> Experience (desc)
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;
