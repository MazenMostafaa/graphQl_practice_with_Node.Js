import express from 'express'
import { GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, graphql } from 'graphql'
import { createHandler } from 'graphql-http/lib/use/express'
const app = express()
const port = 3000 || 5000

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'mainQuerySchema',
        description: "desc Test",
        fields: {

            // API 1
            hello_world: {
                type: GraphQLString,
                resolve: () => {
                    return "Hello World From GraphQl API"
                }
            },
            // API 2
            getUserProfile: {
                type: new GraphQLObjectType({
                    name: 'getProfileQuery',
                    fields: {
                        name: { type: GraphQLString },
                        email: { type: GraphQLString },
                        age: { type: GraphQLInt },
                    }
                }),
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (__, args) => {
                    if (args.id == 1) {
                        return {
                            name: "mazen",
                            email: "mazenmostafa047@gmail.com",
                            age: 22
                        }
                    }
                    return {
                        name: "",
                        email: "",
                        age: 0
                    }
                }

            }
            // API 3

            // ...
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'mainMutationSchema',
        description: 'desc Test',
        fields: {

            setUserProfile: {
                type: new GraphQLObjectType({
                    name: 'setProfileQuery',
                    fields: {
                        name: { type: GraphQLString },
                        email: { type: GraphQLString },
                        age: { type: GraphQLInt },
                    }
                }),
                args: {
                    name: { type: GraphQLString },
                    email: { type: GraphQLString },
                    age: { type: GraphQLInt },
                },
                resolve: (__, args) => {
                    return {
                        name: args.name,
                        email: args.email,
                        age: args.age
                    }
                }

            }
        }
    })
})

app.use('/graphql', createHandler({ schema }))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => { console.log(`...Server is running on Port ${port}`); })