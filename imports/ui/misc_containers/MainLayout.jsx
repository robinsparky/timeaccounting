import React from 'react';
import Header from '../components/Header';

export default MainLayout = ({content})=> {
    console.log('In MainLayout');
    return(
    <div className="main-layout">
        <Header />
        {content}
    </div>
    );
};

