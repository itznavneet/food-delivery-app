import mongoose from 'mongoose'

// Defining schema for "user" collection
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },         // User's name must be provided
    email: { type: String, required: true, unique: true }, // Email required & must be unique
    password: { type: String, required: true },     // Password required
    cartData: { type: Object, default: {} }         // Stores user cart (empty object by default)
}, { minimize: false })  // prevents mongoose from removing empty objects

// If "user" model already exists (like in hot-reload), use it, else create a new model
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
