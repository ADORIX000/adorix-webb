import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import Footer from '../common/Footer';

const PublicLayout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default PublicLayout;
