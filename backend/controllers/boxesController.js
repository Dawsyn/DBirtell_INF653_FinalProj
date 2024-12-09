const Box = require('../model/Boxes');

const getAllBoxes = async (req, res) => {
    const boxes = await Box.find();
    if (!boxes) return res.status(204).json({ 'message': 'No Box found.' });
    res.json(boxes);
}

const addNewBox = async (req, res) => {
    if (!req?.body?.brand || !req?.body?.sport || !req?.body?.description || !req?.body?.price) {
        return res.status(400).json({ 'message': 'Brand, description, price, and sport are required' });
    }

    try {

        const result = await Box.create({
            brand: req.body.brand,
            sport: req.body.sport,
            description: req.body.description,
            price: req.body.price
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

        const updateBox = async (req, res) => {
            // Accept both `id` and `_id` for flexibility
            const boxId = req.body.id || req.body._id;
        
            // If no ID is provided, return a 400 error
            if (!boxId) {
            return res.status(400).json({ message: 'ID parameter is required.' });
            }
        
            try {
            // Find the box by ID
            const box = await Box.findById(boxId).exec();
            if (!box) {
                return res.status(404).json({ message: `No box matches ID ${boxId}.` });
            }
        
            // Update fields if provided in the request
            if (req.body.brand) box.brand = req.body.brand;
            if (req.body.sport) box.sport = req.body.sport;
            if (req.body.description) box.description = req.body.description;
            if (req.body.price) box.price = req.body.price;
        
            // Save the updated employee document
            const result = await box.save();
            res.status(200).json(result);
            } catch (error) {
            console.error('Error updating box:', error);
            res.status(500).json({ message: 'Server error while updating box.' });
            }
        };
        

    const deleteBox = async (req, res) => {
        // Check if the ID is provided in the URL params
        const boxId = req.params.id;
        if (!boxId) return res.status(400).json({ message: 'box ID required.' });
    
        try {
            // Find the box by ID
            const box = await Box.findById(boxId).exec();
            if (!box) {
                return res.status(404).json({ message: `No box matches ID ${boxId}.` });
            }
    
            // Delete the box
            const result = await box.deleteOne();
            res.status(200).json({ message: 'Box deleted successfully.', result });
        } catch (error) {
            console.error('Error deleting employee:', error);
            res.status(500).json({ message: 'Server error while deleting box.' });
        }
    };

const getBox = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Box ID required.' });

    const box = await Box.findOne({ _id: req.params.id }).exec();
    if (!box) {
        return res.status(204).json({ "message": `No box matches ID ${req.params.id}.` });
    }
    res.json(box);
}

module.exports = {
    getAllBoxes,
    addNewBox,
    updateBox,
    deleteBox,
    getBox
}