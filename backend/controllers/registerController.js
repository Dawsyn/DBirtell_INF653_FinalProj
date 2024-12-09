/* const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    console.log('Request Body:', req.body); // Debugging

    const { user, pwd } = req.body;
    console.log('Username:', username, 'Password:', password);
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser }; */

const User = require('../model/User');
const bcrypt = require('bcrypt');

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
