import React from 'react';
import PropTypes from 'prop-types'; // ES6
import helpers from '../../api/lib/helpers.js';

const LineItem = (props) => {
    return (
            <tr>
                <td>{helpers.getDateString(props.when)}</td> 
                <td>{props.task}</td>
                <td>{props.comments}</td>
                <td>{props.effort}</td> 
            </tr>
    );
}

LineItem.propTypes = {   
    task: PropTypes.string.isRequired,
    when: PropTypes.instanceOf(Date).isRequired,
    effort: PropTypes.number.isRequired,
    comments: PropTypes.string 
}

export default LineItem;