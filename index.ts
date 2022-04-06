import { generateKey } from 'crypto'
import express from 'express'
import {Request, Response} from 'express'
import { parse } from 'path'

const app = express()

app.use(express.json())

class Note{
    title: string
    content: string
    createDate?: string
    tags?: string[]
    id?: number

    constructor(title: string, content: string, tags: string[], createDate?: string,  id?: number, username?: string) {
        this.title = title
        this.content = content
        this.createDate = createDate
        this.tags = tags
        this.id = id
    }
        
}
const notesArray: Note[] = []

app.get('/', function (req: Request, res: Response) {
  res.send('GET Hello World')
})
app.post('/', function (req: Request, res: Response) {
  console.log(req.body) // e.x. req.body.title 
  res.status(200).send('POST Hello World')
})

app.post('/note', function (req: Request, res: Response){
    const genId = Date.now()
    let note = new Note(req.body.title, req.body.content, req.body.tags, req.body.createDate, genId )
    console.log(req.body)
    notesArray.push(note)

    console.log(genId)
    res.sendStatus(201)
})

app.get('/note/:id', function (req:Request, res: Response){
    const noteId = parseInt(req.params.id, 10)
    const foundNoteIndex = notesArray.findIndex(searchNote)
    
    function searchNote(note: Note) {
        return note.id === noteId
    }
    const foundNote = notesArray[foundNoteIndex]
    
    res.send(foundNote)
    const jsonData = JSON.stringify(Note)
    console.log(noteId)
})

app.get('/notes', function (req:Request, res: Response){
    res.send(

        notesArray.map(note=>
            `<p>${note.title}</p><br>
            <p>${note.id}</p>`)
    )
})

app.put('/notes/:id', function(req:Request, res: Response){
    
})



app.listen(3000)