
const DynamicValueInput = ({ values, setValues, method }) => {

    const addNewValue = (e) => {
        e.preventDefault();
        const newValue = "";
        setValues([...values, newValue]);
    };

    const removeValue = (e, index) => {
        e.preventDefault();

        const updatedValues = values.filter((_, i) => i !== index);
        setValues(updatedValues);

    };

    const handleChange = (e, index) => {
        e.preventDefault();
        const updatedValues = [...values];
        updatedValues[index] = e.target.value;
        setValues(updatedValues);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    return (
        <>
            <div>
                {values.map((value, index) => (
                    <div className="flex p-2 mb-2 items-center" key={index}>
                        {/* Label and Input for each value */}
                        <label className="mr-2" htmlFor={`value${index}`}>
                            {`Value ${index + 1}`}:
                        </label>
                        <input
                            type="text"
                            id={`value${index}`}
                            value={value}
                            required
                            readOnly={method === 'DELETE'}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />

                        {/* Remove Button for each value */}
                        {method != 'DELETE' && (
                            <button
                                className="rounded-full bg-red-500 text-gold-500 hover:bg-red-600 h-8 w-8 mx-2"
                                onClick={(e) => removeValue(e, index)}
                            >
                                -
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button className="absolute right-10 text-blue-500 hover:text-blue-600 text-lg" onClick={(e) => addNewValue(e)}>
                + Add New Value
            </button>
        </>
    );
};

export default DynamicValueInput;
