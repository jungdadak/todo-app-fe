import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, deleteItem, toggleComplete }) => {
	return (
		<Row>
			<Col xs={12}>
				<div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
					<div className="todo-content">{item.task}</div>
					<div>by {item.author.name}</div>
					<div>
						<button
							className="button-delete p-2"
							onClick={() => deleteItem(item._id)}
						>
							삭제
						</button>
						<button
							className={`p-2 rounded-lg transition 
        ${
									item.isComplete
										? "bg-blue-500 text-white mr-2 hover:bg-blue-600"
										: "bg-yellow-300 text-black mr-2 hover:bg-yellow-400"
								}`}
							onClick={() => toggleComplete(item._id)}
						>
							{item.isComplete ? `굳.` : `빨리하셈`}
						</button>
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default TodoItem;
