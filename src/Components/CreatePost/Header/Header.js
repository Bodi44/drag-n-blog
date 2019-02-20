import React, { Component } from 'react'

import '../../../css-grid/grid.scss'
import './Header.scss'

class Header extends Component{
    render(){
        return (
            <div className={'grid_12 Header'}>
                <div className={'Header__placeholder'}>
                    <div className={'Header__placeholder-logo'}>
                        <h1>Drag'n'Blog</h1>
                        <p>flexible-blog</p>
                    </div>
                    <p>Draft</p>
                </div>
                <div className={'Header__placeholder'}>
                    <button className={'Header__placeholder-button'}><p>Ready to Publish?</p> <img
                        src="https://res.cloudinary.com/maxvoloskiy/image/upload/c_scale,w_25/v1550482977/Drag'n'Blog/rocket.png" alt="rocket"/></button>
                    <a href="#"><img src="https://res.cloudinary.com/maxvoloskiy/image/upload/c_scale,w_40/v1550482086/Drag'n'Blog/profile.png" alt="profile"/></a>
                </div>
            </div>
        )
    }
}

export default Header