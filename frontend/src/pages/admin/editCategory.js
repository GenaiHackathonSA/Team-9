import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchCategoryById } from '../../services/adminService';
import { toast } from 'react-toastify';

const AdminEditCategory = () => {
    const { categoryId } = useParams();  // Assumes categoryId is passed in the URL
    const history = useHistory();
    const [categoryName, setCategoryName] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const fetchCategoryDetails = async () => {
        try {
            const response = await fetchCategoryById(categoryId);
            if (response && response.data) {
                setCategoryName(response.data.name);
                setTransactionType(response.data.transactionType);
            }
        } catch (error) {
            toast.error("Failed to fetch category details: " + error.message);
        } finally {
            setIsFetching(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Call a function to update the category details
        try {
            // Assuming the update function is defined, e.g., updateCategory
            // await updateCategory(categoryId, { name: categoryName, transactionType });
            toast.success("Category updated successfully!");
            // Redirect after successful update
            history.push('/admin/categories');
        } catch (error) {
            toast.error("Failed to update category: " + error.message);
        }
    };

    if (isFetching) {
        return <div>Loading...</div>; // Replace this with a loading component as needed
    }

    return (
        <div>
            <h1>Edit Category</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="categoryName">Category Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="transactionType">Transaction Type:</label>
                    <select
                        id="transactionType"
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        required
                    >
                        <option value="">Select type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <button type="submit">Update Category</button>
            </form>
        </div>
    );
};

export default AdminEditCategory;
