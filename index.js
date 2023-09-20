import express from 'express'
import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString, graphql } from 'graphql'
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
                resolve: () => {
                    return {
                        name: "mazen",
                        email: "mazenmostafa047@gmail.com",
                        age: 22
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
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    email: { type: new GraphQLNonNull(GraphQLString) },
                    age: { type: new GraphQLNonNull(GraphQLInt) },
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
// ===================== Another Schema: test =================
const test = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'mainQuerySchema',
        description: "desc Test",
        fields: {

            // API 1
            test: {
                type: GraphQLString,
                resolve: () => {
                    return "test"
                }
            }
            // API 2

            // API 3

            // ...
        }
    })
})

app.use('/graphql', createHandler({ schema }))
app.use('/test', createHandler({ schema: test }))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => { console.log(`...Server is running on Port ${port}`); })