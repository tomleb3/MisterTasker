import { TaskPreview } from './TaskPreview.jsx'

export function TaskList({ tasks }) {

    if (!tasks) return <div>Loading...</div>
    return <section className="task-list">
        {tasks.map(task => {
            return <TaskPreview key={task._id} task={task} />
        })}
    </section>
}