const graphql = require('graphql');
const _ = require("lodash");
const Recipe = require('../models/recipe')
const Comment = require('../models/comment')

const { 
    GraphQLObjectType,  
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

//dummy data
// var comments = [
//     {name: 'Linda', content: 'Simple to make. My dog loves it!', id: '1', recipeId: '1'},
//     {name: 'Tim', content: 'This recipe is Pawfect!', id: '2', recipeId: '2'},
//     {name: 'Marina', content: 'A must try!', id: '3', recipeId: '3'},
//     {name: 'Alyssa', content: 'pawsitively delicious!', id: '4', recipeId: '1'}
// ]
// var recipes = [
//     {name: 'CHOW MIX', ingredients: '6 cups water, 1 pound ground turkey, 2 cups brown rice, 1 teaspoon dried rosemary, 1/2 (16 ounce) package frozen broccoli, carrots and cauliflower combination', directions: 'Place the water, ground turkey, rice, and rosemary into a large Dutch oven. Stir until the ground turkey is broken up and evenly distributed throughout the mixture; bring to a boil over high heat, then reduce heat to low and simmer for 20 minutes. Add the frozen vegetables, and cook for an additional 5 minutes. Remove from heat and cool. Refrigerate until using.', prep: '5 min', cook: '25 min', total: '30 min', image: "https://images.media-allrecipes.com/userphotos/720x405/1432665.jpg", id: '1' },
//     {name: 'PAWFECT RICE BOWL', ingredients:'1 1/2 cups brown rice, 1 tablespoon olive oil, 3 pounds ground turkey, 3 cups baby spinach, chopped, 2 carrots, shredded, 1 zucchini, shredded, 1/2 cup peas canned or frozen', directions: 'In a large saucepan of 3 cups water, cook rice according to package instructions; set aside. Heat olive oil in a large stockpot or Dutch oven over medium heat. Add ground turkey and cook until browned, about 3-5 minutes, making sure to crumble the turkey as it cooks. Stir in spinach, carrots, zucchini, peas and brown rice until the spinach has wilted and the mixture is heated through, about 3-5 minutes. Let cool completely.', prep: '5 min', cook: '25 min', total: '30 min', image: 'https://s23209.pcdn.co/wp-content/uploads/2015/04/IMG_5162edit-1.jpg', id: '2'},
//     {name:'EASY CROCKPOT DOG FOOD', ingredients: '2 1/2 pounds ground beef, 1 1/2 cups brown rice, 1 (15-ounce) can kidney beans, drained and rinsed, 1 1/2 cups chopped butternut squash, 1 1/2 cups chopped carrots, 1/2 cup peas, frozen or canned', directions: 'Stir in ground beef, brown rice, kidney beans, butternut squash, carrots, peas and 4 cups water into a 6-qt slow cooker. Cover and cook on low heat for 5-6 hours or high heat for 2-3 hours, stirring as needed. Let cool completely.', prep:'10 min', cook: '6 hours', total: '6 hours , 10 min', image: 'https://s23209.pcdn.co/wp-content/uploads/2015/05/IMG_5606edit-360x360.jpg', id: '3'}
//     // {name:, ingredients:, directions:, prep:, cook:, total:, image: },
//     // {name:, ingredients:, directions:, prep:, cook:, total:, image: },
//     // {name:, ingredients:, directions:, prep:, cook:, total:, image: },
// ];

//schema will describe the data. object types. relation between object types

const RecipeType = new GraphQLObjectType({
    name: "Recipe",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        ingredients: { type: GraphQLString },
        directions: { type: GraphQLString },
        prep: { type: GraphQLString },
        cook: { type: GraphQLString }, 
        total: { type: GraphQLString }, 
        image: { type: GraphQLString },
        comments:{
            type: new GraphQLList(CommentType),
            resolve(parent,args){
                // return _.filter(comments, {recipeId: parent.id})
                return Comment.find({recipeId: parent.id})
            }
        }
    })
})

const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        content: { type: GraphQLString },
        recipe:{
            type: RecipeType,
            resolve(parent,args){
                // return _.find(recipes, {id: parent.recipeId})
                return Recipe.findById(parent.recipeId)
            }
        }
    })
})

//root queries . how a user can jump in the graph to grab data

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        recipe: {
            type: RecipeType, 
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                // return _.find(recipes, { id: args.id });
                return Recipe.findById(args.id)
            }
        },
        recipes: {
            type: new GraphQLList(RecipeType),
            resolve(parent, args){
                // return recipes
                return Recipe.find({})
            }
        },
        comment: {
            type: CommentType, 
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                // return _.find(comments, { id: args.id });
                return Comment.findById(args.id)
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args){
                // return comments
                return Comment.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addComment: {
            type: CommentType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                content: {type: new GraphQLNonNull(GraphQLString)},
                recipeId : {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let comment = new Comment({
                    name: args.name,
                    content: args.content,
                    recipeId: args.recipeId
                })
                return comment.save()
            }
        },
        addRecipe: {
            type: RecipeType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                ingredients: { type: new GraphQLNonNull(GraphQLString) },
                directions: { type: new GraphQLNonNull(GraphQLString) },
                prep: { type: new GraphQLNonNull(GraphQLString) },
                cook: { type: new GraphQLNonNull(GraphQLString) }, 
                total: { type: new GraphQLNonNull(GraphQLString) }, 
                image: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args){
                let recipe = new Recipe({
                    name: args.name,
                    ingredients: args.ingredients,
                    directions: args.directions,
                    prep: args.prep,
                    cook: args.cook, 
                    total: args.total, 
                    image: args.image
                })
                return recipe.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})