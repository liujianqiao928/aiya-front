import React from 'react';
import { Layout } from 'antd';
import Navbar from './compoent/Navbar';
import Sidebar from './compoent/Sidebar';
import ContentArea from './compoent/ContentArea';
function App() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-screen-lg mx-auto">
            <Navbar />
            <ContentArea />
            <Sidebar />
        </div>
        </div>
    );
}

export default App;
