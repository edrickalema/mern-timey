import React from "react";

function FormRow({ name, type, default_value, label, required, onChange }) {
  return (
    <div className='my-2'>
      <label
        htmlFor='name'
        className='block mb-2 font-thin text-md text-gray-900 '
      >
        {label || name}
      </label>
      <input
        defaultValue={default_value}
        type={type}
        name={name}
        id={name}
        required={required}
        onChange={onChange}
        placeholder={`Enter you ${name}`}
        className='bg-zinc-50 mb-3 w-[100%] text-sm outline-none py-2 px-4 border-gray-300  border-[1px] rounded-md '
      />
    </div>
  );
}

export default FormRow;
