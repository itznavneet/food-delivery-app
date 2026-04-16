import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from 'cloudinary'

//add food item
const addFood= async(req, res)=>{
    try {
        let image_url = null

        // Upload image to Cloudinary if provided
        if (req.file) {
            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'food_delivery/foods',
                        resource_type: 'auto'
                    },
                    (error, result) => {
                        if (error) reject(error)
                        else resolve(result)
                    }
                )
                uploadStream.end(req.file.buffer)
            })
            image_url = uploadResult.secure_url
        }

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_url
        })

        await food.save()
        res.json({success: true, message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

//all food-list
const listFood= async(req,res)=>{
    try {
        const foods= await foodModel.find({});
        res.json({success: true, data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

//remove food item
const removeFood= async(req,res)=>{
    try {
        const food= await foodModel.findById(req.body.id)
        
        // Delete image from Cloudinary if it exists
        if (food.image) {
            try {
                // Extract public_id from Cloudinary URL
                const urlParts = food.image.split('/')
                const filename = urlParts[urlParts.length - 1].split('.')[0]
                const publicId = `food_delivery/foods/${filename}`
                await cloudinary.uploader.destroy(publicId)
            } catch (cloudinaryError) {
                console.log('Error deleting from Cloudinary:', cloudinaryError)
            }
        }
        
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Food removed"})
    } catch (error) {
        res.json({success:false, message:"error"})
    }
}

export {addFood, listFood, removeFood}