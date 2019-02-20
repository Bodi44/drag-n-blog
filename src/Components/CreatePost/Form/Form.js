import React, { Component } from 'react'

import '../../../css-grid/grid.scss'
import './Form.scss'

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:"",
            title: '',
            content:'',
            date:'',
            author:''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
    };

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render(){
        return(
            <form className={'Form grid_10 container_12'} onSubmit={this.handleSubmit}>
                <div className={'Form__placeholder grid_1'}>
                    <label htmlFor="file-input">
                        <img className={'Form__placeholder-image'} src="https://res.cloudinary.com/maxvoloskiy/image/upload/c_scale,w_55/v1550486428/Drag'n'Blog/camera.png"/>
                    </label>
                    <input className={'Form__placeholder-fileInput'} id="file-input" type="file"/>
                </div>

                <div className={'Form__placeholder grid_11'}>
                    <input
                        className="Form__placeholder-title"
                        name="title"
                        placeholder="Title"
                        onChange={this.handleInputChange}
                    />
                    <br />

                    <ul className={'Form__placeholder-tags'}>
                        <li className={'Form__placeholder-item'}>#add tags</li>
                    </ul>

                    <br/>
                    <textarea className={'Form__placeholder-content'} name="content" id="content" placeholder={'Tell us your story...'} onChange={this.handleInputChange}>
                    </textarea>
                    <br/>
                    {/*<button className={'Form__placeholder-button'}><p>Publish</p> <img*/}
                        {/*src="https://res.cloudinary.com/maxvoloskiy/image/upload/c_scale,w_25/v1550482977/Drag'n'Blog/rocket.png" alt="rocket"/></button>*/}
                </div>
            </form>
        );
    }
}

export default Form