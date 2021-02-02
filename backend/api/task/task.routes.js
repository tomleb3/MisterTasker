const express = require('express')
const { getTask, getTasks, deleteTask, updateTask, performTask } = require('./task.controller')
const router = express.Router()

router.get('/', getTasks)
router.get('/:id', getTask)
// router.post('/:id', addTask)
// router.put('/:id', updateTask)
router.put('/:id/start', performTask)
router.delete('/:id', deleteTask)

module.exports = router