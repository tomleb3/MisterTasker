import { useState, useEffect } from 'react'
import { TaskList } from '../cmps/TaskList.jsx'
import { taskService } from '../services/taskService.js'

export function Home() {

    const [tasks, getTasks] = useState(null)

    useEffect(async () => {
        getTasks(await taskService.query())
    }, [])

    console.log(tasks)


    return <section className="home">
        <div className="hero"></div>
        <div className="main-layout">
            <TaskList tasks={tasks} />
        </div>
    </section>
}