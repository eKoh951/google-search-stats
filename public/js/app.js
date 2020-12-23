const log = console.log

const keywordsForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

msgOne.textContent = ''
msgTwo.textContent = ''

// The argument 'e' stands for event
keywordsForm.addEventListener('submit', async function(e) {
    const $keyWordsForm = $(this);
    let keyWordsArray = $keyWordsForm.serializeArray();
    //Filter only valid data
    keyWordsArray = keyWordsArray.filter( keyWord => keyWord.value !== "" );
    //Modify array to have array of strings instead of objects
    keyWordsArray = keyWordsArray.map( keyWord => keyWord.value );
    console.log({keyWordsArray});
    
    e.preventDefault();
    
    msgOne.textContent = 'Loading data...';
    msgTwo.textContent = '';
    
    //Call to endpoint
    let rawResponse = await fetch('/search', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keywords: keyWordsArray })
    });
    let content = await rawResponse.json();
    let results = content.searchesResult;
    let resultAmount = results.length;
    
    //Sort the data
    inputs = [];
    $('input').each( function(index) { 
        const value = this.value;
        if ( value !== "" ) inputs.push( value )
    });
    inputs.sort()
    $('input').each( function(index) { 
        if ( this.value !== "" ) this.value = inputs[index];
    });

    $('.bar-result').each( function( index ) {
        const $bar = $(this);
        $bar.hide();
        console.log('from bar each', $bar)
        if ( ( index ) < resultAmount ) {
            $bar.removeClass('hidden').text(results[index].value).show();
        }
    });
})