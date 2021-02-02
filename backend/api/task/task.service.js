const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const externalService = require('../../services/externalService')

var taskQueue = []

async function query() {
    try {
        const collection = await dbService.getCollection('task')
        return await collection.find({}).toArray()
    } catch (err) {
        logger.error('cannot find tasks', err)
        throw err
    }
}

async function getById(taskId) {
    try {
        const collection = await dbService.getCollection('task')
        return await collection.findOne({ '_id': ObjectId(taskId) })
    } catch (err) {
        logger.error(`while finding task ${taskId}`, err)
        throw err
    }
}

async function add(task) {
    try {
        // peek only updatable fields!
        const taskToAdd = {
            fullname: task.fullname,
        }
        const collection = await dbService.getCollection('task')
        await collection.insertOne(taskToAdd)
        return taskToAdd
    } catch (err) {
        logger.error('cannot insert task', err)
        throw err
    }
}

async function update(task) {
    try {
        // peek only updatable fields!
        const taskToSave = {
            ...task,
            _id: ObjectId(task._id),
            lastTriedAt: Date.now(),
            triesCount: task.triesCount++
        }
        const collection = await dbService.getCollection('task')
        await collection.updateOne({ '_id': taskToSave._id }, { $set: taskToSave })
        return taskToSave
    } catch (err) {
        logger.error(`cannot update task ${task._id}`, err)
        throw err
    }
}

setInterval(() => {
    console.log('Running', taskQueue[0])
    if (!taskQueue.length) return
    taskQueue.sort((a, b) => a.triesCount < b.triesCount ? 1 : -1)
    taskQueue.sort((a, b) => b.importance < a.importance ? 1 : -1)
    perform(taskQueue[0])
}, 5000)

async function perform(task) {
    try {
        var taskToSave = {
            ...task,
            _id: ObjectId(task._id),
        }
        await externalService.execute()
        // peek only updatable fields!
        if (!taskToSave.doneAt) {
            taskToSave.doneAt = Date.now()
            idxAtQueue = taskQueue.findIndex(_task => _task._id === taskToSave._id)
            if (idxAtQueue !== -1) taskQueue.splice(idxAtQueue, 1)
        }
    } catch (err) {
        if (!taskToSave.doneAt) {
            taskToSave.lastTriedAt = Date.now()
            taskToSave.triesCount = task.triesCount++
            idxAtQueue = taskQueue.findIndex(_task => _task._id === taskToSave._id)
            if (idxAtQueue === -1) taskQueue.push(taskToSave)
        }
        logger.error(`cannot update task ${task._id}`, err)
        throw err
    } finally {
        const collection = await dbService.getCollection('task')
        await collection.updateOne({ '_id': taskToSave._id }, { $set: taskToSave })
        return taskToSave
    }
}

async function remove(taskId) {
    try {
        const collection = await dbService.getCollection('task')
        await collection.deleteOne({ '_id': ObjectId(taskId) })
    } catch (err) {
        logger.error(`cannot remove task ${taskId}`, err)
        throw err
    }
}

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
    perform
}