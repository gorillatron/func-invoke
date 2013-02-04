
### invoke

```javascript

var invoke = require( 'func-invoke' )

documents.forEach( invoke('setState', 'saved') )
```

### invoke.async

```javascript

var invoke = require( 'func-invoke' ).async

async.forEach( documents, invoke('save', 'redis'), function( err ){
  
})
```