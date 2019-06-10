import React, { Component } from 'react';
import './App.css';

import Top from './components/Top.js'
import Create from './components/Create.js'

//https://fullstackchallenge2019.herokuapp.com/

class App extends Component{
    constructor() {
        super();
        this.state = { 
            print_top: false,
            print_create: false,
            url: ''
        };
        
        this.handleShow = this.handleShow.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    
    handleShow(e) {
        e.preventDefault();
        this.setState({ print_top: true})
        
        if(this.state.print_create === true) {
            this.setState({ print_create: false })
            window.location.reload()
        }
    }
    
    handleCreate(e) {
        e.preventDefault();
        this.setState({ print_create: true })
        
        var data = { "original_url": this.state.url }
        
        fetch('https://fullstackchallenge2019.herokuapp.com/urls/create.json', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({ new_url: data['data'] });
            });
        
        if(this.state.print_top === true) {
            this.setState({ print_top: false})
            window.location.reload()
        }
    }
    
    handleInput(e) {
        this.setState({ url: e.target.value })
    }
    
    render() {
        return (
            <div className="App">
                <header id="header">
                    <h1>Shortened Url</h1>
                    <p>A simple template for telling the world when you'll launch<br />
                    your next big thing. Brought to you by <a href="http://html5up.net">HTML5 UP</a>.</p>
                </header>

                <form id="signup-form" method="post" action="#">
                    <input type="url" name="url" id="url" placeholder="URL" onChange={ this.handleInput }/>
                    <input type="submit" value="Shorted" onClick={ this.handleCreate }/>
                    <input type="submit" value="TOP" onClick={ this.handleShow }/>
                </form>

                <Top print_top={ this.state.print_top }/>
                <Create print_create={ this.state.print_create } />
            </div>
        );
    }
}

export default App;
//
