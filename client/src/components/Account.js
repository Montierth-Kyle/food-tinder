import React from 'react';
import { connect } from 'react-redux';
import { Card, Container, Divider, List, ListItem, Grid, Button, Image, Icon } from 'semantic-ui-react';
import { getRecipes, getOneRecipe } from '../actions/recipe'
import NavBar from './NavBar';


class Account extends React.Component {
    state = { show: 'Cooked' }

    componentWillMount() {
        this.props.dispatch(getRecipes())
    }
    

    recipeHistory = () => {
        let { user, recipes, dispatch, id } = this.props;
        let cookedRecipes = recipes.filter(recipe => recipe.cooked === true);
        let savedRecipes = recipes.filter(recipe => recipe.superSave === true);
        let filtered = this.state.show === 'Cooked' ? cookedRecipes : savedRecipes;
        return recipes.map( (recipe, i) => {
            console.log(recipe.recipeImageUrl)
            return (
                <Card>
                    <Image src={recipe.recipeImageUrl} />
                    <Card.Content>
                    <Card.Header>
                        {recipe.recipeName}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                        Joined in 2015
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        Matthew is a musician living in Nashville.
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        22 Friends
                    </a>
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
        const buttonName = this.state.show ? "Saved" : "Cooked"
        return (
            <div>
                <Grid columns={2} >
                    <Button onClick={this.toggleRecipeFilter}>Show {buttonName}</Button>
                    <Card.Group itemsPerRow={6}>
                        {this.recipeHistory()}
                    </Card.Group>
                    <Divider horizontal />
                    <List>
                        <ListItem>ACCOUNT</ListItem>
                        <ListItem>INFO</ListItem>
                        <ListItem>STUFF</ListItem>
                        <ListItem>HERE</ListItem>
                    </List>
                </Grid >
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return { user: state.user, dietPreference: state.dietPreference.dietPreference, id: state.dietPreference.id, recipes: state.recipe }
}
export default connect(mapStateToProps)(Account);