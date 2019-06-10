import React, { Component } from 'react';

class Top extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            tops: []
        };
    }
    
    componentDidMount() {        
        fetch('https://fullstackchallenge2019.herokuapp.com/top.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => { return response.json(); })
            .then((data) => {
                this.setState({ tops: data['data'] });
            })
    }
    
    render() {
        if(this.props.print_top){
            if(this.state.tops.length > 0) {
                const urls = this.state.tops.map((url, i) => {
                    return (
                        <section className="tiles" key={ url['id'] }>
                            <article className="style1">
                                <a href={ url['short_url'] }>
                                    <h2>{ url['title'] }</h2>
                                </a>
                                <div className="content">
                                    <p>Original Url: { url['original_url'] }</p>
                                    <p>Short Url: { url['short_url'] }</p>
                                    <p>Visit Count: { url['visit_count'] }</p>
                                </div>
                            </article>
                        </section>
                    )
                });

                return (
                    <div id="main">
                        <div className="Top">
                            <div className="inner">
                                <header>
                                    <h1>This is Phantom, a free, fully responsive site<br />
                                    template designed by <a href="http://html5up.net">HTML5 UP</a>.</h1>
                                    <p>Etiam quis viverra lorem, in semper lorem. Sed nisl arcu euismod sit amet nisi euismod sed cursus arcu elementum ipsum arcu vivamus quis venenatis orci lorem ipsum et magna feugiat veroeros aliquam. Lorem ipsum dolor sit amet nullam dolore.</p>
                                </header>
                                { urls }
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <p className="text-center">Loding Top 100...</p>
                )
            }
        } else {
            return(
                <p className="text-center"></p>
            )
        }
    }   
}

export default Top;