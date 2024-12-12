import axios from 'axios';
import AuthService from './authService'; // Assuming there's an AuthService for handling authentication
import { API_BASE_URL } from '../config'; // Assuming there's a config file for API base URL

// Fetch details of a category by its ID
export const fetchCategoryById = async (categoryId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/category/getById`, {
            headers: AuthService.authHeader(),
            params: {
                categoryId: categoryId,
            },
        });

        if (response.status === 200) {
            return response.data; // Assuming the data structure contains the category information
        } else {
            throw new Error('Failed to fetch category details.'); // Handle unsuccessful responses
        }
    } catch (error) {
        console.error("Error fetching category details:", error);
        throw error; // Rethrow error for further handling
    }
};

// Existing function to disable or enable a category
export const disableOrEnableCategory = (categoryId) => {
    return axios.delete(
        API_BASE_URL + "/category/delete",
        {
            headers: AuthService.authHeader(),
            params: { categoryId: categoryId },
        }
    );
};

// Existing function to update a category
export const updateCategory = (categoryId, categoryName, transactionTypeId) => {
    return axios.put(
        API_BASE_URL + '/category/update',
        {
            categoryName: categoryName,
            transactionTypeId: transactionTypeId,
        },
        {
            headers: AuthService.authHeader(),
            params: { categoryId: categoryId },
        }
    );
};
