import usersModel from "./users-model.js"

export const findAllUsers = () => usersModel.find();

export const findUserById = (id) => usersModel.findById(id);

export const findUserByUsername = async (username) => {
    const user = await usersModel.findOne({ username });
    console.log("user in findUserByUsername is", user)
    if (user) {
        return user;
    }
    return null;
};
export const findUserByCredentials = (username, password) => usersModel.findOne({ username, password });

export const createUser = (user) => usersModel.create(user);

export const updateUser = async (username, firstname, lastname) => {
    console.log("username in updateUser is", username, "firstname is", firstname, "lastname is", lastname)
    await usersModel.findOneAndUpdate({ username }, { firstName: firstname, lastName: lastname }, { new: true }) 
        .then((user) => {
            console.log("user in updateUser is", user)
            return user;
        })
        .catch((err) => {
            console.log("error in updateUser is", err)
            return null;
        })
};

export const deleteUser = (id) => usersModel.deleteOne({ _id: id })
//export const findAllUsers = () => users;
//export const findUserById = (uid) => {
//    const index = users.findIndex((u) => u._id === uid);
//    if (index !== -1) return users[index];
//    return null;
//};
//export const findUserByUsername = (username) => {
//    const index = users.findIndex((u) => u.username === username);
//    if (index !== -1) return users[index];
//    return null;
//};
//export const findUserByCredentials = (username, password) => {
//    const index = users.findIndex.find((u) => u.username === username && u.password === password);
//    if (index !== -1) return users[index];
//    return null;
//};
//export const createUser = (user) => users.push(user);
//    export const updateUser = (uid, user) => {
//    const index = users.findIndex((u) => u._id === uid);
//    users[index] = { ...users[index], ...user };
//    return {status: 'ok'}
//};
//export const deleteUser = (uid) => {
//    const index = users.findIndex((u) => u._id === uid);
//    users.splice(index, 1);
//    return {status: 'ok'}
//};