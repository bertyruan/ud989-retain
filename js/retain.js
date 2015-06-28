$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                date: Date()
            });
            view.render();
        },

        getNotes: function(isReverse) {
            if(isReverse)
                return model.getAllNotes().reverse();
            else
                return model.getAllNotes();
        },

        init: function(isReverse) {
            model.init();
            view.init(isReverse);
        }
    };


    var view = {
        init: function(isReverse) {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                //allows you to continuously add data without having to click on the input box. pretty cool I'll say.
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render(isReverse);
        },
        render: function(isReverse){
            var htmlStr = '';
            var reverseIt = $('#reverse');
            reverseIt.click(function(e){
                view.render(!isReverse);
            });
            octopus.getNotes(isReverse).forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content + "<span class='note-date'>" + note.date + "</span>" + '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init(false);
});