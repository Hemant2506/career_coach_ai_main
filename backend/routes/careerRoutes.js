import express from 'express';
import {
  getCareers,
  getCareerById,
  recommendCareers,
  analyzeSkillGap
} from '../controllers/careerController.js';

const router = express.Router();

// Career catalog
router.get('/', getCareers);

// Recommendation engine
router.post('/recommend', recommendCareers);

// Skill gap analysis
router.post('/analyze', analyzeSkillGap);

// Single career detail
router.get('/:id', getCareerById);

export default router;
