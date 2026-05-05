import express from 'express';
import { getDb } from '../db/connection';

const router = express.Router();

router.get('/', async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const db = getDb();
    const movies = await db.collection('movies')
      .find({}, {
        projection: {
          title: 1,
          year: 1,
          genres: 1,
          poster: 1,
          plot: 1,
          rated: 1,
          runtime: 1,
          imdb: 1
        }
      })
      .sort({ title: 1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection('movies').estimatedDocumentCount();

    res.json({
      movies: movies,
      page: page,
      totalPages: Math.ceil(total / limit),
      total: total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/letter/:letter', async function (req, res) {
  try {
    const letter = req.params.letter.toUpperCase();
    const db = getDb();
    var offset;
    if (letter === '#') {
      offset = 0;
    } else {
      offset = await db.collection('movies').countDocuments({
        title: { $lt: letter }
      });
    }
    res.json({ letter: letter, offset: offset });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
