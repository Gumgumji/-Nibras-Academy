const { z } = require('zod');

// YouTube URL pattern
const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

const createCourseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  youtubeUrl: z.string().regex(youtubeRegex, 'Invalid YouTube URL')
});

const updateCourseSchema = createCourseSchema.partial(); 
//  استخدم نفس قوانين الكورس  لكن بالتحديث مو لازم ترسل كل الحقول

module.exports = { createCourseSchema, updateCourseSchema };