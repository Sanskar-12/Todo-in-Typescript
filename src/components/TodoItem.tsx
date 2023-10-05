import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { RiDeleteBin3Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import {  useState } from "react";
import {MdDoneOutline} from "react-icons/md"

type PropsType = {
  todo: TodoItemType;
  completeHandler: (id: TodoItemType["id"]) => void;
  deleteHandler: (id: TodoItemType["id"]) => void;
  editHandler: (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"]
  ) => void;
};

const TodoItem = ({
  todo,
  completeHandler,
  deleteHandler,
  editHandler,
}: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [textVal, setTextVal] = useState<string>(todo.title);

  const clickHandler=()=>{
    editHandler(todo.id,textVal)
    setEditActive(false)
  }

  

  return (
    <>
      <Paper
        sx={{
          padding: "1rem",
        }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          {editActive ? (
            <TextField
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter" && textVal !== "") {
                  editHandler(todo.id, textVal);
                  setEditActive(false);
                }
              }}
            />
          ) : (
            <Typography marginRight={"auto"}>{todo.title}</Typography>
          )}
          <Checkbox
            checked={todo.isCompleted}
            onChange={() => completeHandler(todo.id)}
          />
          {
            editActive?<Button
            sx={{ fontSize: "20px" }}
            onClick={clickHandler}
          >
            <MdDoneOutline/>
          </Button>:<Button
            sx={{ fontSize: "20px" }}
            onClick={() => setEditActive((prev) => !prev)}
          >
            <BiEdit />
          </Button>
          }
          
          <Button
            sx={{ fontSize: "20px" }}
            onClick={() => deleteHandler(todo.id)}
          >
            <RiDeleteBin3Line />
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

export default TodoItem;
