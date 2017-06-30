import React from 'react';
import { connect } from 'react-redux';
import { Card, Container, Segment, Loader, Dimmer, Grid, Button, Icon } from 'semantic-ui-react';
import { getRecipes } from '../actions/recipe'
import axios from 'axios';


class Game extends React.Component {
    state = { loading: true, sidebyside: false, recipes: [], matchedRecipes: [] }

    componentDidMount() {
       axios.get(`/api/recipes/${this.props.id}`)
            .then((res) => {
                const recipesData = res.data
                this.setState({ recipes: recipesData, loading: false })
            }
        )
    }

    checkRecipiesArray = () => {
        let recipes = this.state.recipes
        if (recipes.length === 0) {
            return this.setState({ sidebyside: true }) 
        } return
    }

    removeRecipe = () => {
        let updatedRecipes = this.state.recipes
        updatedRecipes.shift()
        this.setState({ recipes: updatedRecipes })
        this.checkRecipiesArray()
    }

    addRecipeToMatched = () => {
        let matched = this.state.matchedRecipes
        let recipes = this.state.recipes
        matched.push(recipes.splice(0, 1)[0]);
        this.setState({ matchedRecipes: matched })
        this.checkRecipiesArray()
    }

    gameLoading = () => (
        <Segment>
            <Dimmer active>
                <Loader active inline='centered' indeterminate>Preparing Files</Loader>
            </Dimmer>
        </Segment>
    );

    yesNoGame = () => (
        <Container>
            { this.state.recipes.length > 0 && 
                <Grid centered columns={2}>
                    <Grid.Column>
                        <Card
                            header={this.state.recipes[0].recipeName} 
                        /> 
                    </Grid.Column>
                    <Grid.Row>
                        <Grid.Column>
                            <Button size='massive' color='green' icon onClick={this.addRecipeToMatched}>
                                <Icon name='thumbs outline up' />
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button size='massive' color='red' icon onClick={this.removeRecipe}>
                                <Icon name='thumbs outline down' />
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            }   
        </Container>
    );

    sideBySideGame = () => {
        let matchedRecipes = this.state.matchedRecipes;
        return (
            <Container>
                { this.state.matchedRecipes.length > 0 &&
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Card
                                header={this.state.matchedRecipes[0].recipeName} 
                            /> 
                        </Grid.Column>
                        <Grid.Column>
                            <Card
                                header={this.state.matchedRecipes[1].recipeName} 
                            /> 
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button />
                        </Grid.Column>
                        <Grid.Column>
                            <Button />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                }
            </Container>
        )
    }





    whatToShow = () => {
        let { loading, sidebyside } = this.state;

        {   if(loading && sidebyside === false) {
                return this.gameLoading()
            }else if(loading === false && sidebyside === false) {
                return this.yesNoGame()
            }else 
                return this.sideBySideGame()
        }
    }

    mixItUp = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    shuffle = () => {
        let matchedRecipes = this.state.matchedRecipes;
        matchedRecipes = this.mixItUp(matchedRecipes)
        this.setState({ matchedRecipes: this.state.matchedRecipes })
    }

    render() {
        let { loading, sidebyside } = this.state;
        return (
            <div>
                { this.whatToShow() }
            </div>
        )
    };
}


export default connect()(Game);