import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { db } from "../firebase/firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useMainContext } from "../context/MainContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TaskProps {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
}

const TaskManagement = () => {
  const { currentUser } = useMainContext();
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      if (currentUser) {
        const q = query(collection(db, "tasks"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const userTasks = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as TaskProps[];
        setTasks(userTasks);
      }
    };
    fetchTasks();
  }, [currentUser]);

  const addTask = async () => {
    if (taskInput.trim() && currentUser) {
      const newTask = { id: Date.now().toString(), text: taskInput, completed: false, userId: currentUser.uid };
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      setTasks([...tasks, { ...newTask, id: docRef.id }]);
      toast.success(`Task "${taskInput}" added successfully!`);
      setTaskInput("");
    } else {
      toast.error("Task input cannot be empty!");
    }
  };

  const deleteTask = async (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success(`Task "${task.text}" deleted.`);
    }
  };

  const editTask = async (id: string, newText: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task && newText.trim()) {
      await updateDoc(doc(db, "tasks", id), { text: newText });
      setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
      toast.success(`Task "${newText}" updated!`);
    } else {
      toast.error("Task text cannot be empty!");
    }
  }; 
  
  const toggleTaskCompletion = async (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      await updateDoc(doc(db, "tasks", id), { completed: updatedTask.completed });
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    }
  };

  return (
    <div className="max-w-[600px] mx-auto bg-white dark:bg-[#1e1e1e] shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Task Management
      </h1>
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Enter a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-200"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700"
        >
          Add
        </button>
      </div>
      <ul className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                task.completed
                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                  : "bg-gray-100 dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200"
              }`}
            >
              <span
                className={`flex-1 ${task.completed ? "line-through" : ""}`}
              >
                {task.text}
              </span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="text-green-500 dark:text-green-400 hover:text-green-600"
                >
                  <AiOutlineCheckCircle size={20} />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 dark:text-red-400 hover:text-red-600"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No tasks added yet. Start by adding a task!
          </p>
        )}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default TaskManagement;
