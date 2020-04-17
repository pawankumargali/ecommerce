import React from 'react';
import Nav from './Nav';

function Layout(props) {
    const {title, description, childClassName, children} = props;

    return <div>
             <Nav />
                <div className="jumbotron" style={{height:'25vh'}}>
                    <h2>{title}</h2>
                    <p className="lead">{description}</p>
                </div>
            <div className={childClassName}>{children}</div>
           </div>;
}

export default Layout;