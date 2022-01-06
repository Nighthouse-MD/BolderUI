import React from 'react';
import { Card } from '@mui/material';
import ProductExplorer from '../Pages/ProductExplorer/ProductExplorer';
import CategorySearch from '../Pages/CategorySearch/CategorySearch';

const routes = [
    {
        path: '/',
        sidebarName: 'Product Explorer',
        component: <ProductExplorer />
    },
    {
        path: '/CategorySearch',
        sidebarName: 'Category Search',
        component: <CategorySearch />
    }
];

export default routes;