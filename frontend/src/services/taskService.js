import { httpService } from './httpService.js'

export const taskService = {
    query,
    getById,
    remove,
    update,
    perform
}

async function query() {
    return await httpService.get(`task`)
}

async function getById(taskId) {
    return await httpService.get(`task/${taskId}`)
}

async function remove(taskId) {
    return await httpService.delete(`task/${taskId}`)
}

async function update(task) {
    return await httpService.put(`task/${task._id}`, task)
}

async function perform(task) {
    return await httpService.put(`task/${task._id}/start`, task)
}