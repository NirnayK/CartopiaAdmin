
const DynamicPropertyInput = ({ values, setValues, method }) => {

  const addNewProperty = (e) => {
    e.preventDefault();
    setValues([...values, { name: '', values: [''] }]);
  };

  const removeProperty = (e, index) => {
    e.preventDefault();
    const updatedValues = values.filter((_, i) => i !== index);
    setValues(updatedValues);
  };

  const addValue = (e, propertyIndex) => {
    e.preventDefault();
    const updatedValues = [...values];
    updatedValues[propertyIndex].values.push('');
    setValues(updatedValues);
  };

  const removeValue = (e, propertyIndex, valueIndex) => {
    e.preventDefault();
    const updatedValues = [...values];
    if (updatedValues[propertyIndex].values.length === 1) {
      return; // Ensure at least one value field remains
    }
    updatedValues[propertyIndex].values.splice(valueIndex, 1);
    setValues(updatedValues);
  };

  const handleChange = (e, propertyIndex, valueIndex = null) => {
    e.preventDefault();
    const updatedValues = [...values];
    if (valueIndex === null) {
      updatedValues[propertyIndex].name = e.target.value;
    }
    else {
      updatedValues[propertyIndex].values[valueIndex] = e.target.value;
    }
    setValues(updatedValues);
  };

  return (
    <div className="flex flex-col space-y-3">
      {values.map((property, propertyIndex) => (
        <div className="flex flex-col gap-2 p-3 rounded-lg border border-blue-300" key={propertyIndex}>

          {method !== "DELETE" && propertyIndex > 0 && (
            <button
              className="text-lg text-red-500 hover:text-red-600 mr-2 md:hidden"
              onClick={(e) => removeProperty(e, propertyIndex)}
            >
              - Remove Property
            </button>
          )}
          <div className="flex items-center gap-3">
            <label className="text-sm md:text-lg" htmlFor={`propertyName${propertyIndex}`}>
              Property:
            </label>
            <input
              type="text"
              id={`propertyName${propertyIndex}`}
              className="text-md md:flex-grow"
              value={property.name}
              required
              readOnly={method === "DELETE" || propertyIndex === 0}
              onChange={(e) => handleChange(e, propertyIndex)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }
              }
            />
            {method !== "DELETE" && propertyIndex > 0 && (
              <button
                className="text-lg text-red-500 hover:text-red-600 mr-2 hidden md:block"
                onClick={(e) => removeProperty(e, propertyIndex)}
              >
                - Remove Property
              </button>
            )}
          </div>
          <div>
            {property.values &&
              property.values.map((value, valueIndex) => (
                <div className="mb-2 gap-2 flex items-center p-1" key={valueIndex}>
                  <label
                    className="text-sm md:text-lg"
                    htmlFor={`propertyValue${propertyIndex}_${valueIndex}`}
                  >
                    {`${valueIndex + 1}`}:
                  </label>
                  <input
                    type="text"
                    id={`propertyValue${propertyIndex}_${valueIndex}`}
                    value={value}
                    required
                    readOnly={method === "DELETE"}
                    onChange={(e) => handleChange(e, propertyIndex, valueIndex)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addValue(e, propertyIndex);
                      }
                    }
                    }
                  />
                  {method !== "DELETE" && property.values.length > 1 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8  text-red-500 hover:text-red-600 cursor-pointer"
                      onClick={(e) => removeValue(e, propertyIndex, valueIndex)}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              ))}
            {method !== "DELETE" && (
              <button
                className="text-lg text-blue-500 hover:text-blue-600"
                onClick={(e) => addValue(e, propertyIndex)}
              >
                + Add New Value
              </button>
            )}
          </div>

        </div>
      ))}
      {method !== "DELETE" && (
        <button
          className="text-lg text-blue-500 hover:text-blue-600 ml-2"
          onClick={addNewProperty}
        >
          + Add New Property
        </button>
      )}
    </div>
  );

};

export default DynamicPropertyInput;


