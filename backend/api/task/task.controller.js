const taskService = require('./task.service')
const logger = require('../../services/logger.service')

async function getTask(req, res) {
    try {
        const task = await taskService.getById(req.params.id)
        res.send(task)
    } catch (err) {
        logger.error('Failed to get task', err)
        res.status(500).send({ err: 'Failed to get task' })
    }
}

async function getTasks(req, res) {
    try {
        const tasks = await taskService.query()
        res.send(tasks)
    } catch (err) {
        logger.error('Failed to get tasks', err)
        res.status(500).send({ err: 'Failed to get tasks' })
    }
}

async function deleteTask(req, res) {
    try {
        await taskService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete task', err)
        res.status(500).send({ err: 'Failed to delete task' })
    }
}

async function updateTask(req, res) {
    try {
        const task = req.body
        const savedTask = await taskService.update(task)
        res.send(savedTask)
    } catch (err) {
        logger.error('Failed to update task', err)
        res.status(500).send({ err: 'Failed to update task' })
    }
}

async function performTask(req, res) {
    try {
        const task = req.body
        const savedTask = await taskService.perform(task)
        res.send(savedTask)
    } catch (err) {
        logger.error('Failed to update task', err)
        res.status(500).send({ err: 'Failed to update task' })
    }
}

module.exports = {
    getTask,
    getTasks,
    deleteTask,
    updateTask,
    performTask,
    // addTask
}