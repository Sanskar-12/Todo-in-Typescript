import {
  AppBar,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { getTodos, saveTodos } from "./utils/features";

function App() {
  const [title, setTitle] = useState<TodoItemType["title"]>("");

  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());

  const completeHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.map((i) => {
      if (i.id === id) {
        i.isCompleted = !i.isCompleted;
      }
      return i;
    });

    setTodos(newTodos)
  };

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.filter((i) =>i.id!==id);

    setTodos(newTodos)
  };

  const editHandler=(id:TodoItemType["id"],newTitle:TodoItemType["title"])=>{
    const newTodo:TodoItemType[]=todos.map((i)=>{
        if(i.id===id)
        {
          i.title=newTitle
        }
        return i
    })

    setTodos(newTodo)
  }

  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title: title,
      isCompleted: false,
      id: String(Math.random() * 1000),
    };

    setTodos((prev) => [...prev, newTodo]);

    setTitle("");
  };

  useEffect(()=>{
    saveTodos(todos)
  },[todos])

  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Stack
        height={"75%"}
        direction={"column"}
        spacing={"1rem"}
        p={"1rem"}
        sx={{ overflowY: "auto" }}
      >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            completeHandler={completeHandler}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
          />
        ))}
      </Stack>
      <TextField
        fullWidth
        label={"New Task"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter" && title !== "") submitHandler();
        }}
      />
      <Button
        onClick={submitHandler}
        fullWidth
        sx={{ margin: "1rem 0" }}
        variant="contained"
        disabled={title === ""}
      >
        Add
      </Button>
    </Container>
  );
}

export default App;
