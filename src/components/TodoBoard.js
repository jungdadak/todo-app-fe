import React from "react";
import TodoItem from "./TodoItem";
const TodoBoard = ({ todoList, deleteItem, toggleComplete }) => {
	return (
		<div className="text-center">
			<h2 className="text-white my-10 text-xl font-bold">
				<span className="text-red-500">! </span>할 일 목록
				<span className="text-red-500">! </span>
			</h2>
			{todoList.length > 0 ? (
				todoList.map((item, index) => (
					<TodoItem
						item={item}
						key={index}
						deleteItem={deleteItem}
						toggleComplete={toggleComplete}
					/>
				))
			) : (
				<h2 className="text-red-200 my-[100px]">할일없는백수인가요?</h2>
			)}
			{/* <TodoItem/> will be here once we get the todoList */}
		</div>
	);
};

export default TodoBoard;
