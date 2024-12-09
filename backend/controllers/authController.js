const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login Handler
/* const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const foundUser = await User.findOne({ username: user }).exec();
        if (!foundUser) return res.sendStatus(401); // Unauthorized

        // Evaluate password
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            const roles = Object.values(foundUser.roles).filter(Boolean);

            // Create JWTs
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: foundUser.username,
                        roles: roles,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );

            const refreshToken = jwt.sign(
                { username: foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // Save refreshToken with the current user
            foundUser.refreshToken = refreshToken;
            await foundUser.save();

            // Create secure cookie with refresh token
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000,
            });

            // Send roles and access token to the user
            res.json({ roles, accessToken });
        } else {
            res.sendStatus(401); // Unauthorized
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}; */

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


/* const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const duplicate = await User.findOne({ username }).exec();
    if (duplicate) return res.status(409).json({ message: 'Username already exists.' });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({
            username,
            password: hashedPassword,
        });
        res.status(201).json({ message: `User ${username} registered successfully!` });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user.' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = await User.findOne({ username }).exec();
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials.' });

    const roles = Object.values(user.roles).filter(Boolean);
    const accessToken = jwt.sign(
        {
            UserInfo: {
                username: user.username,
                roles: roles,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
};

const refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken }).exec();
    if (!user) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user.username !== decoded.username) return res.sendStatus(403);

            const roles = Object.values(user.roles).filter(Boolean);
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: decoded.username,
                        roles: roles,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            res.json({ accessToken });
        }
    );
};

const logoutUser = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken }).exec();
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    user.refreshToken = '';
    await user.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
};


module.exports = { registerUser, loginUser, refreshToken, logoutUser }; */
