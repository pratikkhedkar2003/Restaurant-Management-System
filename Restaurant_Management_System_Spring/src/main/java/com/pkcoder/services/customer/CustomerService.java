package com.pkcoder.services.customer;

import com.pkcoder.dtos.CategoryDto;
import com.pkcoder.dtos.ProductDto;

import java.util.List;

public interface CustomerService {
    List<CategoryDto> getAllCategories();

    List<CategoryDto> getAllCategoriesByTitle(String title);

    List<ProductDto> getAllProductsByCategory(Long categoryId);

    List<ProductDto> getAllProductsByCategoryAndTitle(Long categoryId, String title);
}
