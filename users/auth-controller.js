import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
    const register = async (req, res) => {
        console.log("register function run")
        const user = await usersDao.findUserByUsername(req.body.username);
        console.log("user found is:", user)
        if (user) {
            res.sendStatus(403);
            return;
        }
        let newUser;
        await usersDao.createUser(req.body)
            .then((user) => {
                newUser = user;
            })
            .catch((err) => {
                console.log(err);
            });
        req.session["currentUser"] = newUser;
        res.json(newUser);
    };

    const login = async(req, res) => {
        console.log("login function run")
        const username = req.body.username;
        const password = req.body.password;
        if (username && password){
            const user = await usersDao.findUserByCredentials(username, password);
            if (user) {
                req.session["currentUser"] = user;
                res.json(user);
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    };

    const profile = async(req, res) => {
        console.log("profile function run")
        // get user from mongodb by username
        console.log("username passed to profile function is: " + req.body.username)
        const currentUser = await usersDao.findUserByUsername(req.body.username);
        // const currentUser = req.session["currentUser"];
        console.log("current user is: " + currentUser)
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        res.json(currentUser);
    };

    const getprofile = async(req, res) => {
        console.log("getprofile function run and passed username is: " + req.query.username)
        const currentUser = await usersDao.findUserByUsername(req.query.username);
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        res.json(currentUser);
    };

    const logout = async (req, res) => {
        console.log("logout function run")
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = async(req, res) => {
        console.log("passed to update user in auth controller: " + req.body, req.body.username, req.body.firstName, req.body.lastName);
        // const id = req.params.id;
        const user = await usersDao.updateUser(req.body.username, req.body.firstName, req.body.lastName)
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    };

    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.get("/api/users/profile", getprofile)
    app.post("/api/users/logout", logout);
    app.put("/api/users/update", update);
};
export default AuthController;