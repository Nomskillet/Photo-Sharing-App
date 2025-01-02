const express = require('express');
const { Photo } = require('./models'); // Import the Photo model
const authenticateToken = require('./authMiddleware'); // Import authentication middleware
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Initialize multer with storage configuration
const upload = multer({ storage });

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all photos
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.findAll();
        res.status(200).json(photos);
    } catch (error) {
        console.error('Error fetching photos:', error);
        res.status(500).json({ error: 'Failed to fetch photos' });
    }
});

// Create a new photo
router.post('/', async (req, res) => {
    try {
        const { title, description, imageURL } = req.body;
        const newPhoto = await Photo.create({ title, description, imageURL });
        res.status(201).json(newPhoto);
    } catch (error) {
        console.error('Error creating photo:', error);
        res.status(500).json({ error: 'Failed to create photo' });
    }
});

// Get a single photo by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await Photo.findByPk(id);
        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }
        res.status(200).json(photo);
    } catch (error) {
        console.error('Error fetching photo:', error);
        res.status(500).json({ error: 'Failed to fetch photo' });
    }
});

// Update a photo by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, imageURL } = req.body;
        const photo = await Photo.findByPk(id);
        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }
        await photo.update({ title, description, imageURL });
        res.status(200).json(photo);
    } catch (error) {
        console.error('Error updating photo:', error);
        res.status(500).json({ error: 'Failed to update photo' });
    }
});

// Delete a photo by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await Photo.findByPk(id);

        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }

        // Remove the file from the uploads folder
        const filePath = path.join(__dirname, 'uploads', path.basename(photo.imageURL));
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Delete the photo from the database
        await photo.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting photo:', error);
        res.status(500).json({ error: 'Failed to delete photo' });
    }
});

// Upload a photo
router.post('/upload', upload.single('photo'), async (req, res) => {
    try {
        const { title, description } = req.body;
        const imageURL = `http://localhost:5001/uploads/${req.file.filename}`;
        const newPhoto = await Photo.create({ title, description, imageURL });
        res.status(201).json(newPhoto);
    } catch (error) {
        console.error('Error uploading photo:', error);
        res.status(500).json({ error: 'Failed to upload photo' });
    }
});

module.exports = router;

