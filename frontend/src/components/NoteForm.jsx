import api from "../api";
import StarButton from "./StarButton";
import "../styles/TitleButton.css";
import { useLike } from "./IsLike";

function NoteForm(props) {
  const { title, content, activateId } = props.controlValue;
  const { setContent, setTitle, setActivateId } = props.controlFunc;
  const {isLike, setIsLike} = useLike();

  const createNote = (e) => {
    e.preventDefault();
    if (!activateId) {
      api
        .post("/api/notes/", { content, title,"is_like":isLike })
        .then((res) => {
          if (res.status === 201) {
            alert("Note created!");
            setTitle("");
            setContent("");
            setIsLike(false);
          } else {
            alert("Failed to make note.");
          }
          props.updateFunc();
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    } else {
      api
        .put(`/api/notes/${activateId}/`, { content, title, id: activateId,"is_like":isLike })
        .then((res) => {
          if (res.status === 200) {
            alert("Note Update!");
            setTitle("");
            setContent("");
            setIsLike(false);
          } else {
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

  const handleLike = () => {
    if (isLike){
      setIsLike(false);
    }
    else{
      setIsLike(true);
    }
    console.log(isLike);
  };

  return (
    <div>
      <form onSubmit={createNote}>
        <div className="flex-container">
          <label htmlFor="title">Title:</label>
          <StarButton onSubmit = {handleLike}/>
        </div>

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
    </div>
  );
}

export default NoteForm;
