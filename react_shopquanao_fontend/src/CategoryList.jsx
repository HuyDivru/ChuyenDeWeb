import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { httpGet } from './httpConfig';

function CategoryList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await httpGet('api/product/getAllCategory');
                setCategories(response.data);
            } catch (error) {
                console.error("There was an error fetching the categories!", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        <Link to={`/category/${category.id}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryList;
