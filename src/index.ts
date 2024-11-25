
import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
}

const list = document.querySelector<HTMLUListElement>('#list')
const form = document.querySelector<HTMLFormElement>('#new-task-form')
const input = document.querySelector<HTMLInputElement>('#new-task-title')
const tasks: Task[] = loadTasks()
tasks.forEach(task => addListItem(task))

form?.addEventListener('submit', (event) => {
  event.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    date: new Date()
  }

  tasks.push(newTask)

  addListItem(newTask)
  input.value = ""
})

function addListItem(task: Task): boolean
{
  const item = document.createElement('li')
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  deleteButton.addEventListener('click', () => {
    const index = tasks.findIndex(t => t.id === task.id)
    tasks.splice(index, 1)
    item.remove()
    saveTasks()
  })
  checkbox.type = 'checkbox'
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  item.append(deleteButton)
  list?.append(item)
  saveTasks()
  return true
}

function saveTasks(): void
{
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks(): Task[]
{
  const tasksData = localStorage.getItem('tasks')
  if (tasksData == null) return []
  return JSON.parse(tasksData)
}