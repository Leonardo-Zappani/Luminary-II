// src/components/ArtifactPage.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ArtifactList from './list';
import ArtifactForm from './form';

const ArtifactPage = () => {
    return (
        <Routes>
            <Route path="/" element={<ArtifactList />} />
            <Route path="/create" element={<ArtifactForm />} />
            <Route path="/edit/:id" element={<ArtifactForm />} />
        </Routes>
    );
};

export default ArtifactPage;
