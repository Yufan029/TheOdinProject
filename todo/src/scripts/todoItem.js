export default class TodoItem {
    constructor(title, description, dueDate, priority, project, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.notes = notes;
        this.checked = false;
    }
}