const express = require('express');
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
const authToken = require('../middlewares/auth');
const Project = require('../models/Project');

//@route POST /api/project
//@desc create project
//@access : private

router.post('/',
  authToken,
  body('title').notEmpty(),
  async (req, res) => {
    // checking validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    const { title, description = '' } = req.body;
    const user = req.user;
    try {
      const newProject = new Project({
        title,
        description,
        userId: user.id,
        members:[user.id],
      });
      await newProject.save();//save data

      return res.status(200).json({ success: true, message: 'create Project successfully!!!' })
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
)

//@api  GET /project
//@desc get all project you have
//@access Private

router.get('/', authToken, async(req, res) => {
  const user = req.user;
  try {
    const projects = await Project.find({ userId: user.id });
    return res.status(200).json({ success: true, message: 'Get project successfully!!!',data:projects })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, message: error.message });
  }
})

//@api  PUT /project
//@desc update project
//@access Private

router.put('/:id',
  authToken,
  body('title').notEmpty(),
  async (req, res) => {
    // checking validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }
    const _id = req.params.id?req.params.id:'';
    const { title, description = '' } = req.body;
    const user = req.user;
    try {
      const project = await Project.findByIdAndUpdate(
        {// condition to find
          _id,
          userId: user.id,
        },
        {// data to update
          title,
          description
        },
        {// option
          new:true
        }
      )
      if (!project) return res.status(401).json({ success: false, message: "Update Project fail!!!" });
      // all good.

      return res.status(200).json({ success: true, message: 'Update Project successfully!!!' })
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
)


router.delete('/:id',
  authToken,
  async (req, res) => {
    // checking validator
    const _id = req.params.id ? req.params.id : '';
    const user = req.user;
    try {
      const deleteProject = await Project.findByIdAndDelete(
        {// condition to find
          _id,
          userId: user.id,
        }
      )
      if (!deleteProject) return res.status(401).json({ success: false, message: "Delete Project fail!!!" });
      // we will have to delete features and task but with do someday

      return res.status(200).json({ success: true, message: 'Delete Project successfully!!!' })
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
)

module.exports = router;