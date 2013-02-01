
### invoke

```javascript

var invoke = require( 'invoke' )

documents.forEach( invoke('setState', 'saved') )
```

### invoke.async

```javascript

var invoke = require( 'invoke' ).async

async.forEach( documents, invoke('save', 'redis'), function( err ){
  
})
```