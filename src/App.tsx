import "./App.css";
import { useEffect, useState } from "react";
import Input from "./components/Input/Input";
import Button from "./components/Button/Button";
import Popup from "./components/Popup/Popup";
import { Todo } from "./components/types";
import deletee from "./assets/deletee.png";
import edit from "./assets/edit.png";
import iconpers from "./assets/iconpers.png";

function App() {
  const [comment, setComment] = useState("");
  const [todo, setTodo] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | undefined>();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [count, setCount] = useState(0);

  const hendleAddComment = () => {
    if (!comment.trim()) {
      alert("Please write a comment");
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: comment,
      item: undefined,
      editId: undefined,
    };
    setTodo((prev) => [...prev, newTodo]);
    setComment("");
  };
  const timestamp = new Date().toLocaleTimeString();

  const deleteComment = (id: number) => {
    // console.log("Deleting comment with id:", id);
    setTodo((prev) => prev.filter((item) => item.id !== id));
    setShowDeletePopup(false);
  };

  const editComment = (id: number, newText: string) => {
    setTodo((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, text: newText };
        }
        return item;
      })
    );
    setEditId(undefined);
    setComment("");
  };

  const incrementFn = () => {
    setCount(count + 1);
  };
  const decrementFn = () => {
    if (count === 0) {
      return 0;
    }
    setCount(count - 1);
  };

  let savedTodo = localStorage.getItem("todo");

  useEffect(() => {
    if (savedTodo) {
      const parsedTodo = JSON.parse(savedTodo);
      setTodo(parsedTodo)
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);
  
  return (
    <div className={"bg-slate-100 "}>
      <div className="flex flex-col text-center justify-center w-[383px] m-auto xl:w-[100vh] p-[20px]  xl:h-[100%] xl:gap-[50px]">
        <ul>
          {todo.map((item) => (
            <li
              key={item.id}
              className="w-[343px] h-[165px] p-[15px]  flex-col rounded-[5px] mb-5 relative bg-white xl:flex xl:items-center xl:gap-[20px] xl:w-[730px] xl:h-[173px] xl:relative"
            >
              <div
                className=
                  " flex gap-[20px] bg-slate-100 top-[110px] justify-center  rounded-[5px] w-[100px] h-[40px] absolute xl:left-[15px] xl:top-[30px] xl:flex-col xl:justify-center xl:items-center xl:w-[40px] xl:h-[110px] xl:gap-[10px]"
              >
                <Button
                  onClick={incrementFn}
                  content={"+"}
                  className={"text-indigo-200 font-bold text-base "}
                />
                <h1 className={"text-indigo-600 flex items-center  "}>
                  {count}
                </h1>
                <Button
                  onClick={decrementFn}
                  content={"-"}
                  className={"text-indigo-200 font-bold text-base "}
                />
              </div>
              <div className="flex   gap-[45px] w-[295px]  pt-0 m-auto p-[20px] xl:w-[600px] xl:gap-[50px] xl:m-[0] xl:pt-0">
                <img className={"w-[32px] h-[32px]"} src={iconpers} />
                <h3>Eli</h3>
                <div className="te">
                  <p>{timestamp}</p>
                </div>
                <div
                  className={
                    "items-center absolute flex top-[115px] right-[15px] xl:top-[20px] xl:right-[40px]"
                  }
                >
                  <div className="flex items-center mr-[10px] xl:mr-[20px]">
                    <img
                      className="w-[11px] h-[14px]"
                      src={deletee}
                      alt="delete icon"
                    />
                    <Button
                      onClick={() => setShowDeletePopup(true)}
                      content={"delete"}
                      className={"text-rose-600 hover:text-[#FFB8BB]"}
                    />
                  </div>
                  <div className="flex items-center">
                    <img
                      className="w-[11px] h-[14px]"
                      src={edit}
                      alt="edit icon"
                    />
                    <Button
                      onClick={() => {
                        setEditId(item.id);
                        setComment(item.text);
                      }}
                      content={"Edit"}
                      className={"text-indigo-700 hover:text-[#575151]"}
                    />
                  </div>
                </div>
              </div>
              {editId === item.id ? (
                <div className="flex  xl:w-[500px] xl:h-[400px] top-[70px]">
                  <div className="flex flex-col gap-[10px] justify-center absolute top-[9px] right-[15px] xl:top-[10px] xl:left-[15px]">
                    <Input
                      placeholder={"Edit comment…"}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      className={
                        "w-[311px] h-[96px] p-[15px] border stroke-slate-600 rounded-lg xl:w-[700px]  "
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-[10px]  ">
                    <Button
                      onClick={() => editComment(item.id, comment)}
                      content={"UPDATE"}
                      className={
                        "bg-indigo-700 w-[112px] h-[48px] text-white rounded-xl absolute top-[110px] right-[15px] xl: hover:bg-[#C5C6EF] xl:top-[115px] xl:right-[15px] "
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className={"text-left xl:text-left "}>{item.text}</div>
              )}
            </li>
          ))}
        </ul>
        {showDeletePopup && (
          <Popup
            title={"Delete comment"}
            content={
              "Are you sure you want to delete this comment? This action cannot be undone."
            }
            deleteButton={() => deleteComment(edit.id)}
            cancelButton={() => setShowDeletePopup(false)}
            deletecont={"DELETE"}
            cancelcont={"CANCEL"}
          
          />
        )}
        <div className="w-[343px] h-[180px] p-[15px]  rounded-[5px] bg-white xl:flex  xl:items-center xl:gap-[20px] xl:w-[730px] xl:h-[167px]  ">
          <Input
            placeholder={"Add a comment…"}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            className={
              "w-[311px] h-[96px] border stroke-slafe-600 rounded-lg xl:w-[596px] "
            }
          />
          <Button
            onClick={hendleAddComment}
            content={"SEND"}
            className={
              "bg-indigo-700 w-[104px] h-[48px]  text-white rounded-xl  ml-[200px] mt-[10px] xl:m-[0] xl:static hover:bg-[#C5C6EF]"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
