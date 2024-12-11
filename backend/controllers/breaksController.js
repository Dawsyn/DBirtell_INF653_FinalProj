const Break = require('../model/Breaks');

//returns all breaks
const getAllBreaks = async (req, res) => {
    const breaks = await Break.find();
    if (!breaks) return res.status(204).json({ 'message': 'No Break found.' });
    res.json(breaks);
}

//Adds new break document
const addNewBreak = async (req, res) => {
    if (!req?.body?.brand || !req?.body?.sport || !req?.body?.description || !req?.body?.price) {
        return res.status(400).json({ 'message': 'Brand, description, price, and sport are required' });
    }

    try {

        const result = await Break.create({
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

//Updates a single break document
const updateBreak = async (req, res) => {
    // Accept both `id` and `_id` for flexibility
    const breakId = req.body.id || req.body._id;

    // If no ID is provided, return a 400 error
    if (!breakId) {
        return res.status(400).json({ message: 'ID parameter is required.' });
    }

    try {
        // Find the break by ID
        const breaks = await Break.findById(breakId).exec();
        if (!breaks) {
            return res.status(404).json({ message: `No break matches ID ${breakId}.` });
        }

        // Update fields if provided in the request
        if (req.body.brand) breaks.brand = req.body.brand;
        if (req.body.sport) breaks.sport = req.body.sport;
        if (req.body.description) breaks.description = req.body.description;
        if (req.body.price) breaks.price = req.body.price;

        // Save the updated employee document
        const result = await breaks.save();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error updating break:', error);
        res.status(500).json({ message: 'Server error while updating break.' });
    }
};

//Deletes single break
const deleteBreaks = async (req, res) => {
    // Check if the ID is provided in the URL params
    const breakId = req.params.id;
    if (!breakId) return res.status(400).json({ message: 'break ID required.' });

    try {
        // Find the box by ID
        const breaks = await Break.findById(breakId).exec();
        if (!breaks) {
            return res.status(404).json({ message: `No box matches ID ${breakId}.` });
        }

        // Delete the box
        const result = await breaks.deleteOne();
        res.status(200).json({ message: 'Break deleted successfully.', result });
    } catch (error) {
        console.error('Error deleting break:', error);
        res.status(500).json({ message: 'Server error while deleting break.' });
    }
};

//returns a single break
const getBreak = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Break ID required.' });

    const breaks = await Break.findOne({ _id: req.params.id }).exec();
    if (!breaks) {
        return res.status(204).json({ "message": `No break matches ID ${req.params.id}.` });
    }
    res.json(breaks);
}

module.exports = {
    getAllBreaks,
    addNewBreak,
    updateBreak,
    deleteBreaks,
    getBreak
}