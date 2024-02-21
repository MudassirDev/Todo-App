import { useState } from "react";
import './todo.css'

export function TodoList() {
    const [addTask, setAddTask] = useState(false)
    const [addTaskPriority, setAddTaskPriority] = useState("Low")
    const [addTaskTodo, setAddTaskTodo] = useState('')
    const [deleteTodo, setDeleteTodo] = useState(false)
    const [deleteTodoId, setDeleteTodoId] = useState(null)
    const [editTodo, setEditTodo] = useState(false)
    const [editTodoId, setEditTodoId] = useState(null)
    const [editTaskTodo, setEditTaskTodo] = useState('')
    const [editPriorityTodo, setEditPriorityTodo] = useState(null)

    const [TodoItems, setTodoItems] = useState([
        {
            "task": "Go to gym",
            "priority": "High",
            "progress": "Not Started",
            "key": "O2EOD",
            "id": "1"
        },
        {
            "task": "Read a book",
            "priority": "Low",
            "progress": "Done",
            "key": "H0W6P",
            "id": "2"
        },
        {
            "task": "Go to market",
            "priority": "Medium",
            "progress": "In Progress",
            "key": "X94PL",
            "id": "3"
        }
    ])


    function updateProgress(e) {
        const updateTodoItems = TodoItems.map(item => {
            if (item.id === e.target.id) {
                return {
                    ...item,
                    progress: changeProgress(item.progress)
                }
            } else {
                return item
            }
        })

        setTodoItems(updateTodoItems)

        function changeProgress(progress) {
            if (progress === "Not Started") {
                return "In Progress";
            } else if (progress === "In Progress") {
                return "Done";
            } else {
                return "Not Started";
            }
        }
    }

    function addTaskFunc() {
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';

        function generatePassword() {
            let charset = uppercaseChars + numberChars;
            let password = '';

            for (let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }

            return password;
        }

        function isDuplicatePassword(password) {
            return TodoItems.some(elem => elem.key === password);
        }

        let password = generatePassword();
        while (isDuplicatePassword(password)) {
            password = generatePassword();
        }

        const objToPush = {
            "task": addTaskTodo,
            "priority": addTaskPriority,
            "progress": "Not Started",
            "key": password,
            "id": (TodoItems.length + 1).toString()
        }

        const arrayToPush = [objToPush, ...TodoItems]
        setTodoItems(arrayToPush)
        setAddTaskTodo('')
        setAddTaskPriority('Low')
        addTaskOverlay();
    }

    function addTaskOverlay() {
        setAddTask(!addTask)
    }

    function showDeleteModal(itemID) {
        setDeleteTodoId(itemID)
        setDeleteTodo(!deleteTodo)
    }

    function showEditModal(itemID) {
        setEditTodoId(itemID)
        TodoItems.forEach(item => {
            if (item.id === itemID) {
                setEditTaskTodo(item.task)
                setEditPriorityTodo(item.priority)
            }
        })
        setTimeout(() => {
            setEditTodo(!editTodo)
        })
    }

    function editTodoTask(e) {
        const editId = e.target.id;
        const arrayToEdit = [...TodoItems]
        const arrayToPush = [];
        arrayToEdit.forEach(item => {
            if (item.id === editId) {
                item.task = editTaskTodo
                item.priority = editPriorityTodo
            }
            setTimeout(() => {
                arrayToPush.push(item)
                showEditModal()
            })
        })
        setTimeout(() => {
            setTodoItems(arrayToPush)
        })
    }

    function deleteTodoTask(e) {
        const deleteId = e.target.id;
        const arrayToPush = []
        TodoItems.forEach(item => {
            if (item.id !== deleteId) {
                arrayToPush.push(item)
            }
        })
        setTodoItems(arrayToPush)
        showDeleteModal()
    }

    return (<>
        <div className="flex flex-col max-w-3xl m-auto mt-5 gap-4 px-5 mb-5">
            <div className="flex justify-between">
                <h1 className="font-bold text-4xl">To-do List</h1>
                <button onClick={addTaskOverlay} className="flex items-center justify-center gap-5 bg-[#713fff] rounded-2xl">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.99327 0.883379C7.93551 0.38604 7.51284 0 7 0C6.44772 0 6 0.447715 6 1V6H1L0.883379 6.00673C0.38604 6.06449 0 6.48716 0 7C0 7.55228 0.447715 8 1 8H6V13L6.00673 13.1166C6.06449 13.614 6.48716 14 7 14C7.55228 14 8 13.5523 8 13V8H13L13.1166 7.99327C13.614 7.93551 14 7.51284 14 7C14 6.44772 13.5523 6 13 6H8V1L7.99327 0.883379Z" fill="white"></path></svg>
                    <span>Add Task</span>
                </button>
            </div>
            <div className="flex flex-col justify-between gap-4">
                {TodoItems.map(item => {
                    if (item !== null) {
                        return (
                            <div itemID={item.id} key={item.key} className="grid min-[600px]:grid-cols-6 max-[600px]:grid-rows-5 max-[600px]:gap-[11px] bg-white text-black p-5 rounded-3xl">
                                <div className="flex justify-start w-[100%] items-start flex-col min-[600px]:col-span-2">
                                    <p className="text-[#91929e]">Task</p>
                                    <p>{item.task}</p>
                                </div>
                                <div className="flex justify-center w-[100%] items-start flex-col">
                                    <p className="text-[#91929e]">Priority</p>
                                    <p className={"font-bold " + (item.priority === "Medium" ? "text-[#ffbd21]" : (item.priority === "Low" ? "text-[#0ac947]" : "text-[#f73446]"))}>{item.priority}</p>
                                </div>
                                <div className="flex justify-center w-[100%] items-center max-[600px]:items-start flex-col">
                                    <button className={"bg-[hsla(217,9%,53%,.14)] p-2 text-[#7d8592] text-[12px]"} id={item.id} onClick={updateProgress}>{item.progress === "Not Started" ? "To Do" : (item.progress === "In Progress" ? "In Progress" : "Done")}</button>
                                </div>
                                <div className="flex justify-center w-[100%] items-center max-[600px]:items-start flex-col">
                                    <svg className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24"><circle className="fill-none stroke-[#e5e6e9]" cx="12" cy="12" r="11" strokeWidth="2px"></circle><circle className="stroke-linecap-round fill-none stroke-[#713fff] transition-all duration-500 ease-linear" cx="12" cy="12" r="11" strokeWidth="2px" transform="rotate(-90 12 12)" style={{ strokeDasharray: 69.115, strokeDashoffset: item.progress === "Not Started" ? "69.115" : (item.progress === "In Progress" ? "34.5575" : "0") }}></circle></svg>
                                </div>
                                <div className="flex justify-center w-[100%] items-center max-[600px]:justify-start gap-2">
                                    <svg onClick={() => { showEditModal(item.id) }} className="cursor-pointer" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.8787 0.87868L6.29289 9.46447C6.10536 9.652 6 9.90636 6 10.1716V14.1716C6 14.7239 6.44772 15.1716 7 15.1716H11C11.2652 15.1716 11.5196 15.0662 11.7071 14.8787L20.2929 6.29289C21.4645 5.12132 21.4645 3.22183 20.2929 2.05025L19.1213 0.87868C17.9497 -0.292893 16.0503 -0.292893 14.8787 0.87868ZM18.8787 3.46447L18.9619 3.55867C19.2669 3.95096 19.2392 4.5182 18.8787 4.87868L10.584 13.1716H8V10.5856L16.2929 2.29289C16.6834 1.90237 17.3166 1.90237 17.7071 2.29289L18.8787 3.46447ZM10.0308 2.17157C10.0308 1.61929 9.5831 1.17157 9.03081 1.17157H5L4.78311 1.17619C2.12231 1.28975 0 3.48282 0 6.17157V16.1716L0.00461951 16.3885C0.118182 19.0493 2.31125 21.1716 5 21.1716H15L15.2169 21.167C17.8777 21.0534 20 18.8603 20 16.1716V11.2533L19.9933 11.1366C19.9355 10.6393 19.5128 10.2533 19 10.2533C18.4477 10.2533 18 10.701 18 11.2533V16.1716L17.9949 16.3478C17.9037 17.9227 16.5977 19.1716 15 19.1716H5L4.82373 19.1665C3.24892 19.0752 2 17.7693 2 16.1716V6.17157L2.00509 5.9953C2.09634 4.42049 3.40232 3.17157 5 3.17157H9.03081L9.14743 3.16485C9.64477 3.10708 10.0308 2.68441 10.0308 2.17157Z" fill="#0A1629"></path></svg>
                                    <svg onClick={() => { showDeleteModal(item.id) }} className="cursor-pointer" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 0C13.5977 0 14.9037 1.24892 14.9949 2.82373L15 3V4H17H19C19.5523 4 20 4.44772 20 5C20 5.51284 19.614 5.93551 19.1166 5.99327L19 6H18V19C18 20.5977 16.7511 21.9037 15.1763 21.9949L15 22H5C3.40232 22 2.09634 20.7511 2.00509 19.1763L2 19V6H1C0.447715 6 0 5.55228 0 5C0 4.48716 0.38604 4.06449 0.883379 4.00673L1 4H3H5V3C5 1.40232 6.24892 0.0963391 7.82373 0.00509269L8 0H12ZM4 6V19C4 19.5128 4.38604 19.9355 4.88338 19.9933L5 20H15C15.5128 20 15.9355 19.614 15.9933 19.1166L16 19V6H14H6H4ZM13 4H7V3L7.00673 2.88338C7.06449 2.38604 7.48716 2 8 2H12L12.1166 2.00673C12.614 2.06449 13 2.48716 13 3V4ZM8 9C8.51284 9 8.93551 9.38604 8.99327 9.88338L9 10V16C9 16.5523 8.55229 17 8 17C7.48716 17 7.06449 16.614 7.00673 16.1166L7 16V10C7 9.44771 7.44772 9 8 9ZM12.9933 9.88338C12.9355 9.38604 12.5128 9 12 9C11.4477 9 11 9.44771 11 10V16L11.0067 16.1166C11.0645 16.614 11.4872 17 12 17C12.5523 17 13 16.5523 13 16V10L12.9933 9.88338Z" fill="#F65160"></path></svg>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            {addTask && <div className="absolute flex top-0 left-0 h-full w-full justify-center items-center">
                <div className="absolute top-0 left-0 h-full w-full bg-black opacity-[.3]"></div>
                <div className="text-black bg-white relative p-5 rounded-2xl w-[70%] text-center max-w-[400px] z-10">
                    <div className="flex flex-col gap-[20px]">
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold">Add Task</h2>
                            <svg onClick={addTaskOverlay} className="cursor-pointer" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16.0456 0.716817C15.603 0.302896 14.9103 0.302151 14.4668 0.715119L8.49994 6.27064L2.53309 0.715122C2.08954 0.302153 1.39691 0.302898 0.954273 0.716819L0.898833 0.768663C0.41891 1.21745 0.419741 1.97264 0.900651 2.4204L6.76795 7.88323L0.900653 13.3461C0.419743 13.7938 0.418912 14.549 0.898835 14.9978L0.954275 15.0496C1.39691 15.4636 2.08955 15.4643 2.53309 15.0513L8.49994 9.49582L14.4668 15.0513C14.9103 15.4643 15.603 15.4636 16.0456 15.0496L16.101 14.9978C16.581 14.549 16.5801 13.7938 16.0992 13.3461L10.2319 7.88323L16.0992 2.4204C16.5801 1.97264 16.581 1.21745 16.101 0.768661L16.0456 0.716817Z" fill="#0A1629"></path></svg>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <p className="text-[#91929e] font-bold">Task</p>
                            <input className="bg-white text-[#7d8592] text-[14px] border border-[#d8e0f0] p-[15px] w-full rounded-2xl focus:outline-none" type="text" value={addTaskTodo} onChange={(e) => { setAddTaskTodo(e.target.value) }} placeholder="Type Your Task Here" />
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <p className="text-[#91929e] font-bold">Priotity</p>
                            <div>
                                <button className={"text-[#f73446] border border-[#f73446] mx-1 py-2 text-center " + (addTaskPriority === "High" ? "bg-[#f73446] text-white" : "bg-transparent")} onClick={() => { setAddTaskPriority("High") }}>High</button>
                                <button className={"text-[#ffbd21] border border-[#ffbd21] mx-1 py-2 text-center " + (addTaskPriority === "Medium" ? "bg-[#ffbd21] text-white" : "bg-transparent")} onClick={() => { setAddTaskPriority("Medium") }}>Medium</button>
                                <button className={"text-[#0ac947] border border-[#0ac947] mx-1 py-2 text-center " + (addTaskPriority === "Low" ? "bg-[#0ac947] text-white" : "bg-transparent")} onClick={() => { setAddTaskPriority("Low") }}>Low</button>
                            </div>
                        </div>
                        <div className="flex justify-end items-center">
                            <button className="bg-[#713fff] text-white" onClick={addTaskFunc}>Add</button>
                        </div>
                    </div>
                </div>
            </div>}
            {deleteTodo &&
                <div className="absolute flex top-0 left-0 h-full w-full justify-center items-center">
                    <div className="absolute top-0 left-0 h-full w-full bg-black opacity-[.3]"></div>
                    <div className="text-black bg-white relative p-5 rounded-2xl w-[70%] text-center max-w-[400px] z-10">
                        <div className="flex flex-col gap-[20px]">
                            <p className="text-[20px]">Are you sure you want to delete this task?</p>
                            <div>
                                <button className="bg-[#713fff] text-white mx-1" id={deleteTodoId} onClick={deleteTodoTask}>Delete</button>
                                <button className="text-[#7d8592] border border-[#d8e0f0] bg-transparent mx-1" onClick={showDeleteModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>}
            {editTodo &&
                <div className="absolute flex top-0 left-0 h-full w-full justify-center items-center">
                    <div className="absolute top-0 left-0 h-full w-full bg-black opacity-[.3]"></div>
                    <div className="text-black bg-white relative p-5 rounded-2xl w-[70%] text-center max-w-[400px] z-10">
                        <div className="flex flex-col gap-[20px]">
                            <div className="flex items-center justify-between">
                                <h2 className="font-bold">Edit Task</h2>
                                <svg onClick={showEditModal} className="cursor-pointer" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16.0456 0.716817C15.603 0.302896 14.9103 0.302151 14.4668 0.715119L8.49994 6.27064L2.53309 0.715122C2.08954 0.302153 1.39691 0.302898 0.954273 0.716819L0.898833 0.768663C0.41891 1.21745 0.419741 1.97264 0.900651 2.4204L6.76795 7.88323L0.900653 13.3461C0.419743 13.7938 0.418912 14.549 0.898835 14.9978L0.954275 15.0496C1.39691 15.4636 2.08955 15.4643 2.53309 15.0513L8.49994 9.49582L14.4668 15.0513C14.9103 15.4643 15.603 15.4636 16.0456 15.0496L16.101 14.9978C16.581 14.549 16.5801 13.7938 16.0992 13.3461L10.2319 7.88323L16.0992 2.4204C16.5801 1.97264 16.581 1.21745 16.101 0.768661L16.0456 0.716817Z" fill="#0A1629"></path></svg>
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <p className="text-[#91929e] font-bold">Task</p>
                                <input className="bg-white text-[#7d8592] text-[14px] border border-[#d8e0f0] p-[15px] w-full rounded-2xl focus:outline-none" type="text" value={editTaskTodo} onChange={(e) => { setEditTaskTodo(e.target.value) }} placeholder="Type Your Task Here" />
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <p className="text-[#91929e] font-bold">Priotity</p>
                                <div>
                                    <button className={"text-[#f73446] border border-[#f73446] mx-1 py-2 text-center " + (editPriorityTodo === "High" ? "bg-[#f73446] text-white" : "bg-transparent")} onClick={() => { setEditPriorityTodo("High") }}>High</button>
                                    <button className={"text-[#ffbd21] border border-[#ffbd21] mx-1 py-2 text-center " + (editPriorityTodo === "Medium" ? "bg-[#ffbd21] text-white" : "bg-transparent")} onClick={() => { setEditPriorityTodo("Medium") }}>Medium</button>
                                    <button className={"text-[#0ac947] border border-[#0ac947] mx-1 py-2 text-center " + (editPriorityTodo === "Low" ? "bg-[#0ac947] text-white" : "bg-transparent")} onClick={() => { setEditPriorityTodo("Low") }}>Low</button>
                                </div>
                            </div>
                            <div className="flex justify-end items-center">
                                <button id={editTodoId} className="bg-[#713fff] text-white" onClick={editTodoTask}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    </>)
}