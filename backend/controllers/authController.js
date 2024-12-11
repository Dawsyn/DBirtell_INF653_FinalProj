const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username?.trim() || !password?.trim()) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Find user in database
        const foundUser = await User.findOne({ username }).exec();
        if (!foundUser) {
            console.log(`Failed login attempt for username: ${username}`);
            return res.sendStatus(401); // Unauthorized
        }

        // Compare password
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) {
            console.log(`Invalid password for username: ${username}`);
            return res.sendStatus(401); // Unauthorized
        }

        // Get user roles
        const roles = Object.values(foundUser.roles).filter(Boolean);
        console.log(`Roles for ${username}:`, roles);

        // Generate tokens
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    username: foundUser.username,
                    roles: roles,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Save refreshToken to user in database
        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        // Set secure cookie with refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        });

        // Send access token and roles
        res.json({ roles, accessToken });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


// Registration Handler
const registerUser = async (req, res) => {

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const duplicate = await User.findOne({ username }).exec();
        if (duplicate) return res.status(409).json({ message: 'Username already exists.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            password: hashedPassword,
        });

        res.status(201).json({ message: `User ${username} registered successfully!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user.' });
    }
};

module.exports = { handleLogin, registerUser };