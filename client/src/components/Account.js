import React from 'react';
import { connect } from 'react-redux';
import { Card, Container, Divider, List, ListItem, Grid, Button, Image, Icon, Label } from 'semantic-ui-react';
import { getRecipes, getOneRecipe } from '../actions/recipe'
import NavBar from './NavBar';


class Account extends React.Component {
    state = { show: 'Cooked' }

    componentWillMount() {
        this.props.dispatch(getRecipes())
    }
    

    recipeHistory = () => {
        const cardLabelColor = this.state.show === 'Cooked' ? 'red' : 'teal'
        const cardLabelIcon = this.state.show === 'Cooked' ? 'spoon' : 'star'
        let { show } = this.state;
        let { user, recipes, dispatch, id } = this.props;
        let cookedRecipes = recipes.filter(recipe => recipe.cooked === true);
        let savedRecipes = recipes.filter(recipe => recipe.superSave === true);
        let filtered = this.state.show === 'Cooked' ? cookedRecipes : savedRecipes;
        return filtered.map( (recipe, i) => {
            console.log(recipe.recipeImageUrl)
            return (
                <Card raised>
                    <Image 
                        fluid
                        label={{ as: 'a', color: cardLabelColor, content: show, icon: cardLabelIcon, ribbon: true }}
                        src={recipe.recipeImageUrl} />
                    <Card.Content>
                    <Card.Header>
                        {recipe.recipeName}
                    </Card.Header>
                    </Card.Content>
                </Card> 
            )
        })
    }

    displayRecipeHistory = () => {
        return this.props.recipes.map(recipe => {
            return { id: recipe.id, text: recipe.recipeName, value: recipe.id, image: recipe.recipeImageURL }
        })
    }

    toggleRecipeFilter = () => {
        this.setState({ show: this.state.show === "Cooked" ? "Saved" : "Cooked" });
    }

    render() {
        const oppositeOfWhatIsCurrentlyShow = this.state.show ? "Saved" : "Cooked"
        return (
            <div>
                <Grid columns={16}>
                    <Grid.Column width={10}>
                        <Card.Group itemsPerRow={2}>
                            {this.recipeHistory()}
                        </Card.Group>
                        <Button onClick={this.toggleRecipeFilter}>Show {oppositeOfWhatIsCurrentlyShow}</Button>
                    </Grid.Column>
                <Divider vertical />
                    <Grid.Column width={4}>
                        <List relaxed>
                            <List.Item>
                                <Image avatar src='/assets/images/avatar/small/daniel.jpg' />
                                <List.Content>
                                    <List.Header as='a'>Daniel Louise</List.Header>
                                    <List.Description>Last seen watching <a><b>Arrested Development</b></a> just now.</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <Image avatar src='/assets/images/avatar/small/stevie.jpg' />
                                <List.Content>
                                    <List.Header as='a'>Stevie Feliciano</List.Header>
                                    <List.Description>Last seen watching <a><b>Bob's Burgers</b></a> 10 hours ago.</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <Image avatar src='/assets/images/avatar/small/elliot.jpg' />
                                <List.Content>
                                    <List.Header as='a'>Elliot Fu</List.Header>
                                    <List.Description>Last seen watching <a><b>The Godfather Part 2</b></a> yesterday.</List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Grid >
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return { user: state.user, dietPreference: state.dietPreference.dietPreference, id: state.dietPreference.id, recipes: state.recipe }
}
export default connect(mapStateToProps)(Account);