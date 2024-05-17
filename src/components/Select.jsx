import React from 'react'

const Select = ({
    label,
    options,
    classNameName,
    ...props
}, ref) => {
    return (
        <div className="mb-4">
            {
                label && <label for="select" className="block text-sm font-medium text-gray-700"></label>
            }
            <select className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${classNameName}`}
                {...props}
                ref={ref}
            >
                {
                    options?.map((option) => (
                        <option value={option} key={option}>{option}</option>
                    ))
                }

            </select>
        </div>

    )
}

export default React.forwardRef(Select)