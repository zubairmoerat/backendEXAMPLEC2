import { addFriend, getFriends, editFriend, deleteFriend, getFriend} from "../model/database.js";

export default {
    getMany: async (req, res)=>{
        res.send(await getFriends())
    },
    addOne: async (req, res)=>{
        const {Names, Age} = req.body
        const post = await addFriend(Names, Age)
        res.send(await getFriends())
    },
    getOne: async(req, res)=>{
        res.send(await getFriends(+req.params.id))
    },
    editOne: async(req, res)=>{
        const [friend] = await getFriend(+req.params.id)
        let {Names, Age} = req.body
        Names ? Names = Names : {Names} = friend
        Age ? Age = Age : {Age} = friend
        await editFriend(Names, Age, +req.params.id)
        res.json(await getFriends())
    },
    deleteOne: async (req, res)=>{
        res.send(await deleteFriend(+req.params.id))
    }
}