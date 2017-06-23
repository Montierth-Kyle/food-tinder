import React from 'react';
import { connect } from 'react-redux';
import { Card, Container, Segment, Loader, Dimmer } from 'semantic-ui-react';
import { getRecipes } from '../actions/recipe'
import axios from 'axios';


class Game extends React.Component {
    state = { loading: true, recipes: [], matchedRecipes: [] }

    componentDidMount(id) {
       axios.get(`/api/recipes/${id}`)
            .then((res) => {
                const recipesData = res.data
                this.setState({ recipes: recipesData, loading: false })
            }
        )
    }

    // getCard = () => {
    //     let recipe = this.state.recipes[0];
    //     return (<div>{recipe.recipeName}</div>)
    // }

    render() {
        let { loading } = this.state;
        return (
            <div>
                { loading ?
                    <Segment>
                        <Dimmer active>
                            <Loader indeterminate>Preparing Files</Loader>
                        </Dimmer>
                    </Segment>
                    :
                    <Container textAlign="center">
                        <Card
                            image={this.state.recipes[0].smallImageUrls[0]}
                            header={this.state.recipes[0].recipeName} 
                        />
                    </Container>
                }
            </div>
        )
    };
}


export default connect()(Game);