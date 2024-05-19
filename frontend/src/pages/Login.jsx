import api from "../api"
import Form from "../components/form"

function Login(){

    // change from the api to auth, after add social login
    return <Form route = "/auth/token/" method= 'login'></Form>
}

export default Login