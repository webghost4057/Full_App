import React from 'react'

const Input = React.forwardRef(function input(
    {
        label,
        type = "text",
        placeholder= 'Enter the name',
        className = '',
        ...props
    }
    , ref) {
    return (
        <div class="mb-4">
            {
                <label for="input" class="block text-sm font-medium text-gray-700">{label}</label>
            }
            <input
                type={type}
                placeholder={placeholder}
                className={`mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm ${className}`}
                {...props}
                ref={ref} />
        </div>


    )
})

export default input