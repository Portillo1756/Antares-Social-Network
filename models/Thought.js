const { Schema, model } = require('mongoose');

// import moment module to format the timestamp
const moment = require('moment')

// schema to create a thought model
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Type.objectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 400
        },
        username: {
            type: String,
            required: true,
        },
        createAt:{
            type: Date,
            default: Date.now(),
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

// thought schema
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username: {
            type: String,
            required: true,
        },
        reaction: [reactionSchema] 
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

// get total count of friends
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reaction.length;
})

// create the user model using the userSchema
const Thought = model('Thought', thoughtSchema);

// export the Thought model
module.exports = Thought;