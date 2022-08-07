const Note = require('../models/note')

const noteCtrl = {
    getNotes: async (req,res) =>{
        try {
            const notes = await Note.find({user_id: req.user.id})
            res.json(notes)
        }catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createNote: async (req,res) =>{
        try {
            const {title, description} = req.body
            const newNote = new Note({
                title,
                description,
                user_id : req.user.id,
                email : req.user.email
            })
            await newNote.save()

            res.json({msg: "Created a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteNote : async (req,res) => {
        try {
            await Note.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted a Note"}) 
        } catch (err) {
            return res.status(500).json({msg :err.message})
        }         
    },
    updateNote : async (req,res) =>{
        try {
            const {title, description} = req.body
            await Note.findOneAndUpdate({_id: req.params.id},{
                title,
                description
            })
            res.json({msg: "Updated a user"})
        } catch (err) {
            return res.status(500).json({msg :err.message})
        }
    },
    getNote : async (req,res) =>{
        try {
            const note = await Note.findById(req.params.id)
            res.json(note)
        } catch (err) {
            return res.status(500).json({msg :err.message})
        }
    }
}

module.exports = noteCtrl 