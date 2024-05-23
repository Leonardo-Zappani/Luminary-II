import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ItemList from './list'
import ItemForm from './form'

const ItemsPage = () => {
    return (
        <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/create" element={<ItemForm />} />
            <Route path="/edit/:id" element={<ItemForm />} />
        </Routes>
    );
};

export default ItemsPage
