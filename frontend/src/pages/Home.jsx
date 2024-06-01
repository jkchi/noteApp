import { useState, useEffect } from "react";
import api from "../api";
import { Navbar, Nav, Container,Row,Col ,ListGroup,Button } from 'react-bootstrap';
import logoImage from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/Home.css"
import NoteForm from "../components/NoteForm";
import { useLike } from "../components/IsLike";
import { Tree } from 'antd';

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [activateId,setActivateId] = useState(null);
    const {isLike, setIsLike} = useLike();

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (e,id) => {
        e.preventDefault(); 
        api
            .delete(`/api/notes/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const getNoteDetail = (e,id) => {
        e.preventDefault(); 
        api
            .get(`/api/notes/${id}/`)
            .then((res) => res.data)
            .then((data) => {
                setTitle(data.title);
                setContent(data.content);
                setActivateId(data.id);
                setIsLike(data.is_like);
            })
            .catch((err) => alert(err));
    };


    const treeData = [
            {
              title: 'parent 1-0',
              key: '0-0-0',
              children: [{title: 'children 1-1',
              key: '0-1-1',
                }]
            }
    ];


    return (
        <div>
            
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="https://www.youtube.com/watch?v=Jrg9KxGNeJY">
                        <img
                            src={logoImage}
                            className="my-logo" 
                            alt="Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" className = "nav-font" >Home</Nav.Link>
                            <Nav.Link href="logout" className = "nav-font">Log Out</Nav.Link>
                            <Nav.Link onClick={() =>{
                                setActivateId(null);
                                setContent("");
                                setTitle("");
                                setIsLike(false);
                            }} className = "nav-font">Create Mode</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Row>
                    <Col sm={3} className="note-col">
                        <h2>Created Notes</h2>

                        <ListGroup>
                            {notes.map((note) => {
                                const formattedDate = new Date(note.create_at).toLocaleDateString("en-US");
                                return (
                                    <ListGroup.Item action note={note}  key={note.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                                        <div onClick={(e) => getNoteDetail(e,note.id)}> 
                                            Title: {note.title}
                                            <br />
                                            {`Create at ${formattedDate}`}
                                        </div>
                                        
                                        <Button  variant="danger"  onClick={(e) => deleteNote(e,note.id)}> Delete </Button>
                                    </ListGroup.Item>
                                    );
                            })}
                        </ListGroup>
                        
                    </Col>
                    <Col sm={9} className="note-col">
                        {activateId !== null
                            ? <h2>Edit Note</h2>
                            : <h2>Create Note</h2>
                        }
                        <NoteForm
                            controlValue =  {{title, content,activateId}}
                            controlFunc = {{setContent, setTitle,setActivateId}} 
                            updateFunc = {getNotes}>
                        </NoteForm>
                    </Col>
                </Row>
            </Container>
            <Tree
            treeData={treeData}
            />
        </div>
    );
}

export default Home;