// frontend/src/services/adminService.test.js

import axios from 'axios';
import { fetchCategoryById } from './adminService';

jest.mock('axios');

describe('fetchCategoryById', () => {
    const categoryId = 1;

    it('should successfully fetch category by ID', async () => {
        const mockCategory = { id: categoryId, name: 'Test Category', transactionTypeId: 123 };
        axios.get.mockResolvedValue({ data: mockCategory });

        const result = await fetchCategoryById(categoryId);
        
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/category/get/${categoryId}`));
        expect(result).toEqual(mockCategory);
    });

    it('should handle error when fetching non-existent category', async () => {
        const errorMessage = 'Category not found with id 999';
        axios.get.mockRejectedValue(new Error(errorMessage));

        await expect(fetchCategoryById(999)).rejects.toThrow(errorMessage);
        
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/category/get/999`));
    });

    it('should handle network errors gracefully', async () => {
        const networkError = 'Network Error';
        axios.get.mockRejectedValue(new Error(networkError));

        await expect(fetchCategoryById(categoryId)).rejects.toThrow(networkError);
        
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/category/get/${categoryId}`));
    });
});
