import logo from './assets/logonlw.svg'
import { NoteCard } from './components/node-card'
import { NewNoteCard } from './components/new-node-card'


export function App() {

  const [ notes, setNotes ] = useState ([
    { id: 1, date: new Date(), content: 'My first note'},
    { id: 2, date: new Date(), content: 'My second note'}, 
    { id: 3, date: new Date(), content: 'My thirty note'},
  ])

  return (
    
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt='NLW Expert Logo'/>

      <form className='w-full' action="">
        <input 
          type="text" 
          placeholder='Busque suas notas aqui'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'/>
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-3 gap-6 auto-rows-[250px]'> 
        <NewNoteCard />
        
        {notes.map(note => {
          return (
            <NoteCard key={note.id} note={note} />
        })}

      </div>
      
    </div>
    
    
  )

}

