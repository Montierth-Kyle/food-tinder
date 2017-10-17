import React from 'react';
import { connect } from 'react-redux';
import { Card, Container, Segment, Loader, Dimmer, Grid, Button, Icon, Image, Progress } from 'semantic-ui-react';
import axios from 'axios';

var sectionStyle = {
    width: "100%",
    height: "100%",
    position: 'fixed',
    top: '0',
    left: '0'
};

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
        <Segment size='massive' style={sectionStyle}>
            <Dimmer active>
                <Loader active inline='centered' indeterminate>Setting The Mood</Loader>
            </Dimmer>
        </Segment>
    );

    yesNoGame = () => (
        <Container>
            { this.state.recipes.length > 0 && 
                <Grid centered columns={1}>
                    <Grid.Column>
                        <Card fluid raised>
                        <Image height='650px' src={this.state.recipes[0].smallImageUrls[0]+0} />
                        <Card.Content>
                            <Card.Header>{this.state.recipes[0].recipeName}</Card.Header>
                        </Card.Content>
                        <Card.Description>
                            {this.state.recipes[0].flavors != null &&
                            <Grid centered columns={6}>
                                <Grid.Column>
                                    Piquant
                                    <Progress percent={(this.state.recipes[0].flavors.piquant) * 100} indicating />
                                </Grid.Column>
                                <Grid.Column>
                                    Meaty
                                    <Progress percent={(this.state.recipes[0].flavors.meaty) * 100} indicating />
                                </Grid.Column>
                                <Grid.Column>
                                    Bitter
                                    <Progress percent={(this.state.recipes[0].flavors.bitter) * 100} indicating />
                                </Grid.Column>
                                <Grid.Column>
                                    Sweet
                                    <Progress percent={(this.state.recipes[0].flavors.sweet) * 100} indicating />
                                </Grid.Column>
                                <Grid.Column>
                                    Sour
                                    <Progress percent={(this.state.recipes[0].flavors.sour) * 100} indicating />
                                </Grid.Column>
                                <Grid.Column>
                                    Salty
                                    <Progress percent={(this.state.recipes[0].flavors.salty) * 100} indicating />
                                </Grid.Column>
                            </Grid>
                            }   
                        </Card.Description>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button size='massive' color='green' icon onClick={this.addRecipeToMatched}>
                                    <Icon name='thumbs outline up' />
                                </Button>
                                <Button size='massive' color='red' icon onClick={this.removeRecipe}>
                                    <Icon name='thumbs outline down' />
                                </Button>
                            </div>
                        </Card.Content>
                        </Card> 
                    </Grid.Column>
                </Grid>
            }   
        </Container>
    );

    sideBySideGame = () => {
        let matchedRecipes = this.state.matchedRecipes;
        return (
            <Container>
                { matchedRecipes.length > 0 &&
                <Grid centered columns={2}>
                    <Grid.Column>
                        <Card fluid raised>
                            <Image height='auto' src={this.state.matchedRecipes[0].smallImageUrls[0]+0} />
                            <Card.Content>
                                <Card.Header>{this.state.matchedRecipes[0].recipeName}</Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                                <Button fluid size='massive' color='yellow' icon onClick={this.addRecipeToMatched}>
                                    <Icon name='star' />
                                </Button>
                            </Card.Content>
                        </Card> 
                    </Grid.Column>
                    <Grid.Column>
                        <Card fluid>
                            <Image height='auto' src={this.state.matchedRecipes[1].smallImageUrls[0]+0} />
                            <Card.Content>
                                <Card.Header>{this.state.matchedRecipes[1].recipeName}</Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                                <Button fluid size='massive' color='yellow' icon onClick={this.addRecipeToMatched}>
                                    <Icon name='star' />
                                </Button>
                            </Card.Content>
                        </Card> 
                    </Grid.Column>
                </Grid>
                }
            </Container>
        )
    }

    whatToShow = () => {
        let { loading, sidebyside } = this.state;

            if (loading && sidebyside === false) {
                return this.gameLoading()
            }else if (loading === false && sidebyside === false) {
                return this.yesNoGame()
            }else 
                return this.sideBySideGame()
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
        this.state.matchedRecipes = this.mixItUp(matchedRecipes)
        this.setState({ matchedRecipes: this.state.matchedRecipes })
    }

    render() {
        return (
            <div>
                { this.whatToShow() }
            </div>
        )
    };
}


export default connect()(Game);