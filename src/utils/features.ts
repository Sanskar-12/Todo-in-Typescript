export const saveTodos=(todos:TodoItemType[]):void=>{
    localStorage.setItem("Todos",JSON.stringify(todos))
}

export const getTodos=():TodoItemType[]=>{
    const todos=localStorage.getItem("Todos")

    return todos?JSON.parse(todos):[]
}