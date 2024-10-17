const userModel = require('../../models/userModel');
const bcrypt = require("bcrypt");
const saltRounds = 10;


const getAllHost = async (req, res) => {
    try {
        const hosts = await userModel.find({ role: "host" }).select("-password -__v");
        res.status(200).json(hosts);
    } catch (error) {
        console.error(error); // Add this line to log errors
        res.status(500).json({ message: "Internal server error" });
    }
}

const getHostById = async (req, res) => {
    try {
        const host = await userModel.findById(req.params.hostId).select("-password -__v");
        if (!host) {
            return res.status(404).json({
                EC: 1,
                message: "Host not found"
            });
        }
        res.status(200).json(host);
    } catch (error) {
        console.error(error); // Add this line to log errors
        res.status(500).json({ message: "Internal server error" });
    }
}

const createHost = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Validate email format using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!username || !email || !password) {
            return res.status(400).json({
                EC: 1,
                message: "Missing required fields (username, email, password)"
            });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ EC: 1, message: "Invalid email format" });
        }

        const existingHost = await userModel.findOne({ email, role: "host" });
        if (existingHost) {
            return res.status(400).json({
                EC: 1,
                message: "Email is already registered as a host"
            });
        }
        let hashedPassword = await bcrypt.hash(password, saltRounds);
        const newHost = new userModel({
            username,
            email,
            password: hashedPassword,
            role: "host",
            is_active: true,
        });
        await newHost.save();
        res.status(201).json({ EC: 0, message: "Host created successfully", host: newHost });
    } catch (error) {
        console.error(error); // Log errors
        res.status(500).json({ EC: 1, message: "Internal server error" });
    }
}


const banHost = async (req, res) =>{
    try {
        const host = await userModel.findById(req.params.hostId).select("-password -__v");
    
        if (!host) {
            return res.status(404).json({ EC: 1, message: "Host not found" });
        }
    
        if (host.is_ban) {
            return res.status(400).json({ EC: 1, message: "Host banned !!! Can't ban" });
        }
    
        host.is_ban = true; // Ban the host
        await host.save();
    
        res.status(200).json({ EC: 0, message: `Host ${host.name} is banned`, host });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const unBanHost = async (req, res) =>{
    try {
        const host = await userModel.findById(req.params.hostId).select("-password -__v");
    
        if (!host) {
            return res.status(404).json({ EC: 1, message: "Host not found" });
        }
    
        if (!host.is_ban) {
            return res.status(400).json({ EC: 1, message: "Host not ban !!!" });
        }
    
        host.is_ban = false; 
        await host.save();
    
        res.status(200).json({ EC: 0, message: `Host ${host.name} is unban successful`, host });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllHost,
    getHostById,
    createHost,
    banHost,
    unBanHost
};