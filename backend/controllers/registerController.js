const User = require('../model/User');
const bcrypt = require('bcrypt');

//Creates a new user document
const handleNewUser = async (req, res) => {

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Check for duplicate usernames in the database
        const duplicate = await User.findOne({ username }).exec();
        if (duplicate) {
            console.log('Duplicate username found:', username);
            return res.status(409).json({ message: 'Username already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and store the new user
        const result = await User.create({
            username,
            password: hashedPassword,
        });

        console.log('User created successfully:', result);

        // Respond with success
        res.status(201).json({ success: `New user ${username} created!` });
    } catch (err) {
        console.error('Error during user creation:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { handleNewUser };
