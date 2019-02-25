const setTasksToLS = (tasks) => {
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

export default setTasksToLS