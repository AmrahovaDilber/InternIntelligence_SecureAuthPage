import { useState, useEffect } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useMainContext } from "../context/MainContext";
import { toast } from "react-toastify";

interface TaskProps {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
  priority: string;
  dueDate: string;
}

const TaskManagement = () => {
  const { currentUser } = useMainContext();
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priority, setPriority] = useState("Low");
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      if (currentUser) {
        const q = query(
          collection(db, "tasks"),
          where("userId", "==", currentUser.uid)
        );
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
    // Trim input and validate
    const trimmedTaskInput = taskInput.trim();
    
    if (!trimmedTaskInput) {
      toast.error("Task cannot be empty");
      return;
    }
  
    if (!currentUser) {
      toast.error("You must be logged in to add tasks");
      return;
    }
  
    try {
      const newTask: Omit<TaskProps, 'id'> = {
        text: trimmedTaskInput,
        completed: false,
        userId: currentUser.uid,
        priority,
        dueDate: new Date().toISOString(),
      };
  

      const docRef = await addDoc(collection(db, "tasks"), newTask);
  
      
      const completeNewTask: TaskProps = {
        ...newTask,
        id: docRef.id
      };
  
      
      setTasks(prevTasks => [...prevTasks, completeNewTask]);
      

      setTaskInput("");
      setPriority("Low");

      toast.success(`Task "${trimmedTaskInput}" added successfully!`);
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again.");
    }
  };
  const deleteTask = async (id: string, text: string) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success(`Task "${text}" deleted!`);
  };

  const toggleTaskCompletion = async (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      await updateDoc(doc(db, "tasks", id), { completed: updatedTask.completed });
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    }
  };

  const editTask = async (id: string) => {
    if (editInput.trim()) {
      await updateDoc(doc(db, "tasks", id), { text: editInput });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: editInput } : task
        )
      );
      setEditingTask(null);
      toast.success(`Task "${editInput}" updated!`);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedCount = tasks.filter((task) => task.completed).length;
  const progress =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
<div className="max-w-[100%] md:max-w-[1000px] mx-auto bg-white dark:bg-[#1e1e1e] shadow-lg rounded-lg p-4 md:p-6">
  <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
    Task Management
  </h1>
  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
    <input
      type="text"
      placeholder="Search tasks"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="max-w-full md:flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-200"
    />
  </div>
  <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-6">
    <textarea
      placeholder="Enter a new task"
      value={taskInput}
      onChange={(e) => setTaskInput(e.target.value)}
      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-200 resize-none  h-auto min-h-[40px] max-h-[200px]"
    />
    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-200"
    >
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    <button
      onClick={addTask}
      className="px-4 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700"
    >
      Add
    </button>
  </div>
  <p className="text-gray-800 dark:text-gray-200 mb-4">
    Progress: {progress}% completed
  </p>
  <ul className="space-y-3">
  {filteredTasks.length > 0 ? (
    filteredTasks.map((task) => (
      <li
  key={task.id}
  className={`flex max-w-full px-2 py-1 flex-col  items-center p-4 rounded-lg space-y-3 md:space-y-0 ${
    task.completed
      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
      : "bg-gray-100 dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200"
  }`}
>
  {editingTask === task.id ? (
    <input
      type="text"
      value={editInput}
      onChange={(e) => setEditInput(e.target.value)}
      className="w-full px-2 py-1 border rounded-lg dark:bg-[#2a2a2a] dark:text-gray-200"
    />
  ) : (
    <span
      className={`flex-1 text-center md:text-left max-w-full break-words ${
        task.completed ? "line-through" : ""
      }`}
    >
      {task.text} - <span className="font-bold">{task.priority}</span>
    </span>
  )}

  <div className="flex items-center justify-center md:justify-start space-x-3">
    {editingTask === task.id ? (
      <button
        onClick={() => editTask(task.id)}
        className="text-blue-500 hover:text-blue-600"
      >
        Save
      </button>
    ) : (
      <button
        onClick={() => {
          setEditingTask(task.id);
          setEditInput(task.text);
        }}
        className="text-yellow-500 hover:text-yellow-600"
      >
        <FiEdit2 size={20} />
      </button>
    )}
    
    <div className="flex space-x-3">
      <button
        onClick={() => toggleTaskCompletion(task.id)}
        className="text-green-500 dark:text-green-400 hover:text-green-600"
      >
        <AiOutlineCheckCircle size={20} />
      </button>
      <button
        onClick={() => deleteTask(task.id, task.text)}
        className="text-red-500 dark:text-red-400 hover:text-red-600"
      >
        <FiTrash2 size={20} />
      </button>
    </div>
  </div>
</li>

    ))
  ) : (
    <p className="text-center text-gray-500 dark:text-gray-400">
      No tasks found.
    </p>
  )}
</ul>


</div>

  );
};

export default TaskManagement;
