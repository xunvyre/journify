async function createJournalHandler(event)
{
    event.preventDefault();

    const title = document.querySelector(`input[name="title"]`).value;
    const entry = document.querySelector(`textarea[name="entry"]`).value;
    //get journal image(s) here

    const response = await fetch('/api/journals',
    {
        method: 'post',
        body: JSON.stringify({title, entry}),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok)
    {
        document.location.replace('/');
    }
    else
    {
        alert(response.statusText);
    }
};

document.querySelector('.new-journal').addEventListener('submit', createJournalHandler);