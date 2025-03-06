const Dropdown = ({ city, handleCityChange, districts, t }) => (
    <select className="form-select mt-3" value={city} onChange={handleCityChange}>
      {districts.map((district) => (
        <option key={district.value} value={district.value}>
          {t(`districts.${district.name}`)}
        </option>
      ))}
    </select>
  );
  
  export default Dropdown;
  