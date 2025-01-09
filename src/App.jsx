import {useState} from "react";


function App() {
    const [todos, setTodos] = useState([
        // {id: 1, text: "manger", checked: false},
        // {id: 2, text: "dormir", checked: false}
    ]);

    // On applique l'élément entré en fonction de son état (Ajouter ou modifier)
    const onAction = async (formData) => {
        const todoText = formData.get("todo");
        if (isAnyChecked){
            const checkedTodo = todos.find(todo => todo.checked);
            updateTodo(checkedTodo.id, {text: todoText});
        }else{
            createTodo(todoText);
        }
    };

    // On crée une nouvelle entrée dans la liste
    const createTodo = (text) => {
        setTodos([...todos, {
            id: Date.now(),
            text: text,
            checked: false
        }])
    }

    // On modifie l'élément coché
    const updateTodo = (id, newTodo) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        ...newTodo,
                    };
                }
                return todo;
            }))
    };

    // On supprime l'élément cible de la liste
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // On change l'état du bouton pour comprendre qu'on ajoute ou qu'on modifie un élément de la liste
    const isAnyChecked = todos.some(todo => todo.checked);
    let buttonValue = isAnyChecked ? "Modifier" : "Ajouter";
    let buttonStyle = isAnyChecked ? "border-2 rounded-md px-2 py-3 bg-yellow-500 text-white" : "border-2 rounded-md px-2 py-3 bg-zinc-700 text-white";

    // On vérifie qu'un autre checkbox n'est pas déjà coché, sinon on décoche l'autre
    const handleCheckboxChange = (id) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, checked: true };
            }
            return { ...todo, checked: false };
        }));
    };

    return (
        <>
            <div className={"p-4 flex flex-col gap-4"}>
                <form
                    action={onAction}
                    className={"flex items-center gap-2 bg-amber-50"}>
                    <input name="todo" className={"border rounded-md px-2 py-3 flex-1 mr-2"}/>
                    <button type="submit" className={buttonStyle}>
                        {buttonValue}
                    </button>
                </form>
                <ul className={'flex flex-col gap-1'}>
                    {todos.map((todo) => (
                        <li key={todo.id} className={'bg-zinc-200 gap-4 mb-2 p-2 items-center flex'}>
                            <input type="checkbox"
                                   checked={todo.checked}
                                   onChange={() => handleCheckboxChange(todo.id)}
                            />
                            <span className={'flex-1'}>{todo.text}</span>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className={'border rounded-md p-1 border-black text-xs hover:bg-green-200'}>🗑
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default App
