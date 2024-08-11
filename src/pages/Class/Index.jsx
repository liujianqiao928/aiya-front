import React from 'react';
import CategoryBar from './compoent/CategoryBar';
import CourseList from './compoent/CourseList';


function App() {
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <div className="flex-none w-full">
                <CategoryBar />
            </div>
            <div className="flex-grow overflow-y-auto w-full">
                <CourseList />
            </div>
        </div>
    );
}

export default App;
