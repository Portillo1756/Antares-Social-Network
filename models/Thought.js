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
            max_lenght: 400
        },
        username: {
            type: String,
            required: true,
        },
        
    }
)