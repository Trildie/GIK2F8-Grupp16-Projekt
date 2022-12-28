gameForm.title.addEventListener('keyup', (e)=> validateField(e.target));
gameForm.title.addEventListener('blur',(e)=> validateField(e.target));

gameForm.description.addEventlistener('input',(e)=> validateField(e.target));
gameForm.description.addEventlistener('blur',(e)=> validateField(e.target));

gameForm.dueDate.addEventlistener('input',(e)=> validateField(e.target));
gameForm.dueDate.addEventlistener('blur',(e)=> validateField(e.target));