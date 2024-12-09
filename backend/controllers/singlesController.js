const Single = require('../model/Singles');

const getAllCards = async (req, res) => {
    const card = await Single.find();
    if (!card) return res.status(204).json({ 'message': 'No Card found.' });
    res.json(card);
}

const addNewCard = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname || !req?.body?.sport || !req?.body?.price) {
        return res.status(400).json({ 'message': 'First and last names and price, and sport are required' });
    }

    try {

        const result = await Single.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            sport: req.body.sport,
            description: req.body.description,
            price: req.body.price
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

        const updateCard = async (req, res) => {
            // Accept both `id` and `_id` for flexibility
            const cardId = req.body.id || req.body._id;
        
            // If no ID is provided, return a 400 error
            if (!cardId) {
            return res.status(400).json({ message: 'ID parameter is required.' });
            }
        
            try {
            // Find the employee by ID
            const card = await Single.findById(cardId).exec();
            if (!card) {
                return res.status(404).json({ message: `No card matches ID ${cardId}.` });
            }
        
            // Update fields if provided in the request
            if (req.body.firstname) card.firstname = req.body.firstname;
            if (req.body.lastname) card.lastname = req.body.lastname;
            if (req.body.sport) card.sport = req.body.sport;
            if (req.body.description) card.description = req.body.description;
            if (req.body.price) card.price = req.body.price;
        
            // Save the updated employee document
            const result = await card.save();
            res.status(200).json(result);
            } catch (error) {
            console.error('Error updating card:', error);
            res.status(500).json({ message: 'Server error while updating card.' });
            }
        };
        

    const deleteCard = async (req, res) => {
        // Check if the ID is provided in the URL params
        const cardId = req.params.id;
        if (!cardId) return res.status(400).json({ message: 'Card ID required.' });
    
        try {
            // Find the card by ID
            const card = await Single.findById(cardId).exec();
            if (!card) {
                return res.status(404).json({ message: `No card matches ID ${cardId}.` });
            }
    
            // Delete the card
            const result = await card.deleteOne();
            res.status(200).json({ message: 'Employee deleted successfully.', result });
        } catch (error) {
            console.error('Error deleting employee:', error);
            res.status(500).json({ message: 'Server error while deleting employee.' });
        }
    };

const getCard = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'card ID required.' });

    const card = await Single.findOne({ _id: req.params.id }).exec();
    if (!card) {
        return res.status(204).json({ "message": `No card matches ID ${req.params.id}.` });
    }
    res.json(card);
}

module.exports = {
    getAllCards,
    addNewCard,
    updateCard,
    deleteCard,
    getCard
}