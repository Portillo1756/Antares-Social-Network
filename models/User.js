const { Schema, model, Types } = require('mongoose');

// schema to create user model
const userSchema = new Schema(
    {
        first: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            uniqued: true,
            match: [
                `/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/`,
                "Please fill a valid email address",
            ],
        },
        thought: [
            {
            type: Schema.Types.ObjectId,
            ref: "Thought",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual("friendCount").get(function () {
    return this.friends.lenght;
});

// create the User model using the UserSchema
const User = model('user', userSchema);

// export the User model
module.exports = User;