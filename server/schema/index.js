const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql')
const { ambers, users } = require('../samples/data')

// Queries
const AmberType = new GraphQLObjectType({
  name: 'Amber',
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    thumbnail_url: { type: GraphQLString },
    image_urls: { type: new GraphQLList(GraphQLString) },
    like: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve(parent, args) {
        return users.find(user => user.id === parent.user_id)
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    ambers: {
      type: new GraphQLList(AmberType),
      resolve(parent, args) {
        return ambers.filter(amber => amber.user_id === parent.id)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ambers: {
      type: new GraphQLList(AmberType),
      args: { search: { type: GraphQLString } },
      resolve(parent, args) {
        return ambers.filter(amber => amber.title.includes(args.search))
      }
    },
    amber: {
      type: AmberType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ambers.find(amber => amber.id === args.id)
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return users.find(user => user.id === args.id)
      }
    }
  }
})

// Mutations
const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addAmber: {
      type: AmberType,
      args: {
        user_id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        console.log(`${args.user_id} ,  ${args.title}`)
        return { user_id: args.user_id, title: args.title }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})
