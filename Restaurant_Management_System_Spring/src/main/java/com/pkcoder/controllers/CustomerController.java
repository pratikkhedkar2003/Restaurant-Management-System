package com.pkcoder.controllers;

import com.pkcoder.dtos.CategoryDto;
import com.pkcoder.dtos.ProductDto;
import com.pkcoder.services.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> categoryDtoList = customerService.getAllCategories();
        if (categoryDtoList == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(categoryDtoList);
    }

    @GetMapping("/categories/{title}")
    public ResponseEntity<List<CategoryDto>> getAllCategoriesByTitle(@PathVariable String title) {
        List<CategoryDto> categoryDtoList = customerService.getAllCategoriesByTitle(title);
        if (categoryDtoList == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(categoryDtoList);
    }

    @GetMapping("/{categoryId}/products")
    public ResponseEntity<List<ProductDto>> getAllProductsByCategory(@PathVariable Long categoryId) {
        List<ProductDto> productDtoList = customerService.getAllProductsByCategory(categoryId);
        if (productDtoList == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(productDtoList);
    }

    @GetMapping("/{categoryId}/products/{title}")
    public ResponseEntity<List<ProductDto>> getAllProductsByCategoryAndTitle(@PathVariable Long categoryId, @PathVariable String title) {
        List<ProductDto> productDtoList = customerService.getAllProductsByCategoryAndTitle(categoryId, title);
        if (productDtoList == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(productDtoList);
    }

}
