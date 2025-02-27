import React from "react";
import { Form, Button } from "react-bootstrap";
import "./CategoryFilter.css";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter-container">
      <Form.Group className="mb-2">
        <Form.Label className="filter-label">Filter by Category</Form.Label>
        <Form.Control
          as="select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {selectedCategory && (
        <Button
          variant="outline-primary"
          size="sm"
          className="clear-filter-btn"
          onClick={() => onCategoryChange("")}
        >
          Clear Filter
        </Button>
      )}
    </div>
  );
};

export default CategoryFilter;
