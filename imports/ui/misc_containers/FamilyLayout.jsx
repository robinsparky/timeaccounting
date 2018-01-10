import React from 'react';

const FamilyLayout = ({props})=> {
    return(
        <div className="family">
            <div className="parent">
                {props.parent}
            </div>
            <div className="child">
                {props.child}
            </div>
        </div>
    );
};

export default FamilyLayout;
