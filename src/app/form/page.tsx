"use client";
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'

// declaring data type for each input for easier callback later
interface FormData {
    activity: string;
    price: string;
    type: string;
    booking: boolean;
    accessibility: number;
}

const form = () => {
    // using useState to declare initial value for form data
    const [formData, setFormData] = useState<FormData>({
        activity: '',
        price: '',
        type: '',
        booking: false,
        accessibility: 0
      });
    const [submittedData, setSubmittedData] = useState<FormData[]>([]);

    // load the data from local storage on first render
    useEffect(() => {
        const savedSubmittedData = localStorage.getItem('submittedData');
        if (savedSubmittedData) {
            setSubmittedData(JSON.parse(savedSubmittedData));
        }
    }, []);


    // this function is for handling the changes in input field
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);
    
    // this function is for handling the changes in input field of range
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, accessibility: parseFloat(e.target.value) }));
      };

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newSubmittedData = [...submittedData, formData];
        setSubmittedData(newSubmittedData);
        // set the submitted data to local storage to persist the data
        localStorage.setItem('submittedData', JSON.stringify(newSubmittedData));
        setFormData({ activity: '', price: '', type: '', booking: false, accessibility: 0 });
    };

    const handleDelete = (index: number) => {
        const updatedData = submittedData.filter((data, i) => i !== index);
        setSubmittedData(updatedData);
        // this line will update the local storage each deletion
        localStorage.setItem('submittedData', JSON.stringify(updatedData));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="flex space-x-4 w-full max-w-6xl"> {/* Flex container for side-by-side layout */}
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6 mb-4 w-full max-w-md">
                    
                    <h2 className="text-lg font-bold mb-4 text-gray-800">Activity Form</h2>
                    <label className="block mb-2 text-gray-700">
                        Activity:
                        <input 
                            type="text" 
                            name="activity" 
                            placeholder="Activity" 
                            value={formData.activity} 
                            onChange={handleChange} 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                    </label>

                    <label className="block mb-2 text-gray-700">
                        Price:
                        <input 
                            type="number" 
                            name="price" 
                            placeholder="Price" 
                            value={formData.price} 
                            onChange={handleChange} 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                    </label>

                    <label className="block mb-2 text-gray-700">
                        Type:
                        <select 
                            name="type" 
                            value={formData.type} 
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select type</option>
                            <option value="education">education</option>
                            <option value="recreational">recreational</option>
                            <option value="social">social</option>
                            <option value="diy">diy</option>
                            <option value="charity">charity</option>
                            <option value="cooking">cooking</option>
                            <option value="relaxation">relaxation</option>
                            <option value="music">music</option>
                            <option value="busywork">busywork</option>
                        </select>
                    </label>

                    <label className="block mb-2 text-gray-700">
                        Booking required?
                        <input 
                            type="checkbox" 
                            name="booking" 
                            checked={formData.booking} 
                            onChange={(e) => setFormData((prev) => ({ ...prev, booking: e.target.checked }))} 
                            className="ml-2"
                        />
                    </label>

                    <label className="block mb-2 text-gray-700">
                        Accessibility:
                        <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.1" 
                            value={formData.accessibility} 
                            onChange={handleSliderChange} 
                            className="mt-1 w-full"
                        />
                        <span className="text-gray-600">{formData.accessibility.toFixed(1)}</span>
                    </label>

                    <div className="flex space-x-4">
                        <Link
                            className="flex-1 rounded border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-500 text-white h-12 hover:bg-blue-600"
                            href="/"
                        >
                            Back
                        </Link>

                        <button 
                            type="submit" 
                            className="flex-1 bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {submittedData.length > 0 && (
                    <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-2 text-gray-800">Submitted Data:</h3>
                        <p className="text-base mb-2 text-gray-800">Total submitted Data: {submittedData.length}</p>
                        {submittedData.map((data, index) => (
                            <div key={index} className="mb-2 text-gray-800 flex items-center justify-between">
                                <div className="flex-1">
                                    <p>Activity: {data.activity}</p>
                                    <p>Price: {data.price}</p>
                                    <p>Type: {data.type}</p>
                                    <p>Booking required: {data.booking ? 'True' : 'False'}</p>
                                    <p>Accessibility: {data.accessibility}</p>
                                </div>
                                <button 
                                    onClick={() => handleDelete(index)} 
                                    className="text-white hover:bg-red-700 bg-red-400 rounded p-1 text-sm ml-4"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default form
