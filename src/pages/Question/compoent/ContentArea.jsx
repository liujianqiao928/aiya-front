import React from 'react';
import CategoryCards from './CategoryCards';
import QuestionList from './QuestionList';
import TagFilter from './TagFilter';

function MainContent() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-screen-lg mx-auto space-y-8">
                <CategoryCards />
                <QuestionList />、
                <TagFilter />

            </div>
        </div>
    );
}

export default MainContent;
