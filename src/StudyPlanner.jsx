import React, { useState } from 'react';
import './StudyPlanner.css';

const SUBJECT = ["OS", "CN", "DBMS", "DAA"];

function Form({ addItems }) {
    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [time, setTime] = useState("");
    
    function handleSubmit(event) {
        event.preventDefault();
        let obj = {
            subject: subject,
            topic: topic,
            time: time
        };
        addItems(obj);
        setSubject("");
        setTopic("");
        setTime("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>STUDY PLANNER</legend>
                <label> SUBJECT</label>
                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                >
                    <option value="others">default</option>
                    {
                        SUBJECT.map((value, index) => {
                            return <option key={index} value={value}>{value}</option>;
                        })
                    }
                </select>
                <label>TOPIC</label>
                <input
                    type="text"
                    placeholder='Enter topics to be covered'
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                />
                <label>COMPLETE WITHIN</label>
                <input
                    type="text"
                    placeholder='Enter time to be taken '
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
                <button type='submit'>Submit</button>
            </fieldset>
        </form>
    );
}

function Card({ index, data, deleteItems, editItems }) {
    function handleEdit() {
        let topic = prompt("Enter topic");
        let time = prompt("Enter time taken to complete task");
        if (
            topic.trim() !== '' &&
            time.trim() !== ''
        ) {
            let tempObj = { ...data, topic, time };
            editItems(tempObj, index);
        } else {
            alert("Empty value cannot be updated");
        }
    }

    return (
        <div className="card">
            <ul>
                <li>
                    <strong>Subject:</strong> {data.subject}
                </li>
                <li>
                    <strong>Topics:</strong> {data.topic}
                </li>
                <li>
                    <strong>Time taken:</strong> {data.time}
                </li>
            </ul>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => deleteItems(index)}>Delete</button>
        </div>
    );
}

function StudyPlanner() {
    const [arr, setArr] = useState([]);
    
    function handleAddItems(newData) {
        setArr([...arr, newData]);
    }
    
    function handleDeleteItems(idx) {
        let result_arr = arr.filter((value, index) => index !== idx);
        setArr(result_arr);
    }
    
    function handleEditItems(newData, idx) {
        arr[idx] = newData;
        setArr([...arr]);
    }
    
    return (
        <div className="container">
            <Form addItems={handleAddItems} />
            <div>
                {arr.map((value, index) => (
                    <Card
                        key={index}
                        index={index}
                        data={value}
                        deleteItems={handleDeleteItems}
                        editItems={handleEditItems}
                    />
                ))}
            </div>
        </div>
    );
}

export default StudyPlanner;
