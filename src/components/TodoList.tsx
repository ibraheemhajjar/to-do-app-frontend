import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { toastifyOptions } from "../constants/toastify";
import { userActions } from "../store/index";
import todoService from "../api/todos/todoService";
import { WebsocketContext } from "../contexts/WebsocketContext";

const TodoList: React.FC = () => {

	const [todoTitleInput, setTodoTitleInput] = useState<string>("");
	const [todoDescriptionInput, setTodoDescriptionInput] =
		useState<string>("");
	const dispatch = useDispatch();
	const todos = useSelector((state: RootState) => state.user.todos);
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);

  const socket = useContext(WebsocketContext)

	useEffect(() => {

    socket.on('connect', () => {
      console.log('Connected to the Gateway!');
    })

    socket.on('refreshTodos', () => {
      console.log('Refreshing Todos');
      fetchTodos();
    })

		const fetchTodos = async () => {
			const response = await todoService.getAllTodos();
			if (response.executedSuccessfully) {
				const sortedTodos = response.data.sort(
					(a: any, b: any) => b.id - a.id
				);
				dispatch(userActions.setUserTodos(sortedTodos));
			}
		};
		fetchTodos();

    return ()=> {
      console.log("Unregistering Events...");
      socket.off('connect')
      socket.off('refreshTodos')
    }
	}, [dispatch, accessToken, socket]);

	const handleCheckboxChange = async (checked: boolean, id: any) => {
		const updatedTodo = await todoService.updateTodo(id, {
			isDone: checked,
		});
		if (updatedTodo.executedSuccessfully) {
			toast.success("Todo updated successfully", {
				...toastifyOptions,
				autoClose: 1500,
			});
      socket.emit('newUpdates');
			dispatch(userActions.updateOneTodo(updatedTodo.data));
		}
	};

	const handleDelete = async (id: any) => {
		const response = await todoService.deleteTodo(id);
		if (response.status === 200) {
			toast.success("Todo deleted successfully", toastifyOptions);
      socket.emit('newUpdates');
			dispatch(userActions.deleteTodo(id));
		}
	};

	const handleAddTodo = async (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
		const todo = {
			title: todoTitleInput,
			description: todoDescriptionInput,
		};
		const createdTodo = await todoService.createTodo(todo);
		if (createdTodo.executedSuccessfully) {
			resetForm();
      socket.emit('newUpdates');
			dispatch(userActions.updateTodos(createdTodo.data));
			toast.success("Todo created successfully", toastifyOptions);
		}
	};

	const resetForm = () => {
		setTodoTitleInput("");
		setTodoDescriptionInput("");
	};

	return (
		<div className="todo-card">
			<div className="sub-container">
				<form className="todo-form">
					<div className="controllers-container">
						<div className="form-group mt-3">
							<input
								value={todoTitleInput}
								placeholder="Todo Title"
								type="text"
								className="form-control mt-1"
								onChange={(event) =>
									setTodoTitleInput(
										event.target.value
									)
								}
								required
							/>
						</div>
						<div className="form-group mt-3">
							<input
								value={todoDescriptionInput}
								placeholder="Todo Description"
								type="text"
								className="form-control mt-1"
								onChange={(event) =>
									setTodoDescriptionInput(
										event.target.value
									)
								}
							/>
						</div>
						<div className="d-grid gap-2 mt-3">
							<button
								onClick={handleAddTodo}
								className="btn btn-primary"
							>
								Add Todo
							</button>
						</div>
					</div>
				</form>
				<div className="todos-container">
					{todos.map((todo) => {
						return (
							<div className="todo-item" key={todo.id}>
								<div>
                  {	!todo.isDone ? <h5 className="todo-title">{todo.title}</h5> : <h5 className="todo-title"><del>{todo.title}</del></h5>}
                  {	!todo.isDone ? <p className="todo-description">{todo.description}</p> : <p className="todo-description"><del>{todo.description}</del></p>}
								</div>
								<div className="checkbox-container">
									<input
										type="checkbox"
										id="todo-done"
										className="form-check-input"
										checked={todo.isDone}
										onChange={(e) => {
											handleCheckboxChange(
												e.target.checked,
												todo.id
											);
										}}
									/>
									<label
										className="form-check-label"
										htmlFor="todo-done"
									>
										Done
									</label>
								</div>
								<button
									onClick={() =>
										handleDelete(todo.id)
									}
									className="btn btn-danger"
								>
									Delete
								</button>
							</div>
						);
					})}
				</div>
				<ToastContainer />
			</div>
		</div>
	);
};

export default TodoList;
