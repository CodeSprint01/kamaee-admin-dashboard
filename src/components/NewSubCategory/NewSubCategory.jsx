// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const NewSubCategory = () => {
//   const [categories, setCategories] = useState([]); // Initialize as an empty array
//   const [selectedCategory, setSelectedCategory] = useState(''); // Holds selected category ID
//   const [subCategoryTitle, setSubCategoryTitle] = useState(''); // Holds subcategory title
//   const [subCategoryId, setSubCategoryId] = useState(null); // State to hold the subcategory ID for updating
//   const [errorMessage, setErrorMessage] = useState(''); // State to manage errors

//   const token = localStorage.getItem("authToken"); // Assuming you have the token in local storage

//   // Fetch categories from the API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('https://api.kamaee.pk/api/categories', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const { category } = response.data;

//         if (Array.isArray(category)) {
//           setCategories(category); // Set the categories state
//         } else {
//           console.error('Unexpected categories format:', category);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, [token]);

//   // Function to handle the form submission for updating subcategory
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!subCategoryId) {
//       setErrorMessage('No subcategory ID provided for update.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `https://api.kamaee.pk/api/update/subcategory/${subCategoryId}`,
//         {
//           subcategory_title: subCategoryTitle,
//           category: selectedCategory,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log('Subcategory updated successfully:', response.data);
//       setErrorMessage(''); // Clear any existing errors on success
//     } catch (error) {
//       setErrorMessage('Error updating subcategory.');
//       console.error('Error updating subcategory:', error);
//     }
//   };

//   return (
//     <div className='ml-56 mt-10'>
//       <h1 className='text-2xl font-bold'>add SubCategory</h1>
//       <form onSubmit={handleSubmit}>
//         {/* SubCategory Title */}
//         <div>
//           <label htmlFor="subcategory-title">SubCategory Title:</label>
//           <input
//             type="text"
//             id="subcategory-title"
//             value={subCategoryTitle}
//             onChange={(e) => setSubCategoryTitle(e.target.value)}
//             required
//             className='ml-3 border border-black'
//           />
//         </div>

//         {/* Category Dropdown */}
//         <div>
//           <label htmlFor="category-dropdown">Select Category:</label>
//           <select
//             id="category-dropdown"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             required
//             className='ml-3 border border-black mt-3'
//           >
//             <option value="" disabled>Select a category</option>
//             {categories.map((category) => (
//               <option key={category.id} value={category.id}>
//                 {category.category_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Error Message */}
//         {errorMessage && <p className='text-red-500 mt-2'>{errorMessage}</p>}

//         {/* Submit Button */}
//         <button type="submit" className='bg-slate-600 text-white p-2 rounded mt-3'>
//           add SubCategory
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NewSubCategory;
