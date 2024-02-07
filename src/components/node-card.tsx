export function NoteCard() {
    return (
        <button className='rounded-md text-left bg-slate-800 p-5 space-y-3 overflow-hidden outline-none relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-green-400'>
          <span className='text-sm font-medium text-slate-300'>
          há 8 dias
          </span>
          <p className='text-md leading-6 text-slate-400'>
            Na aplicação React vamos criar um projeto que permite o usuário salvar notas em texto ou áudio.
          </p>

          <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'/>
        </button>
    )
}