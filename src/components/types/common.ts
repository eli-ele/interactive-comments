export interface inputType{
  type: string;
  placeholder: string;
  value?: string | undefined;
  onChange: (event: any) => void;
  className: string;
}
export interface ButtonType{
    onClick: ()=> void;
    content: string;
    className: string;
   
}
export interface PopupType{
    title: string;
    content: string;
    deleteButton: () => void;
    cancelButton: () => void;
    deletecont: string;
    cancelcont: string;
}
export interface Todo{
    id: number ;
    item: number | undefined;
    text: string;
    editId: number | undefined;
}