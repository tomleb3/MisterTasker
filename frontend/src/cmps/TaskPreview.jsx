import { taskService } from '../services/taskService.js'

export function TaskPreview({ task }) {

    const onPerformTask = () => {
        taskService.perform(task)
    }

    return <article className="task-preview">
        <h2>{task.title}</h2>
        <h3>{task.description}</h3>
        <p>Importance: {task.importance}</p>
        <strong>Times Tried: {task.triesCount}</strong>
        <label>Last Try At: {new Date(task.lastTriedAt).toLocaleTimeString("en-US")}</label>
        <h5>{task.doneAt ? `Done At: ${new Date(task.doneAt).toLocaleTimeString("en-US")}` : 'Not Done Yet...'}</h5>
        <small className="muted">Created At: {new Date(task.createdAt).toLocaleTimeString("en-US")}</small>
        
        <button className="right" onClick={onPerformTask}>Start !</button>
    </article>
}