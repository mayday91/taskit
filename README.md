# Task.it
Project 2 App

////////////// Using ///////////////
- Bootstrap
- mongoose
- connect-mongo
- dotenv
- express
- express-sesson
- liquidjs
- liquid-express-views
- method-override
- bcryptjs
- node-fetch
- morgan


////////////// User Stories ///////////////

As a user I would like to:

- On main page
    - view all notes
        - search notes by querying for specific string
        - be able to click on individual notes to view, edit or delete
    - have navbar with drop down menu
        - create account
            - require that username is unique
            - require password
            - return user to index page to start creating notes
        - log in
            - query for single username
            - query for single password
            - return user to index page with all notes
        - log out
        - create new note
            - use checkboxes or numbered list ??
        - back to index of all notes

- On show page
    - view individual note
    - view what time the note was created
    - view if the note was edited and if so the time
    - edit that note
    - delete that note
    - favorites/star button ?? (similar to ripe on fruits crud?)
    - reminders/alarm that goes off at specified time


- Ideas for future versions:
    - text/email reminder option for notes
    - separate notes so user can only see their own
    - allow users to share notes with other users


![ERD](wireframes/ERD.jpg)
![Models](wireframes/models.jpg)
![MVCandSchema](wireframes/MVCandSchema.jpg)
![CreateAccount](wireframes/P2createaccount.jpg)
![LoginAccount](wireframes/P2loginaccount.jpg)
![Logout](wireframes/P2logout.jpg)
![Navbar](wireframes/P2navbar.jpg)
![NotesIndex](wireframes/P2notesindex.jpg)
![NotesShow](wireframes/P2showpage.jpg)
