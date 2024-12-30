const express = require('express');
const { Photo } = require('./models'); // Import the Photo model

const router = express.Router();

// Create a new photo
router.post('/photos', async (req, res) => {
    try {
        const { title, description, imageURL } = req.body;
        const newPhoto = await Photo.create({ title, description, imageURL });
        res.status(201).json(newPhoto);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create photo' });
    }
});

// Get all photos
router.get('/photos', async (req, res) => {
    try {
        const photos = await Photo.findAll();
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch photos' });
    }
});

// Get a single photo by ID
router.get('/photos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await Photo.findByPk(id);
        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }
        res.status(200).json(photo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch photo' });
    }
});

// Update a photo by ID
router.put('/photos/:id', async (req, res) => {
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
        res.status(500).json({ error: 'Failed to update photo' });
    }
});

// Delete a photo by ID
router.delete('/photos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await Photo.findByPk(id);
        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }
        await photo.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete photo' });
    }
});

module.exports = router;
