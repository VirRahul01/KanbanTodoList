import React, { useState, useCallback, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import update from "immutability-helper";
import KanbanColumn from "./kanbanColumn";
import KanbanItem from "./kanbanItem";

const tasksList = [
    { _id: 1, title: "Study", status: "backlog" },
    { _id: 2, title: "Study More", status: "backlog" },
    { _id: 3, title: "Get Another Degree", status: "backlog" },
    { _id: 4, title: "Create Github", status: "new" },
    { _id: 5, title: "Upload Code to Github", status: "new" },
    { _id: 6, title: "Debug App", status: "wip" },
    { _id: 7, title: "Change Look And Feel", status: "review" },
    { _id: 8, title: "Use App", status: "review" },
    { _id: 9, title: "Setup Webstorm IDE", status: "done" },
    { _id: 10, title: "Create React App", status: "done" }
];

const channels = ["backlog", "new", "wip", "review", "done"];
const labelsMap = {
    backlog: "Backlog",
    new: "To Do",
    wip: "In Progress",
    review: "Review",
    done: "Done"
};

const classes = {
    board: {
        display: "flex",
        margin: "0 auto",
        width: "90vw",
        fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    },
    column: {
        minWidth: 200,
        width: "18vw",
        height: "80vh",
        margin: "0 auto",
        backgroundColor: "pink"
    },
    columnHead: {
        textAlign: "center",
        padding: 10,
        fontSize: "1.2em",
        backgroundColor: "purple"
    },
    item: {
        padding: 10,
        margin: 10,
        fontSize: "0.8em",
        cursor: "pointer",
        backgroundColor: "green"
    }
};

const Kanban = () => {
    const [tasks, setTaskStatus] = useState(tasksList);

    const changeTaskStatus = useCallback(
        (id, status) => {
            let task = tasks.find(task => task._id === id);
            const taskIndex = tasks.indexOf(task);
            task = { ...task, status };
            let newTasks = update(tasks, {
                [taskIndex]: { $set: task }
            });
            setTaskStatus(newTasks);
        },
        [tasks]
    );

    return (
        <main>
            <header> Rahul's To-Do Kanban </header>
            <DndProvider backend={HTML5Backend}>
                <section style={classes.board}>
                    {channels.map(channel => (
                        <KanbanColumn
                            key={channel}
                            status={channel}
                            changeTaskStatus={changeTaskStatus}
                        >
                            <div style={classes.column}>
                                <div style={classes.columnHead}>{labelsMap[channel]}</div>
                                <div>
                                    {tasks
                                        .filter(item => item.status === channel)
                                        .map(item => (
                                            <KanbanItem key={item._id} id={item._id}>
                                                <div style={classes.item}>{item.title}</div>
                                            </KanbanItem>
                                        ))}
                                </div>
                            </div>
                        </KanbanColumn>
                    ))}
                </section>
            </DndProvider>
        </main>
    );
};

export default Kanban;