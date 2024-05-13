import api from "../api";
// import {useEffect, useState} from "react";

function NoteForm(props) {

    var title = props.controlValue.title;
    var content = props.controlValue.content;
    var activateId = props.controlValue.activateId;
    
    var setContent = props.controlFunc.setContent;
    var setTitle = props.controlFunc.setTitle;
    var setActivateId = props.controlFunc.setActivateId;

    // const [content, setContent] = useState("");
    // const [title, setTitle] = useState("");

    const createNote = (e) => {
        e.preventDefault();
        if (! activateId){
            api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201){
                    alert("Note created!");
                    setTitle("");
                    setContent("");
                } 
                else{
                    alert("Failed to make note.");
                } 
                props.updateFunc();
            })
            .catch((err) => {
                alert(err);
                console.log(err);
            });
        }
        else{
            api
            .put(`/api/notes/${activateId}/`, {content, title, 'id':activateId })
            .then((res) => {
                if (res.status === 200){
                    alert("Note Update!");
                    setTitle("");
                    setContent("");
                } 
                else{
                    alert("Failed to edit note.");
                } 
                props.updateFunc();
            })
            .catch((err) => {
                // alert(err);
                alert("Note already deleted.");
                // console.log(err);
            });
        }
        setActivateId(null);
    };

    return(
    <div>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <br />
            <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label htmlFor="content">Content:</label>
            <br />
            <textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br />

            {/* the value here choose the button text */}
            <input type="submit" value="Submit"></input>
        </form>
    </div>)
};

export default NoteForm