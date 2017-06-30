import React from 'react';
import { connect } from 'react-redux';
import { Card, Container, Divider, List, Grid, Button, Image, Icon, Label } from 'semantic-ui-react';
import { getRecipes, getOneRecipe, deleteRecipe } from '../actions/recipe'
import NavBar from './NavBar';


class Account extends React.Component {
    state = { show: 'Cooked', positive: true, disabled: true }

    componentWillMount() {
        this.props.dispatch(getRecipes())
    }

    handleDelete = (recipe) => {
        this.props.dispatch(deleteRecipe(recipe))
        this.props.dispatch(getRecipes())
    }

    recipeHistory = () => {
        const cardLabelColor = this.state.show === 'Cooked' ? 'red' : 'teal'
        const cardLabelIcon = this.state.show === 'Cooked' ? 'spoon' : 'star'
        let { show } = this.state;
        let { recipes, dispatch, id } = this.props;
        let cookedRecipes = recipes.filter(recipe => recipe.cooked === true);
        let savedRecipes = recipes.filter(recipe => recipe.superSave === true);
        let filtered = this.state.show === 'Cooked' ? cookedRecipes : savedRecipes;
        return filtered.map( (recipe, i) => {  
            return (
                <Card raised>
                    <Image
                        fluid
                        label={{ color: cardLabelColor, content: show, icon: cardLabelIcon, ribbon: true }}
                        src={recipe.recipeImageUrl} />
                    <Card.Content>
                    <Card.Header>
                        {recipe.recipeName}
                        <Button animated='fade' color='red' floated='right' onClick={() => this.handleDelete(recipe)}>
                            <Button.Content hidden>Delete</Button.Content>
                            <Button.Content visible>
                                <Icon name='trash' />
                            </Button.Content>
                        </Button>
                    </Card.Header>
                    </Card.Content>
                </Card> 
                
            )
        })
    }

    displayRecipeHistory = () => {
        return this.props.recipes.map(recipe => {
            return { id: recipe.id, text: recipe.recipeName, value: recipe.id, image: recipe.recipeImageUrl }
        })
    }

    toggleRecipeFilter = () => {
        this.setState({ show: this.state.show === "Cooked" ? "Saved" : "Cooked" });

    }

    render() {
        let { user, dispatch, id } = this.props;
        let { positive, disabled } = this.state;
        return (
            <div>
                <Grid columns={16}>
                    <Grid.Column width={10}>
                        <Card.Group itemsPerRow={2}>
                            {this.recipeHistory()}
                        </Card.Group>
                    </Grid.Column>
                    <Grid.Column width={1}>
                        <Divider vertical></Divider>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <List size='massive'>
                            <List.Item>
                                <List.Icon name='mail' size='big' />
                                <List.Content>
                                    <List.Header>Username:</List.Header>
                                    <List.Description>{<a href='mailto: {user.username}'>{user.username}</a>}</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='user circle' size='big' />
                                <List.Content>
                                    <List.Header>Name:</List.Header>
                                    <List.Description>{user.firstName} {user.lastName}</List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Grid >
                <Divider hidden/>
                <Button.Group>
                    <Button {...this.state.show === "Cooked" ? { positive } : '' } onClick={() => this.setState({ show: 'Cooked' })}>Cooked</Button>
                    <Button.Or />
                    <Button {...this.state.show === "Saved" ? { positive } : '' } onClick={() => this.setState({ show: 'Saved' })}>Saved</Button>
                </Button.Group>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return { user: state.user, dietPreference: state.dietPreference.dietPreference, id: state.dietPreference.id, recipes: state.recipe }
}
export default connect(mapStateToProps)(Account);