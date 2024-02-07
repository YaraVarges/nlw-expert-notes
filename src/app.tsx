import logo from './assets/logonlw.svg'
import { NoteCard } from './components/node-card'
import { NewNoteCard } from './components/new-node-card'

export function App() {

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
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </div>
      
    </div>
    
    
  )

}

