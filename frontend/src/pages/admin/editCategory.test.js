import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminEditCategory from './editCategory'; // Adjust import based on your folder structure
import * as adminService from '../../services/adminService'; // Adjust import based on your folder structure

jest.mock('../../services/adminService'); // Mock the service layer

describe('AdminEditCategory Component', () => {
    const categoryId = '123'; // Example category ID for testing

    beforeEach(() => {
        // Mock the implementation of the fetchCategoryById function before each test
        adminService.fetchCategoryById.mockResolvedValue({
            data: {
                categoryName: 'Test Category',
                transactionTypeId: 'transaction-type-id',
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls and instances after each test
    });

    test('fetches existing category data and allows updates', async () => {
        render(
            <MemoryRouter>
                <AdminEditCategory categoryId={categoryId} /> {/* Pass categoryId as a prop */}
            </MemoryRouter>
        );

        // Verify that the initial loading state is rendered
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        // Wait for the fetch to complete and the category data to be rendered
        const categoryNameInput = await screen.findByLabelText(/category name/i);
        expect(categoryNameInput).toHaveValue('Test Category'); // Check if the input is correctly populated
        expect(screen.getByDisplayValue(/Test Category/i)).toBeInTheDocument();

        // Simulate user update
        fireEvent.change(categoryNameInput, { target: { value: 'Updated Category' } });

        // Find and simulate form submission if a submit button were implemented
        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton); // Trigger the form submission

        // Verify that the update function was called
        expect(adminService.updateCategory).toHaveBeenCalledWith(
            categoryId,
            'Updated Category',
            'transaction-type-id' // Assuming we are using the same transaction type for simplicity
        );

        // You would add further expectations here to handle the outcome of the update, like checking for a success message
    });
});
