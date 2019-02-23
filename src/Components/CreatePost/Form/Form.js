import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';


import '../../../css-grid/grid.scss'
import './Form.scss'

import '../../../Database/Database'
import Database from "../../../Database/Database";

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:"",
            title: '',
            content:'',
            author:'Max Voloskiy'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event){
        const database = new Database(this.props.serverUrl + 'articles');
        database.create(this.state.title.split(' ')[0], this.state.title, this.state.content);
        this.props.history.push('/');
        event.preventDefault();
    };

    handleChange(event){
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
                    <div>
                        <input
                            className="Form__placeholder-title"
                            name="title"
                            placeholder="Title"
                            onChange={this.handleChange}
                            value={this.state.title}
                        />
                    </div>

                    <div>
                        <ul className={'Form__placeholder-tags'}>
                            <li className={'Form__placeholder-item'}>#add tags</li>
                        </ul>
                    </div>

                    <div>
                        <textarea className={'Form__placeholder-content'} name="content" id="content" placeholder={'Tell us your story...'} onChange={this.handleChange} value={this.state.content}>
                        </textarea>
                    </div>
                    <button className={'Form__placeholder-button'} type="submit"><p>Publish</p> <img
                        src="https://res.cloudinary.com/maxvoloskiy/image/upload/c_scale,w_25/v1550482977/Drag'n'Blog/rocket.png" alt="rocket"/></button>
                </div>
            </form>
        );
    }
}

export default withRouter(Form);