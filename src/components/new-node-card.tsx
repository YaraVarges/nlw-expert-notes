import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import {  ChangeEvent, useState, FormEvent } from 'react'
import {toast} from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null;

export function NewNoteCard( {onNoteCreated}: NewNoteCardProps) {

    const [shouldShowOmboarding, setShouldShowOmboarding] = useState(true)
    const [content, setContent] = useState("")
    const [isRecording, setIsRecording] = useState(false)
    

    function handleStartEditor() {
      setShouldShowOmboarding(false)
    }

    function handleContentChange (event: ChangeEvent <HTMLTextAreaElement>) {

      setContent(event.target.value)
      if (event.target.value === ''){
        setShouldShowOmboarding(true)
    }}

    function handleSaveNote(event: FormEvent) {
      event.preventDefault();

      //Condição para impedir salvar uma nota vazia ou em branco
      if (content === '') {
        return
      }

      onNoteCreated(content)

      setContent('')

      setShouldShowOmboarding(true)

      toast.success('Nota salva com sucesso!')
    }

    function handleStarRecording () {

      const isSpeechRecognitionAPIAvailable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

      if (!isSpeechRecognitionAPIAvailable) {
        alert("Infelizmente seu navegador não suporta a API de gravação!");
        return;
      }

      setIsRecording(true);
      setShouldShowOmboarding(false);

      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    
      speechRecognition = new SpeechRecognitionAPI()

      speechRecognition.lang = 'pt-BR'
      speechRecognition.continuous = true
      speechRecognition.maxAlternatives = 1
      //Já tras o conteudo conforme  é falado, e não quando termina de falar
      speechRecognition.interimResults = true

      speechRecognition.onresult = (event) => {
        const transcription = Array.from(event.results).reduce((text, result) => {
          return text.concat(result[0].transcript);
        }, "");
  
        setContent(transcription);
      };
      
      speechRecognition.onerror = (event) => {
        console.error(event)
      }

      speechRecognition.start();
    }

    function handleStopRecording () {
      setIsRecording(false)

      if (speechRecognition != null) {
        speechRecognition.stop()
      }
    }


    return (
      <Dialog.Root>
        <Dialog.Trigger className='rounded-md bg-slate-700 flex flex-col text-left p-5 gap-3 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-green-400 outline-none'>
          <span className='text-sm font-medium text-slate-200'>
            Adicionar uma nota
          </span>
          <p className='text-md leading-6 text-slate-400'>
            Comece <span>gravando uma nota</span> em áudio ou se preferir <span>utilize apenas texto.</span>
          </p>
        </Dialog.Trigger>

 
        <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar uma nota
              </span>

              {shouldShowOmboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button
                    type="button"
                    onClick={handleStarRecording}
                    className="font-medium text-green-400 hover:underline"
                  >
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    type="button"
                    onClick={handleStartEditor}
                    className="font-medium text-green-400 hover:underline"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChange}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando... Clique aqui para parar.
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                className="w-full bg-green-400 py-4 text-center text-sm text-green-950 outline-none font-medium hover:bg-green-500"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
      </Dialog.Root>
        
    )
}