import React from 'react';
import { withFirebase } from '../../Firebase';

class Categories extends React.Component {

    state = {
        categories: [],
        // editCategory: 
    }
    
    componentDidMount() {
        this.setState({
            categories: this.props.firebase.db.collection('categories')
        });
    }

    editCategory = (category) => {
        category.update({

        })
    };

    render() {
        return (
            <ul>
                {this.state.categories.map(category =>
                    <li>
                        {category.name}
                        {/* <button onClick={} */}
                    </li>
                )}
            </ul>
        )
    }
}

export default withFirebase(Categories);