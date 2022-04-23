/* 
DESCRIZIONE:
## Istruzioni
Create una todo list usando VueJS.
Potete dare sfogo alla creativitá per quanto riguarda l'HTML e il CSS.
Se non sapere che fare, di seguito trovate uno screenshot.
Funzionalitá:
- La nostra todo list avrá alcune tasks di default predefinite
- L'utente puó inserire nuove tasks
- Cliccando sulla "X" l'utente puó cancellare una task
- Se non ci sono piu task nella lista, mostrate un messaggio tipo "Nulla da fare"
- L'utente vuole poter indicare che la task é stata completata (con un icona cliccabile)
Quando l'utente inserisce una task ha due modi per salvarla: 
o preme il pulsante add o preme il taso Enter della tastiera.
Attenzione: l'utente non deve inserire tasks vuote ma almeno un tot di caratteri.
Da tenere a mente:
Ricordate di scrivere le istruzioni prima di iniziare a lavorare 
cercate di descrivere in modo sintetico gli step che pensate siano necessari.
Consultate la documentazione e se siete bloccati, aprite un ticket.
## Bonus-extra (opzionale)
- Quando una task é stata completa allora l'utente vuole che venga inserita 
  in un'altra colonna tipo "tasks completate"
- se una task é stata marcata come completa per 
  sbaglio allora vuole poterla rimettere nella todo list (cliccando su un altra icona)
- ah non é finita, dice che quando cancella una task non vuole 
  che questa venga subito rimossa, 
  ma vuole che resti visibile e venga spostata in una colonna tipo "cestino"
- si, l'utente é un rompi scatole, dice infine che vuole poter rimuovere tutte 
  le tasks nel cestino cliccando su un pulsante tipo "svuota cestino"
Il nostro utente per ora sembra non avere altre richieste ...
ma chissá se dopo gli viene in mente che vuole anche poter rimettere 
una task cancellata nella lista di tasks da fare, magari l'ha cancellata per sbaglio...
Qui sotto alcuni screenshot per farvi vedere il funzionamento dell'app
*/

const app = new Vue(
    {
        el: '#app',
        data: {
            newTask: '',
            isDone: false,
            areDone: false,
            tasks: [
                {
                    text: 'Fare i compiti',
                    done: false,
                },
                {
                    text: 'Fare la spesa',
                    done: true,
                },
                {
                    text: 'Fare il bucato',
                    done: false,
                },
                {
                    text: 'Preparare il pranzo',
                    done: false,
                },
            ],
            tasksTrashed: [
                {
                    text: 'Fare gli auguri di buon compleanno a Paolo',
                    done: false,
                },
            ]
        },
        methods: {
            addTask() {
                if (this.newTask.length > 2 && this.newTask.length < 50 ) {
                    this.newTask = {
                        text: this.newTask,
                        done: false,
                    }
                    this.tasks.unshift(this.newTask)
                    this.newTask = ''
                } else {
                    alert('inserire una stringa di lunghezza compresa tra 3 e 50 caratteri')
                    this.newTask = ''
                }
            },
            modifyTask(i) {
                const newText = prompt('Digita il nuovo testo della task');
                if (newText.length > 2 && newText.length < 50) {
                    this.tasks[i].text = newText;
                    alert(`Task modificata con successo: ${this.tasks[i].text}`)
                } else {
                    alert('inserire una stringa di lunghezza compresa tra 3 e 50 caratteri')
                }
            },
            getToTrashTask(i) {
                // console.log('removing task', i);
                // this.tasks.splice(i, 1)
                // console.log(this.tasks.splice(i, 1)[0]);
                this.tasksTrashed.unshift(this.tasks.splice(i, 1)[0])
                this.isTaskDone()
                this.areAllTasksDone()
            },
            doOrUndo(i) {
                // console.log('doing or undoing');
                this.tasks[i].done = !this.tasks[i].done
                this.isTaskDone()
                this.areAllTasksDone()
            },
            untrashTask(i) {
                this.tasks.push(this.tasksTrashed.splice(i, 1)[0])
                this.isTaskDone()
                this.areAllTasksDone()
            },
            emptyBin() {
                const userAnswer = prompt("Sei sicuro di voler svuotare il cestino? (y/n) Il suo contenuto non potrà essere recuperato");
                if (userAnswer === 'y') {
                    this.tasksTrashed = []                    
                }
            },
            isTaskDone() {
                this.isDone = false
                this.tasks.forEach(task => {
                    if (task.done === true) {
                        this.isDone = true
                    }
                });
            },
            areAllTasksDone() {
                this.areDone = false
                let j = 0
                while (j < this.tasks.length) {
                    const task = this.tasks[j];
                    // console.log(task.done, task.text);
                    if (task.done === true) {
                        this.areDone = true;
                        j++                        
                    } else {
                        this.areDone = false
                        j = this.tasks.length
                    }
                }
            }
        },
        created() {
            this.isTaskDone()
            this.areAllTasksDone()
        }
    }
)