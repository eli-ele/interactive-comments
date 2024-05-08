import Button from "../Button/Button"
import { PopupType } from "../types"

const Popup = ({
    title,
    content,
    cancelButton,
    deleteButton,
    deletecont,
    cancelcont,
   
}: PopupType) => {
   
  return (
      <div className={" w-[343px] xl:w-[400px] h-[252px] absolute bg-[white] xl:left-[500px] flex flex-col justify-center p-[10px] drop-shadow-xl xl:top-[150px]"}>
          <div>
              <h1 className={"text-lg"}>{title}</h1>
          </div>
          <div>
              <p className=" text-gray-500 pt-[20px]">{ content}</p>
          </div>
          <div >
              <Button
                onClick={cancelButton}
                content={cancelcont}
                className={"w-[138px] h-[48px] m-[10px] rounded-lg text-white bg-gray-600 xl:w-[161px]"}
              />
               <Button
                  onClick={deleteButton}
                  className={"w-[138px] h-[48px] rounded-lg text-white bg-rose-600 xl:w-[161px]"}
                  content={deletecont }
              />
          </div>
    </div>
  )
}

export default Popup